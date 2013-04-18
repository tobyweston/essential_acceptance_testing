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
        waitFor(assertion(portfolioValuationFrom(ui), is("91,203.83")),
            timeout(seconds(5)));
    }

    @After
    public void stopServer() {
        application.stop();
        ui.quit();
    }
}
~~~~~~~

It's a very naive test as it relies on Yahoo being up and returning the expected result. It starts up the entire application in the `@Before` which in turn starts up the web container, initialises the UI and market data components. The browser is then fired up and "driven" (by `LandingPage`) to simulate the user's interaction and the result is scraped.

The assertion against the portfolio value is wrapped to poll the UI periodically because the request from the browser to the application is asynchronous. Notice the long timeout value of five seconds because Yahoo is a publicly available service without a service level agreement.

A> ##Page driver pattern {#page-driver-pattern-aside}
A>
A> Abstracting the business intent from the UI mechanics means that UI "driver" code isn't coupled to a specific UI. If done carefully, switching the UI would mean just implementing a new adapter. Notice how in the above we avoided the following.
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage()
A>   .setNumberOfSharesTextBoxTo(100)
A>   .clickRequestValuationButton();
A> ~~~~~~~~
A> and used the following instead.
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage().requestValuationForShares(100);
A> ~~~~~~~~
A> You can see in this way, the UI test code is just another example of a port (the UI driver interface) and it's adapters.
A>

We can improve on this test slightly by faking out Yahoo and forcing it to return a caned response (a price of `200.10` for each request).

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
        String response = "{\"quote\":{\"Close\":\"200.10\"}}";
        fakeYahoo.stub(
              urlStartingWith("/v1/public/yql"),
              aResponse().withBody(response));
        ui.navigateToLandingPage().requestValuationForShares(100);
        waitFor(assertion(portfolioValuationFrom(ui), is("20,010.00")),
            timeout(millis(500)));
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

This is something James likens to taking a car out for a test drive.

> "Imagine purchasing a new car and taking it out for a test drive. When you return to the showroom, the car has performed flawlessly but just to be sure you take it out again, this time with the windows down. Then again with the glove compartment open. Then again with the seats fully reclined.
>
> You could keep on testing the car in this way but there reaches a point when the cost of evaluating the car begins to outweigh the risk of something going wrong. You have to trust that all the individual parts have been tested during manufacture and that since you have actually driven the car, it is safe to go ahead and buy it.
>
> It's the same with software. The cost of developing and maintaining high level tests should be weighed against the uncertainty and risk of something going wrong."


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

The next step is to describe the system architecture in terms of boundary interfaces (ports), their implementations (adapters) and core application logic (domain models).

![](images/part2/design.md/ports-and-adapter-design.png)

Keeping to the constraints shown in the [Ports and adapters symbols aside](#port-and-adapters-symbols-aside), all communication to the domain model is done via a port and adapter pair. The exception, Yahoo, is explained later. We've broken down the previous coarse grained architecture into a series of interfaces (ports), their implementations (adapters) and domain model.

To create a comparable coverage, we'd design tests around the following using the decoupled ports and adapters approach.

* UI to Portfolio Port
  * Portfolio value display tests
  * Request for portfolio value tests
* Portfolio HTTP Adapter
  * HTTP Adapter to Java message tests
  * Portfolio calculation tests
* Portfolio to Market Data Port
  * Market Data API tests

Along with more lightweight system tests

* Fewer, more focused end-to-end (system) tests
* Tests against real (Yahoo) Market Data

These can be seen in more detail in the [sample application](http://github.com/tobyweston/essential_acceptance_testing_code).


### Portfolio value display tests

These tests are concerned with the display of the portfolio's valuation in the UI. When a user requests the current value in the UI, we'd like to be able to make assertions without having to test the backend. We'll focus on the real UI and the `Portfolio` port.

![](images/part2/design.md/test-ui-only.png)

The UI makes a HTTP `GET` call to the `Portfolio` server. It's implemented in terms of a JQuery ajax call inside a HTML page. In testing however, we'd prefer to use a test double and therefore just test that the UI displays whatever the port returns correctly. Specifically then, we'd

* Start up the web UI
* Setup a fake `Portfolio` server with a canned response against specific HTTP GET calls
* Use the UI to click the 'request valuation' button
* Verify the canned response is displayed as intended within the UI

For example, we could setup the fake server to respond with a value of `10500.988` for a `GET` against `/portfolio/0001`. When the UI is used to make the request, we can verify the response is shown as `10,500.99 USD`. This exercises the UI logic to round the result and introduce commas. Other scenarios might include showing negative values in red or displaying alternate text when a value is unavailable.

Note that the request itself is not verified (how it actually interacted with the `Portfolio`'s port). This is a subtle omission but decouples the details of the request from how a response is used leaving us to test more display scenarios without worrying about request technicalities.

In these tests, we fake out the server (application) component so that the UI uses it's JQuery implementation to make a a real HTTP requests. An alternative approach would be to front the JQuery call behind our own JavaScript interface (port) and substitute this during testing. That way, we can exercise the port without making a real HTTP call.


#### Example

In this example, we've opted for a HTML based specification to describe the requirements.

> When I ask for a portfolio value in the UI, it's displayed as intended.
>
> Given
>
> A portfolio value of 10500.988
>
> When
>
> A user refreshes the portfolio page
>
> Then
>
> The portfolio value is requested and displayed on the UI as **10,500.99**

In the [sample application](https://github.com/tobyweston/essential_acceptance_testing_code), we use [Concordion](http://www.concordion.org) as the framework which will interpret an instrumented HTML file and call into a fixture class in order to interact with our application and make assertions. To that end, our fixture for the above might look like the following

{title="Example 3: Test fixture for use with scenarios described in HTML specifications", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class UiPortfolioValueDisplayTest {

    private final HttpServer client = new WebUi();
    private final FakeHttpServer application = new FakeHttpServer(8000);
    private final LandingPage ui = new LandingPage();

    @Before
    public void start() {
        client.start();
        application.start();
    }

    public void requestPortfolioValue(String body) {
        application.stub(
            urlEndingWith("/portfolio/0001"),
            aResponse().withHeader("Access-Control-Allow-Origin", "*").withBody(body));
        ui.navigateToLandingPage().requestValuationForShares(100);
    }

    public String getPortfolioValue() throws InterruptedException {
        return ui.getPortfolioValue();
    }

    @After
    public void stop() {
        client.stop();
        application.stop();
        ui.quit();
    }
}
~~~~~~~

When running the test, the canned response returned by the fake server is set in HTML as `10500.988` and passed into the `requestPortfolioValue` method. When the test then continues to `getPortfolioValue()`, an instance of the browser is controlled to click on a button that makes the `GET` request using JQuery. The canned response is returned to JQuery for display. The HTML specification is the part that describes the assertion and after running, would look like the following.

![](images/part2/design.md/test-ui-only-specification-result.png)


### Request for portfolio value tests

In the previous set of tests, we made no verifications against the request mechanisms so that we could focus solely on display semantics. The next set of tests focus on the request mechanics. We're interested in exercising the interaction between the UI and the `Portfolio` port.

The previous tests ask "when I ask for a portfolio value in the UI, what happens?", these tests are concerned with what it actually means to ask that question?

![](images/part2/design.md/test-ui-to-portfolio.png)

When the UI asks for a valuations, a specific message is sent over the wire. These test will verify the request and response formats. How the response is actually used is left to the previous tests. For example, if the request is sent as JSON, the JSON content may be verified. The response body may be verified against a specific JSON format and the HTTP response code verified to be 200 (OK).

Specifically, we'd.

* Start up the UI
* Setup a fake `Portfolio` server with an expectation against a specific HTTP request
* Force the UI to click the 'request valuation' button
* Verify the request expectation and return a canned response
* Verifies only that a response was received, not how it might be used in the UI

When the UI asks for the current value, a message is sent to the domain model (Portfolio). These tests would use a real UI to call the `Portfolio`s port (represented by a test double) so that we can assert expectations on the message format. If we have different UIs, we would need to test each to verify how they communicate with the port. For example, a test for a rich client must verify the JSON message and HTTP request as well as one for a web UI.



### HTTP Adapter to Java message tests



### Portfolio calculation tests



### Market Data API tests



IGNORE FROM HERE
------



### Test 3 - Portfolio's JSON/HTTP adapter test

When the `Portfolio` HTTP adapter receives a specific message, we expect a specific interaction with the `Portfolio` component. We're verifying the transport layer (JSON/HTTP) is translated into our business API.

![](images/part2/design.md/est-portfolio-valuation.png)

For example, if the business API was a series of Java method calls, we could set the interaction up as a expectation on a mock version of the business interface. The HTTP adapter might be a RESTful server which collaborates with this business interface directly (in which case we'd inject the mock). We're testing that a JSON over HTTP message turns into a Java message.



### Test 4 - A test against our market data API

Testing our implementation of the `Market Data` port. When the `Portfolio` asks `Market Data` for the current price, it'll go and get it from the Market Data port; I'll ask Market Data for the current price of stock for today's date. Expectation rather than a stub.

Java (API) to Java (API).

![](images/part2/design.md/test-market-data.png)


### Test 5 - A test against Yahoo

Next would be the Yahoo specific adapter; an integration* test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22.

Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.

*is this an integration test? GOOS says if you don't own it, it's not an integrationn test.







### A note on integration tests

We've verified that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.



## Thin slice of end-to-end

* Fewer, more focused end-to-end (system) tests
* Tests against real (Yahoo) Market Data

## Benefits using ports and adapters

## Disadvantages using ports and adapters