# How design can influence testing {#design}

How you design your architecture will directly affect how easy your application is to test. If you decouple the system's components, it makes them easier to test in isolation. This has the additional benefit of creating a more flexible architecture. This chapter describes how a ports and adapters approach can make testing easier and more efficient. We introduce a sample application (available [online](https://github.com/tobyweston/essential_acceptance_testing_code)) and show how testing is complicated by a coupled design and how the de-coupled alternative can be tested.

## Sample application

Lets imagine a system concerned with helping customers manage their stock portfolio. It displays details about stocks owned and allows the customer to buy and sell directly with an exchange. The system is made up of a browser based UI and a RESTful backend server. The backend uses a market data service provided by Yahoo to retrieve stock prices and connects directly to an exchange to execute trades.

One important aspect of the sample application is that the UI is a separate app from the RESTful server. The UI is a deployable HTTP server in it's own right. It serves the static HTML and JavaScript that makes up the UI. The RESTful backend is also a HTTP server but this one performs the business logic and is called by the UI. This separation decouples the UI logic from the business logic and allows us to develop the two independently and potentially with differing technologies.

Currently, only basic information is displayed about a customer's stocks so stakeholders have decided on the next piece of work and have described it as follows.

> "As a retail customer, when I ask for my portfolio's value, current stock prices are retrieved from the market and the total value of my stocks is calculated and displayed."

In further discussion, the stakeholder clarifies that the calculation is done by multiplying a stock's current price by the quantity that the user holds. If the user holds 10,000 Google shares, each worth $810 each then their portfolio would be worth $8.1m.

The UI might look something like this.

![](images/part2/design.md/ui-mock-up.png)



## Coupled architecture

If a system is built with components tightly coupled, pretty much the only way to test a scenario is with a coarse grained system test. In our [example application](https://github.com/tobyweston/essential_acceptance_testing_code), we could test against real Yahoo with something like this.

{title="Example 1: Coarse grained test starting up the full stack", lang="java", line-numbers="on"}
~~~~~~~
public class PortfolioSystemTestWithRealYahoo {
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

It exercises all of the components but it's naive as it relies on Yahoo being up and returning the expected result. It starts up the entire application in the `@Before` which in turn starts up the web container, initialises the UI and market data components. The browser is then fired up and used to simulate the user's interaction (line 12). The result is scraped directly from the browser (line 13).

The assertion on the result is wrapped in a call to poll the UI periodically (the call to `waitFor` on line 13) because the request from the browser to the application is asynchronous. Notice the long timeout value of five seconds because Yahoo is a publicly available service with no guarantees of responsiveness. It may take this long or longer to respond. It's another brittle aspect to this test.

A> ##Page driver pattern {#page-driver-pattern-aside}
A>
A> Abstracting the business intent from the UI mechanics means that UI "driver" code isn't coupled to a specific UI. If done carefully, switching the UI would mean just implementing a new adapter. Notice how in the above we avoided the following.
A>
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage()
A>   .setNumberOfSharesTextBoxTo(100)
A>   .clickRequestValuationButton();
A> ~~~~~~~~
A>
A> and used the following instead.
A>
A> {:lang="java"}
A> ~~~~~~~~
A> ui.navigateToLandingPage().requestValuationForShares(100);
A> ~~~~~~~~
A> You can see in this way, the UI test code is just another example of a port (the UI driver interface) and it's adapters.
A>

We can improve on this test slightly by faking out Yahoo and forcing it to return a canned response (a price of `200.10` for each request). Lines 15-17 below sets up any HTTP call to the URL `/v1/public/yql` to respond with an valid HTTP response containing the response string from line 14.

{title="Example 2: Same test but with a faked out market data service", lang="java", line-numbers="on"}
~~~~~~~
public class PortfolioSystemTestWithFakeYahoo {
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

On the surface, we're testing different behaviours but we're actually exercising the same code over and over again. It's something James likens to taking a car out for a test drive.

> "Imagine purchasing a new car and taking it out for a test drive. When you return to the showroom, the car has performed flawlessly but just to be sure you take it out again, this time with the windows down. Then again with the glove compartment open. Then again with the seats fully reclined.
>
> You could keep on testing the car in this way but there comes a point when the cost of evaluating the car begins to outweigh the risk of something going wrong. It's the same with software. The cost of developing and maintaining high level tests should be weighed against the uncertainty and risk of something going wrong."


## Decoupled architecture using ports and adapters {#ports-and-adapters}

Rather than running several coarse grained tests, let's decouple the system by defining explicit boundaries between components using interfaces and design a set of tests to exercise the interaction between those boundaries. Each interface represents a port in the architecture. The tests should compliment each other to provide the same level of confidence.


A> ## Ports and adapter symbols {#port-and-adapters-symbols-aside}
A>
A> | A port (interface) | ![](images/part2/design.md/port.png) |
A> | | |
A> | A component | ![](images/part2/design.md/circle.png) |
A> | | |
A> | An adapter | ![](images/part2/design.md/adapter.png) |
A> | | |
A> | Access components only via ports | ![](images/part2/design.md/port-line-adapter.png) |
A> | Components only communicate with ports | ![](images/part2/design.md/circle-arrow-port.png) |
A>

The next step is to describe the system architecture in terms of boundary ports (interfaces), their adapters (implementations) and core application logic components. For our application, it might look something like this.

![](images/part2/design.md/ports-and-adapter-design.png)

All communication to the domain model is done via a port and adapter pair. The exception, Yahoo, is explained later. We've broken down the previous coarse grained architecture into a series of ports, their adapters and domain components.

Using the decoupled ports and adapters approach to create comparable coverage, we'd design tests around the following.

* UI to Portfolio Port
  * Portfolio value display tests
  * Request for portfolio value tests
* Portfolio HTTP Adapter
  * HTTP Adapter to Java message tests
* Portfolio to Market Data Port
  * Portfolio calculation tests
  * Market Data API tests

Along with more lightweight system tests

* Fewer, more focused end-to-end (system) tests
* Tests against real (Yahoo) Market Data

Lets have a closer look at each of these next. You can also refer to the source code of the [sample application](http://github.com/tobyweston/essential_acceptance_testing_code) for more details.



### Portfolio value display tests

Tests in this group are concerned with the display of the portfolio's valuation in the UI. For example, we may want to test that currencies are displayed, rounding occurs, commas are displayed in large numbers, negative numbers show up in red or informational text is displayed in the event that no value is available.

These tests start with the user asking for the current value in the UI but we'd like to be able to make assertions without having to go through the backend. We'll need a real UI but the tests should work with the Portfolio's port.

![](images/part2/design.md/test-ui-only.png)

The UI makes a HTTP `GET` call to the Portfolio server. It's implemented by a JQuery ajax call inside a HTML page. In testing however, we'd prefer to use a test double to replace the Portfolio and therefore just test that the UI correctly displays whatever the port returns. Specifically then, we'd

* Start up the UI server (remember this is basically serving static HTML but is started as it's own app)
* Setup a fake Portfolio server with a canned response against specific HTTP GET calls
* Use the UI to click the 'request valuation' button
* Verify the canned response is displayed as intended within the UI

For example, we could setup the fake server to respond with a value of `10500.988` for a `GET` against `/portfolio/0001`. When the UI is used to make the request, we can verify the response is shown as `$10,500.99`. This exercises the UI logic to round the result, introduce commas and add a currency symbol.

Note that we don't verify how the request actually interacts with the Portfolio. This is a subtle omission but decouples the details of the request from how a response is used leaving us to test more display scenarios without worrying about request details. If we were to verify the request, any changes to the request API would cause changes to this test even though it's only about display logic.

In these kinds of tests, we'd fake out the server component and the UI would use JQuery to make a real HTTP request. An alternative approach would be to front the JQuery call behind our own JavaScript interface (port) and substitute this during testing. That way, we can exercise the port without making a real HTTP call.



#### Example test

As a specific example from this group, lets look at verifying monetary values are displayed with thousands separated using commas. We've opted for a HTML based specification to describe the requirements.

A> #### When I ask for the portfolio value in the UI, it's formatted with commas.
A>
A> Given a portfolio value of `10500.988`
A>
A> When a user refreshes the portfolio page
A>
A> Then the portfolio value is requested and displayed on the UI as **`10,500.99`**

We'll use [Concordion](http://www.concordion.org) as the framework that will interpret an instrumented HTML file and call into a test fixture class to call our application logic and make assertions. We use the HTML to document the specification and use Concordion as a way to execute it like a regular JUnit test. It's not important that we're using Concordion. What is important is that we're producing readable artifacts for the customer in their own language.

Our fixture for the above might look like the following.

{title="Example 3: Test fixture for use with scenarios described in HTML specifications", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class UiPortfolioValueDisplayTest {
    private final WebUi client = new WebUi();
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
            aResponse().withBody(body));
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


By annotating the test with `@RunWith(ConcordionRunner.class)`, the class can be run like a regular JUnit test. It will use [Concordion](http://www.concordion.org) runner to find and parse the HTML specification calling into the fixture as appropriate. For example, our specification looks like the following.


{title="Example 4: HTML Specification marked up with Concordion instrumentation", lang="html", line-numbers="on"}
~~~~~~~
<html xmlns:concordion="http://www.concordion.org/2007/concordion">
<body>
<h1>Portfolio Valuation </h1>

<h2>Given</h2>
<p>
    A portfolio value of <b>10500.988</b>
</p>

<div class="details hidden">
    <div class="example">
        <p>
            The response from the server contains the body of
        </p>
        <pre concordion:set="#body">10500.988</pre>
    </div>
</div>

<h2>When</h2>
<p concordion:execute="requestPortfolioValue(#body)">
    A user refreshes the portfolio page
</p>

<h2>Then</h2>
<p>
    The portfolio value is requested and displayed on the UI as
    <b concordion:assertEquals="getPortfolioValue()">10,500.99</b>
</p>

</body>
</html>
~~~~~~~

The HTML sets up the fake server to respond with `10500.988` by setting a "variable" on line 15 which is passed into the `requestPortfolioValue()` method of the fixture. As the HTML is interpreted, when it reaches line 20, it'll actually call the method on the fixture. At this point, the fixture will control an instance of the browser to click on a refresh button triggering a `GET` request using JQuery.

The `GET` request will trigger the canned response to be returned ready for display. It's JavaScript in the UI that receives this response and introduces the commas. It's this that we're really trying to test so we make an assertion in Concordion parlance at line 27. This line will get the actual value from the UI using the fixture's method and compare it with the HTML element. After running, it'd look like the the following with a positive assertion shown in green.

![](images/part2/design.md/test-ui-only-specification-result.png)



### Request for portfolio value tests

In the previous section, we made no verifications against the request mechanisms so that we could focus solely on display semantics. The next set of tests focuses on the request mechanics. We're interested in exercising the interaction between the UI and the `Portfolio` port.

The previous tests ask "when I ask for a portfolio value in the UI, what happens?", this set of tests are concerned with what it actually means to ask for a portfolio's value?

![](images/part2/design.md/test-ui-to-portfolio.png)

When the UI asks for a valuation, a specific message is sent over the wire. These tests would verify the request and response formats. How the response is actually used is left to the previous tests. For example, if the request is sent as JSON, the JSON content may be verified. The response body may be verified against a specific JSON format and the HTTP response code verified to be 200 (OK).

Specifically, we'd

* Start up the UI server
* Setup a fake Portfolio server with an expectation against a specific HTTP request
* Force the UI to click the 'request valuation' button
* Verify the request expectation and return a canned response
* Verify that a response was received but not how it is used in the UI

When the UI asks for the current value, a message is sent to the Portfolio component. These tests would use a real UI to call the Portfolio's port (represented by a test double) so that we can assert expectations on the message format. If we have different UIs, we would need to test each to verify how they communicate with the port. For example, a test for a desktop client would also verify the JSON message and HTTP request.



#### Example test

An example specification might look like this.

A> #### What does it mean to ask for a portfolio value in the UI?
A>
A> When the user asks for the current portfolio valuation in the UI
A>
A> Then a request for the portfolio value is made to the application and the response is returned

With a corresponding fixture as follows.

{title="Example 5: Test fixture for working with UI to Portfolio requests", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class UiPortfolioValueRequestTest {
    private final HttpServer client = new WebUi();
    private final FakeHttpServer application = new FakeHttpServer(8000);
    private final LandingPage ui = new LandingPage();

    private final static String expectedUrl = "/portfolio/0001";

    @Before
    public void start() {
        client.start();
        application.start();
    }

    public String requestPortfolioValue() throws MalformedURLException {
        application.stub(
            urlEndingWith("/portfolio/0001"),
            aResponse().withBody("1000"));
        ui.navigateToLandingPage().requestValuationForShares(100);
        return expectedUrl;
    }

    public String verifyHttpGet() throws InterruptedException {
        try {
            application.verify(urlEndingWith(expectedUrl));
            return "request for the portfolio value is made";
        } catch (AssertionError e) {
            return "request for the portfolio value was not made";
        }
    }

    public boolean verifyResponseReturned() throws InterruptedException {
        ui.assertThatPortfolioValue(not(isEmptyOrNullString()));
        return true;
    }

    @After
    public void stop() {
        client.stop();
        application.stop();
        ui.quit();
    }
}
~~~~~~~

Like the previous example, a canned response is setup (line 17) only this time, the fixture can verify that the UI made the correct type of request (line 26). It asserts that the correct URL was access using the HTTP `GET` method and that any required headers were supplied. The test can then go on to verify the response is correct (line 34). In this case, it just verifies that the response makes it's way onto the UI but doesn't test anything specific.

Notice that in the specification result below, the specifics of what it means for a request to be valid are omitted. The language in the test talks in abstract terms about the request ("a request for the portfolio value is made"). This decouples the language in the test specification from it's implementation.

![](images/part2/design.md/test-ui-to-portfolio-specification-result.png)



### HTTP Adapter to Java message tests

Once we're satisfied about the communication between UI and `Portfolio`, we can look at the behaviour of the Portfolio part of the domain model. This part of the domain model is responsible for exposing the valuation request interface. This is implemented by a HTTP adapter to create a RESTful endpoint. It turns the HTTP call into a Java API call so our tests should exercise this adaptation.

![](images/part2/design.md/test-portfolio-valuation.png)

An important point to make right off the bat is that these tests will assume that the RESTful infrastructure is, or will be, tested elsewhere. Rather than start up a HTTP server, configure RESTful endpoints and make a real HTTP client request, the tests will work with underlying components directly. This separates the configuration and infrastructure (of the HTTP server) from the behaviour (the business logic classes) tests.

In Java terms, you can think of this as not testing the servlet container's configuration but instead testing the `Servlet` directly. We assume the web container works and that thin slices of configuration will be tested in subsequent tests. Starting up a full container for multiple business scenarios can be wasteful when they exercise the same infrastructure scenarios again and again.



#### Example

So, our example specification might look like this.

A> When a HTTP request for a valuation is received
A>
A> Then the total portfolio valuation will be returned to the requester

With a corresponding fixture used to verify the HTTP adapter works with domain model components as intended.

{title="Example 6: Test fixture for the Portfolio's port HTTP adapter", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class PortfolioValuationTest {
    private final Mockery context = new JUnit4Mockery();

    private final Valuation valuation = context.mock(Valuation.class);
    private final PortfolioResource portfolio = new PortfolioResource(valuation);

    public boolean verifyValuationResponse() {
        context.checking(new Expectations() {{
            oneOf(valuation).value(); will(returnValue(new Money("89.99")));
        }});

        Response response = portfolio.value(null);
        assertThat(response.entity().toString(), is("89.99"));
        return true;
    }
}
~~~~~~~

The `PortfolioResource` class is the business logic component that should be accessed when a HTTP request is received. The RESTful framework used to route the `GET` call to this class is a JSR-311 framework called [Utterlyidle](https://code.google.com/p/utterlyidle/) running an embedded HTTP server. A common alternative is to use [Jersey](http://jersey.java.net/) running in an embedded [Jetty](http://www.eclipse.org/jetty/) HTTP server. Either way, we're not interested in testing these frameworks or their configuration.

We're using JMock to implement our test double and simply verify that an object responsible for valuing a portfolio (`valuation`) is accessed and it's monetary return type is bundled in the HTTP `response` body. This may seem very much like a unit style test. That's because it is. It focuses narrowly on specific questions and can only be called an acceptance test because of the way its used (to give customer's confidence via the HTML output). There's nothing in our definition of an acceptance test that precludes it being written as a unit style test.

![](images/part2/design.md/test-portfolio-valuation-specification-result.png)



### Portfolio calculation tests

These tests are concerned with the calculation logic of the domain model. How does the `Portfolio` actually go about summing the stocks and where does it get their prices? Given the previous test shows that a HTTP request is translated into a Java message to get a valuation, these tests go into more detail as to what is involved in valuing the portfolio. Scenarios might include summing the prices of various stocks on a customer's book, how the system responds when prices can not be retrieved or if a customer has no stocks.

![](images/part2/design.md/test-market-data.png)

The calculation must interact with `Market Data` in order to price any stocks the customer holds. So the test will need work with a real `Portfolio` component but use a test double for the `Market Data` port.


#### Example

An example scenario might look like this.

A> Given a customer book containing `100` shares in `AMZN` and yesterday's stock price in the market data system for `AMZN` of `261.82`
A>
A> When a request for a valuation is received
A>
A> Then the total portfolio valuation will be `26182.00`

with a corresponding fixture.

{title="Example 7: Test fixture for the Portfolio's calculation logic", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class PortfolioValuationCalculationTest {
    private final StubMarketData marketData = new StubMarketData();
    private final StubBook book = new StubBook();
    private final Valuation portfolio = new Portfolio(book, marketData);

    public void setBook(String symbol, Integer quantity) {
        book.add(new NumberOfStocks(fromSymbol(symbol), quantity));
    }

    public void setMarketDataPrice(String symbol, String price) {
        marketData.add(fromSymbol(symbol), new Money(price));
    }

    public String getTotalPortfolioValue() {
        return portfolio.value().toString();
    }

}
~~~~~~~

The previous test mocked out the valuation component whereas this test uses a real version which collaborates with the customer's `Book` and the external `Market Data` component. Given test doubles for these components, we can setup stocks on a customer book along with corresponding prices in this fixture and verify different scenarios using differing HTML specifications.

![](images/part2/design.md/test-portfolio-valuation-calculation-specification-result.png)



### Market Data API tests

These tests are concerned with the `Market Data` API. They use expectations rather than a stubs to represent the port and exercise the port, not how the results from the port are used (like in the previous tests). They give the opportunity to document how the interaction works.

![](images/part2/design.md/test-market-data.png)


#### Example

{title="Example 8: Test fixture market data", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class MarketDataTest {
    private final Mockery context = new JUnit4Mockery();

    private final MarketData marketData = context.mock(MarketData.class);
    private final StubBook book = new StubBook();
    private final Portfolio portfolio = new Portfolio(book, marketData);

    public MultiValueResult verifySymbolCheckedWas(final String firstSymbol, final String secondSymbol) {
        book.add(fromSymbol(firstSymbol)).add(fromSymbol(secondSymbol));
        context.checking(new Expectations() {{
            oneOf(marketData).getPrice(fromSymbol(firstSymbol));
                will(returnValue(new Money(100)));
            oneOf(marketData).getPrice(fromSymbol(secondSymbol));
                will(returnValue(new Money(200)));
        }});
        portfolio.value();
        context.assertIsSatisfied();
        return multiValueResult()
            .with("firstSymbol", firstSymbol)
            .with("secondSymbol", secondSymbol);
    }
}
~~~~~~~

![](images/part2/design.md/test-market-data-specification-result.png)




IGNORE FROM HERE
------



## Thin slice of end-to-end

* Fewer, more focused end-to-end (system) tests
* Tests against real (Yahoo) Market Data

### Test 5 - A test against Yahoo

Next would be the Yahoo specific adapter; an integration* test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22.

Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.

*is this an integration test? GOOS says if you don't own it, it's not an integration test.

### A note on integration tests

We've verified that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.


## Benefits using ports and adapters

## Disadvantages using ports and adapters