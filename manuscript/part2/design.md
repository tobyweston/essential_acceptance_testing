# How testing can influence design {#design}

If we decouple the system's components, it makes them easier to test in isolation. This has the additional benefit of creating a more flexible architecture. This section describes the ports and adapters approach when applied to testing. Code samples are in Java. Sorry.


## Example problem

Lets imagine an investment portfolio system concerned with helping customers manage their stock investments. The acceptance criteria for the next piece of work is as follows.

> "As a retail customer, when I ask for my portfolio's value, today's stock price is retrieved from the market, multiplied by the number of stocks I own and the total is displayed."

The system is composed of a web front end (UI), server side component accessed via HTTP (the back-end) and a market data service provided by Yahoo. An example application along with corresponding tests is available on [Github](https://github.com/tobyweston/essential_acceptance_testing_code).


## Coupled architecture

If the system is built with these components tightly coupled, pretty much the only way to test the scenario is as a coarse grained system test. In our [example application](https://github.com/tobyweston/essential_acceptance_testing_code), we could test against real Yahoo with something like this.

{title="Example 1: Coarse grained test starting up the full stack", lang="java", line-numbers="on"}
~~~~~~~
public static class PortfolioSystemTestWithRealYahoo {
    private final Server application = Fixture.applicationWithRealYahoo();
    private final LandingPage ui = new LandingPage();

    @Before
    public void startServers() {
        application.start();
    }

    @Test
    public void shouldRetrieveValuation() {
        ui.navigateToLandingPage().requestValuationForShares(100);
        waitFor(assertion(portfolioValuationFrom(ui), is("91,203.83")), timeout(seconds(5)));
    }

    @After
    public void stopServer() {
        application.stop();
        ui.quit();
    }
}
~~~~~~~

It's a very naive test as it relies on Yahoo being up and returning the expected result. It starts up the entire application in the `@Before` which in turn starts up the web container, initialises the UI and market data components. The browser is then fired up and "driven" (by `LandingPage`) to simulate the user's interaction and the result scraped.

The assertion against the portfolio value is wrapped to poll the UI periodically because the request from the browser to the application is asynchronous. Notice the long timeout value of five seconds because Yahoo is a publicly available service.

A> ##Page driver pattern {#page-driver-pattern-aside}
A>
A> Abstracting the business intent from the UI mechanics means that UI "driver" code isn't coupled to a specific UI. If done carefully, switching the UI would mean just implementing a new adapter. Notice how in the above we avoided the following.
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage().setNumberOfSharesTextBoxTo(100).clickRequestValuationButton();
A> ~~~~~~~~
A> and use the following instead.
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage().requestValuationForShares(100);
A> ~~~~~~~~
A> You can see in this way, the UI test code is just another example of a port (the UI driver interface) and it's adapters.
A>

We can improve on this test slightly by faking out Yahoo and forcing it to return a caned response.

{title="Example 2: Same test but with a faked out market data service", lang="java", line-numbers="on"}
~~~~~~~
public static class PortfolioSystemTestWithFakeYahoo {
    private final Server application = Fixture.applicationWithRealYahoo();
    private final FakeYahoo fakeYahoo = new FakeYahoo();
    private final LandingPage ui = new LandingPage();

    @Before
    public void startServers() {
        application.start();
        fakeYahoo.start();
    }

    @Test
    public void coarseGrainedTestExercisingPortfolioValuation() {
          String response = "{\"query\":{\"results\":{\"quote\":{\"Close\":\"200.10\"}}}}";
          fakeYahoo.stub(
                urlStartingWith("/v1/public/yql"),
                aResponse().withBody(response));
          ui.navigateToLandingPage().requestValuationForShares(100);
          waitFor(assertion(portfolioValuationFrom(ui), is("20,010.00")), timeout(millis(500)));
    }

    @After
    public void stopServers() {
        application.stop();
        fakeYahoo.stop();
        ui.quit();
    }
}
~~~~~~~

Both tests exercise the happy path through the entire system. If we want to check what happens when no price is available from Yahoo or if Yahoo is down, we'd repeat the majority of the test to do so. If we want to test user errors on input, we'd startup the application unnecessarily.

![Multiple coarse grained tests repeatedly exercise the same parts of the system architecture](images/part2/design.md/coarse-grained-tests-repeating.png)

This is something James Maggs likens to taking a car out for a test drive.

> "Imagine purchasing a new car and taking it out for a test drive. When you return to the showroom, the car has performed flawlessly but just to be sure you take it out again, this time with the windows down. Then again with the glove compartment open. Then again with the seats fully reclined. 
>
> You could keep on testing the car in this way but there reaches a point when the cost of evaluating the car begins to outweigh the risk of something going wrong. You have to trust that all the individual parts have been tested during manufacture and that since you have actually driven the car it is safe to go ahead and buy it.
>
> It's the same with software. The cost of developing and maintaining high level tests should be weighed against the uncertainty and risk of something going wrong"


## Decoupled architecture using ports and adapters {#ports-and-adapters}

Rather than running several coarse grained tests, let's decouple the system using explicit boundaries (interfaces) and design a set of tests to exercise the iteration between those boundaries. These should compliment each other to provide the same level of confidence.


A> ## Ports and adapter symbols {#port-and-adapters-symbols-aside}
A>
A> | An interface (port) | ![](images/part2/design.md/port.png) |
A> | | |
A> | A component (application domain model) | ![](images/part2/design.md/circle.png) |
A> | | |
A> | An implementation (adapter) | ![](images/part2/design.md/adapter.png) |
A> | | |
A> | Access components only via ports | ![](images/part2/design.md/port-line-circle.png) |
A> | | ![](images/part2/design.md/port-line-adapter.png) |
A> | Components only communicate with ports | ![](images/part2/design.md/circle-arrow-port.png) |
A> | | ![](images/part2/design.md/adapter-arrow-port.png) |
A>

The next step is to describe the system architecture in terms of boundary interfaces (ports), their implementations (adapters) and core application logic (domain models). In the diagram below, multiple components are shown for the UI to demonstrate that it could have multiple types of UI, for example, a rich desktop client and a web UI.

![](images/part2/design.md/ports-and-adapter-design.png)

Keeping to the constraints shown in the [Ports and adapters symbols aside](#port-and-adapters-symbols-aside), all communication to the domain model is done via a port and adapter pair. The exception, Yahoo, is explained later.

We've broken down the previous coarse grained architecture into a series of interfaces (ports), their implementations (adapters) and domain model. The domain model is both the `Portfolio` and `Market Data` and we could have represented this as a single element.


* Test 1 - A pure UI test
* Test 2 - A UI transport test
* Test 3 - Portfolio's JSON/HTTP adapter test
* Test 4 - A test against our market data API
* Test 5 - Real test against Yahoo's version of market data


### Test 1 - A pure UI test

When a user requests the current portfolio value, the system is queried and the current value is displayed appropriately. It's a UI test so we can talk about the UI specifically;

> "when the user clicks clicks the 'Request valuation' button"

what the UI component does;

> "the UI asks for the current price"

and what it does with it for certain cases;

> "when the number returned is negative, the `value` field it's displayed in red"

> "when there is a technical problem and no number is available, the `value` field it's displayed with the phrase 'Unavailable'"

This is a UI only test so we'd use a test double to stand in for the `Portfolio` port.

![](images/part2/design.md/ports-and-adapter-design-test-1.png)

We're using general language for the idea of what it means to "ask for the current price". We're implying the mechanism can be substituted; sometimes it might be a button on web page, sometimes a drop down or a widget on a rich client. In all cases the question is the same and a message is sent to the domain model (via the appropriate port).

It's an important point so is worth stating again; the definition of 'UI asks for' is the same for each test. Test it once; it's defined _how_ you actually do it in subsequent tests.


### Test 2 - A UI transport test

The previous test simply asserts that the UI can ask for the current portfolio value, it's an abstract question; it decouples the assertion from the mechanism. What it means to actually ask for the current value is described by this test. They overlap.

![](images/part2/design.md/ports-and-adapter-design-test-2.png)

When the UI asks for the current value, a message is sent to the domain model (`Portfolio`). This test will use a real UI to call the `Portfolio`s port (represented by a test double) so that we can assert expectations on the message format (for example, it's JSON).

If we have different 'views', we would need to test each to define how they commit to communicate with the port. For example, a test for a rich client must verify the JSON message and HTTP request as well as the web UI.



### Test 3 - Portfolio's JSON/HTTP adapter test

When the `Portfolio` HTTP adapter receives a specific message, we expect a specific interaction with the `Portfolio` component. We're verifying the transport layer (JSON/HTTP) is translated into our business API.

![](images/part2/design.md/ports-and-adapter-design-test-3.png)

For example, if the business API was a series of Java method calls, we could set the interaction up as a expectation on a mock version of the business interface. The HTTP adapter might be a RESTful server which collaborates with this business interface directly (in which case we'd inject the mock). We're testing that a JSON over HTTP message turns into a Java message.



### Test 4 - A test against our market data API

Testing our implementation of the `Market Data` port. When the `Portfolio` asks `Market Data` for the current price, it'll go and get it from the Market Data port; I'll ask Market Data for the current price of stock for today's date. Expectation rather than a stub.

Java (API) to Java (API).



### Test 5 - A test against Yahoo

Next would be the Yahoo specific adapter; an integration* test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22.

Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.

*is this an integration test? GOOS says if you don't own it, it's not anintegrationn test.


### A note on integration tests

We've verified that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.



## Thin slice of end-to-end

## Benefits using ports and adapters

## Disadvantages using ports and adapters