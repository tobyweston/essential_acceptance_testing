# How design can influence testing {#design}

How you design your architecture will directly affect how easy your application is to test. If you decouple a system's components, it makes them easier to test in isolation. This has the additional benefit of creating a more flexible architecture. This chapter describes how a ports and adapters approach can make testing easier and more efficient. We introduce a sample application (available [online](https://github.com/tobyweston/essential_acceptance_testing_code)) and show how testing is complicated by a coupled design and how the de-coupled alternative can be tested more easily.

## Sample application

Lets imagine a system concerned with helping customers manage their stock portfolio. It displays details about stocks owned and allows the customer to buy and sell directly with an exchange. The system is made up of a browser based UI and a RESTful backend server. The backend uses a market data service provided by Yahoo to retrieve stock prices and connects directly to an exchange to execute trades.

One important aspect of the sample application is that the UI is deployed as a separate app from the RESTful server. It's made up of static HTML and JavaScript and is served by an embedded HTTP server. The RESTful backend is deployed separately with an embedded HTTP server and is called by the UI to perform the business logic. This separation decouples the UI logic from the business logic and allows us to develop the two independently, potentially with differing technologies.

Currently, only basic information is displayed about a customer's stocks so stakeholders have decided on the next piece of work and have described it as follows.

> "As a retail customer, when I ask for my portfolio's value, current stock prices are retrieved from the market and the total value of my stocks is calculated and displayed."

In further discussion, the stakeholder clarifies that the calculation is done by multiplying a stock's current price by the quantity that the user holds. If the user holds 10,000 Google shares, each worth $810 each then their portfolio would be worth $8.1m.

The UI might look something like this.

![](images/part2/design.md/ui-mock-up.png)



## Coupled architecture

If a system is built with components tightly coupled, the only way to test a scenario is with a coarse grained system test. In our [example application](https://github.com/tobyweston/essential_acceptance_testing_code), we could test against real Yahoo with something like this.

{title="Listing 1: Coarse grained test starting up the full stack", lang="java", line-numbers="on"}
~~~~~~~
public class PortfolioSystemTestWithRealYahoo {
    private final Server application = Fixture.applicationWithRealYahoo();
    private final Browser browser = new Browser();

    @Before
    public void startServers() {
        application.start();
    }

    @Test
    public void shouldRetrieveValuation() {
        browser.navigateToSummaryPage().requestValuationForShares(100);
        waitFor(assertion(portfolioValuationFrom(browser),
            is("91,203.83")), timeout(seconds(5)));
    }

    @After
    public void stopServer() {
        application.stop();
        browser.quit();
    }
}
~~~~~~~

It exercises all of the components but it's naive as it relies on Yahoo being up and returning the expected result. It starts up the entire application in the `@Before` which in turn starts up the web container, initialises the UI and market data components. The browser is then fired up and used to simulate the user's interaction (line 12). The result is scraped directly from the browser (line 13).



A> ## Page driver pattern {#page-driver-pattern-aside}
A>
A> Abstracting the business intent from the UI mechanics means that UI "driver" code isn't coupled to a specific UI. If done carefully, switching the UI would mean just implementing a new adapter. Notice how in the above we avoided the following.
A>
A> {:lang="java"}
A> ~~~~~~~~
A> browser.navigateToSummaryPage()
A>   .setNumberOfSharesTextBoxTo(100)
A>   .clickRequestValuationButton();
A> ~~~~~~~~
A>
A> and used the following instead.
A>
A> {:lang="java"}
A> ~~~~~~~~
A> browser.navigateToSummaryPage().requestValuationForShares(100);
A> ~~~~~~~~
A>


The assertion on the result is wrapped in a call to poll the UI periodically (the call to `waitFor` on line 13) because the request from the browser to the application is asynchronous. Notice the long timeout value of five seconds because Yahoo is a publicly available service with no guarantees of responsiveness. It may take this long or longer to respond. It's another brittle aspect to this test.

The `waitFor` is shown inline above for illustrative purposes, a more object-oriented approach would be to push this into the browser object and hide the asynchronousity and timeout details from the client.

{title="Pushing the asynchronous handing into the browser model", lang="java", line-numbers="off"}
~~~~~~~
    browser.navigateToSummaryPage()
        .requestValuationForShares(100)
        .assertThatPortfolioValue(is("91,203.83"));
~~~~~~~

We can improve the test slightly by faking out Yahoo and forcing it to return a canned response (a price of `200.10` for each request). Lines 15-17 below set up any HTTP call to the URL `/v1/public/yql` to respond with a valid HTTP response containing the response string from line 14.

{title="Listing 2: Same test but with a faked out market data service", lang="java", line-numbers="on"}
~~~~~~~
public class PortfolioSystemTestWithFakeYahoo {
    private final Server application = Fixture.applicationWithRealYahoo();
    private final FakeYahoo fakeYahoo = new FakeYahoo();
    private final Browser browser = new Browser();

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
        browser.navigateToSummaryPage().requestValuationForShares(100);
        waitFor(assertion(portfolioValuationFrom(browser),
            is("20,010.00")), timeout(millis(500)));
    }

    @After
    public void stopServers() {
        application.stop();
        fakeYahoo.stop();
        browser.quit();
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
A> | Access adapters only via ports | ![](images/part2/design.md/port-line-adapter.png) |
A> | Components only communicate with ports | ![](images/part2/design.md/circle-arrow-port.png) |
A>

The next step is to describe the system architecture in terms of boundary ports (interfaces), their adapters (implementations) and core application logic components. For our application, it might look something like this.

![](images/part2/design.md/ports-and-adapter-design.png)

All communication to the domain model is done via a port and adapter pair. The exception, Yahoo, is explained later. We've broken down the previous coarse grained architecture into a series of ports, their adapters and domain components.

Using the decoupled ports and adapters approach to create comparable coverage, we'd design tests around the following.

* Testing the UI display and behaviour (see [Example 1](#example-1))
* Testing the outgoing messages (see [Example 2](#example-2))
* Testing the Portfolio HTTP API (see [Example 3](#example-3))
* Testing the Portfolio valuation calculation (see [Example 4](#example-4))
* Testing the Market Data API (see [Example 5](#example-5))
* Testing real Yahoo! Market Data (see [Example 6](#example-6))
* Testing end-to-end (system tests)

Lets have a closer look at each of these next. You can also refer to the source code of the [sample application](http://github.com/tobyweston/essential_acceptance_testing_code) for more details.



### Example 1: Testing the UI display and behaviour {#example-1}

Testing the UI display is about verifying the UI behaviour without exercising backend components. For example, we might want to verify that if the user asks for the current portfolio's value in the UI that it's displayed with correct rounding and with commas. You might also be interested if currencies are displayed, negative numbers are shown in red or informational text is displayed in the event that no value is available. We'd like to be able to make assertions without having to go through the backend so we'll use a real UI but a fake backend (we'll be faking out the "port" in the diagram below).

![](images/part2/design.md/test-ui-only.png)

In terms of our sample application, the UI makes a HTTP `GET` call to the backend. It's implemented by a ajax call inside a HTML page. In testing however, we'll replace the Portfolio with a test double and therefore just test that the UI correctly displays whatever the test double returns. Specifically then, we'd

* Start up the UI server (remember this is basically serving static HTML but is started as it's own app)
* Setup a fake Portfolio server with a canned response against specific HTTP GET calls
* Use the browser in the test to click the refresh valuation control
* Verify the canned response is displayed as intended within the UI

For example, we could setup the fake server to respond with a value of `10500.988` for a `GET` against `/portfolio/0001`. When the UI is used to make the request, we can verify the response is shown as `$10,500.99`. This would exercise the UI logic to round the result, introduce commas and add a currency symbol.

Note that we don't verify how the request actually interacts with the Portfolio. This is a subtle omission but decouples the details of the request from how a response is used leaving us to test more display scenarios without worrying about request details. If we were to verify the request, any changes to the request API would cause changes to this test even though it's only about display logic.

We'd fake out the server component and the UI would make a real HTTP request. An alternative approach would be to put the ajax call behind our own JavaScript interface and substitute this during testing. That way, we can exercise the port without making a real HTTP call.

Lets look at an example to verify monetary values are displayed with thousands separated by commas (`1,000,000` and not `1000000`). We'll opt for a HTML based specification to describe the requirements;

A> #### When I ask for the portfolio value in the UI, it's formatted with commas
A>
A> Given a portfolio value of `10500.988`
A>
A> When a user refreshes the portfolio page
A>
A> Then the portfolio value is requested and displayed on the UI as **`10,500.99`**

We'll use [Concordion](http://www.concordion.org) as the framework for automating this as a test. We use HTML to document the specification and use Concordion as a way to execute it like a regular JUnit test. You markup the HTML to encode instructions that Concordion interprets at runtime to call application logic and make assertions. After it's done, it outputs the result as a modified version of the specification. It's not important that we're using Concordion. What is important is that we're producing readable artifacts for the customer.

The HTML specification for our example would like the following.


{title="Listing 1.1: HTML Specification marked up with Concordion instrumentation", lang="html", line-numbers="on"}
~~~~~~~
<html xmlns:concordion="http://www.concordion.org/2007/concordion">
<body>
<h1>Portfolio Valuation</h1>

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



Concordion uses a test fixture to match the specification to an executable test. In science, a fixture is often physical apparatus used to support a test specimen during an experiment. The experiment or test is distinct from the apparatus that supports it. JUnit often muddles this idea because a JUnit test will typically include test support code (the fixture part) as well as actual test scenarios.

When we use a HTML specification like Listing 1.1, we can create fixtures which are more about supporting the test and the test scenarios themselves are encoded in the specification. We can create differing scenarios in HTML but reuse the same fixture. Our fixture for the above might look like the following.



{title="Listing 1.2: Test fixture for use with scenarios described in HTML specifications", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class UiPortfolioValueDisplayTest {
    private final HttpServer ui = new UiServer();
    private final FakeHttpServer application = new FakeHttpServer(8000);
    private final Browser browser = new Browser();

    @Before
    public void start() {
        ui.start();
        application.start();
    }

    public void requestPortfolioValue(String body) {
        application.stub(
            urlEndingWith("/portfolio/0001"),
            aResponse().withBody(body));
        browser.navigateToSummaryPage().requestValuationForShares(100);
    }

    public String getPortfolioValue() throws InterruptedException {
        return browser.navigateToSummaryPage().getPortfolioValue();
    }

    @After
    public void stop() {
        ui.stop();
        application.stop();
        browser.quit();
    }
}
~~~~~~~


By annotating the fixture with `@RunWith(ConcordionRunner.class)`, the class can be run like a regular JUnit test. It will use the [Concordion](http://www.concordion.org) runner to find and parse the HTML specification calling into the fixture as appropriate. Notice that there is not `@Test` methods, the fixture is run using the JUnit framework but it's the HTML specification that acts as the test.

The HTML sets up the fake server to respond with `10500.988` by setting a "variable" on line 15 (Listing 1.1) which is passed into the `requestPortfolioValue()` method of the fixture. As the HTML is interpreted, when it reaches line 20, it'll actually call the method on the fixture. At this point, the fixture will control an instance of the browser to refresh, triggering a `GET` request using JQuery.

The `GET` request will trigger the canned response to be returned ready for display. It's JavaScript in the UI that receives this response and introduces the commas. It's this that we're really trying to test so we add an assertion in the Concordion markup at line 27 (Listing 1.1). This line will get the actual value from the UI using the fixture's method and compare it with the HTML element. After running, Concordion updates the specification with a successful result shown in green.

![](images/part2/design.md/test-ui-only-specification-result.png)



### Example 2: Testing the outgoing messages {#example-2}

In the previous example, we made no verifications against the request mechanism so that we could focus solely on display semantics. The next example focuses on the request mechanics. We're interested in exercising the interaction between the UI and the Portfolio port.

The previous test asks "when I ask for a portfolio value in the UI, how is it displayed?", this test is concerned with what it actually means to ask for a portfolio's value?

![](images/part2/design.md/test-ui-to-portfolio.png)

When the UI asks for a valuation, a specific message is sent over the wire. This example would verify the request and response formats. For example, if the request is sent as JSON, the JSON content could be verified. The response body could also be verified against a specific JSON format and the HTTP response code verified to be 200 (OK). How the response is actually used is left to other tests.

Specifically, we'd

* Start up the UI server
* Setup a fake Portfolio server with an expectation against a specific HTTP request
* Use the browser to refresh the valuation
* Verify the request expectation and return a canned response
* Verify that a response was received but not how it is used in the UI

When the UI asks for the current value, a message is sent to the Portfolio component. Testing the outgoing messages would use a real UI to call a test double (representing the Portfolio's port) so that we can assert expectations on the message format. If we had multiple UIs (for example a desktop client), we'd need to test how each of them communicate with the port. The port represents the API and the outgoing messages from each UI should be tested against the API specification.

An example specification interested in the Portfolio's API might look like this.

A> #### What does it mean to ask for a portfolio value?
A>
A> When the user asks for the current portfolio valuation in the UI
A>
A> Then a request for the portfolio value is made to the application and the response is returned


With a corresponding fixture as follows.

{title="Listing 2.1: Test fixture for working with UI to Portfolio requests", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class UiPortfolioValueRequestTest {
    private final HttpServer ui = new UiServer();
    private final FakeHttpServer application = new FakeHttpServer(8000);
    private final Browser browser = new Browser();

    private final static String expectedUrl = "/portfolio/0001";

    @Before
    public void start() {
        ui.start();
        application.start();
    }

    public String requestPortfolioValue() throws MalformedURLException {
        application.stub(
            urlEndingWith("/portfolio/0001"),
            aResponse().withBody("1000"));
        browser.navigateToSummaryPage().requestValuationForShares(100);
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
        browser
            .navigateToSummaryPage()
            .assertThatPortfolioValue(not(isEmptyOrNullString()));
        return true;
    }

    @After
    public void stop() {
        ui.stop();
        application.stop();
        browser.quit();
    }
}
~~~~~~~

Like the previous example, a canned response is setup (lines 17-19) only this time, the fixture can verify that the UI made the correct type of request (line 26). It asserts that the correct URL was accessed using the HTTP `GET` method and that any required headers were supplied. The test can then go on to verify the response is correct (line 36). In this case, it just verifies that the response makes it's way onto the UI but doesn't test anything specific.

Notice that in the result below, the specifics of what it means for a request to be valid are omitted. The language in the test talks in abstract terms about the request ("a request for the portfolio value is made and the valuation is returned"). This decouples the language in the test specification from it's implementation.

![](images/part2/design.md/test-ui-to-portfolio-specification-result.png)



### Example 3: Testing the Portfolio HTTP API {#example-3}

Once we're satisfied about the communication between UI and Portfolio, we can look at the behaviour of the Portfolio in more detail. This part is responsible for exposing an interface for requesting valuations and processing any valuation requests. The interface is implemented as a HTTP adapter to accept incoming requests. It turns the HTTP call (the external API) into a Java call (the internal API) and a Java result into a HTTP response.

![](images/part2/design.md/test-portfolio-valuation.png)

An important point to note is that these tests will assume that the RESTful infrastructure is tested elsewhere. Rather than start up a HTTP server, configure RESTful endpoints and make a real HTTP client request, the tests will work with underlying components directly. This separates the configuration and infrastructure (of the HTTP server) from the behaviour (the business logic classes) tests. We'll defer the infrastructure tests until later (see [A thin slice of end-to-end](#testing-end-to-end)). Starting up a full container for multiple business scenarios can be wasteful when they inadvertently exercise the same infrastructure scenarios again and again.

In Java terms, you can think of this as starting up a servlet container and testing a servlet along with it's configuration in the `web.xml` versus testing the `Servlet` directly. We don't really need to test a servlet running within the container, we can safely assume the web container works and that thin slices of configuration will be tested in subsequent tests.


An example specification might look like this.

A> #### Valuations are returned in response to HTTP requests
A>
A> When a HTTP request for a valuation is received
A>
A> Then the total portfolio valuation will be returned to the requester


With a corresponding fixture used to verify the HTTP adapter works as intended.

{title="Listing 3.1: Test fixture for the Portfolio's port HTTP adapter", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class PortfolioValuationTest {
    private final Mockery context = new JUnit4Mockery();

    private final Valuation valuation = context.mock(Valuation.class);
    private final PortfolioResource portfolio =
        new PortfolioResource(valuation);

    public boolean verifyValuationResponse() {
        context.checking(new Expectations() {{
            oneOf(valuation).value(); will(returnValue(new Money("9.99")));
        }});

        Response response = portfolio.value(null);
        assertThat(response.entity().toString(), is("9.99"));
        return true;
    }
}
~~~~~~~

The `PortfolioResource` class is the adapter that's accessed when a HTTP request is received. It's the external API mentioned above. The RESTful framework used to route the `GET` call to this class is a JSR-311 framework called [Utterlyidle](https://code.google.com/p/utterlyidle/) running in an embedded HTTP server. A common alternative is to use [Jersey](http://jersey.java.net/) and [Jetty](http://www.eclipse.org/jetty/). Either way, we're not interested in testing these frameworks or their configuration here. We're assuming that a HTTP `GET` is relayed to the `PortfolioResource` class and the `value` method is executed. Line 15 above calls the method directly in the test simulating this.

The `PortfolioResource` class shown below uses an instance of `Valuation` as a collaborator to perform the actual calculation and at line 12, sets the result in the HTTP response body. We use [JMock](http://www.jmock.org) in the test to implement a test double for `Valuation` and simply verify that it's used and it's result is bundled in the HTTP `response` body in Listing 3.1 at line 16.

{title="Listing 3.2: The `PortfolioResource` class represents the HTTP adapter", lang="java", line-numbers="on"}
~~~~~~~
public class PortfolioResource {
    private final Valuation valuation;

    public PortfolioResource(Valuation valuation) {
        this.valuation = valuation;
    }

    @GET
    @Path("/portfolio/{id}")
    public Response value(@PathParam("id") String id) {
        return response(OK)
            .entity(valuation.value())
            .build();
    }
}
~~~~~~~



This may seem very much like a unit style test. That's because it is. It focuses narrowly on specific questions and can only be called an acceptance test because of the way its used (to give customer's confidence via the HTML output). There's nothing in our definition of an acceptance test that precludes it being written as a unit style test.

![](images/part2/design.md/test-portfolio-valuation-specification-result.png)



### Example 4: Testing the Portfolio valuation calculation {#example-4}

One or more tests would be needed to verify the calculation logic of the domain model. How does the Portfolio actually go about summing the stocks and where does it get their prices? Given the previous example shows that HTTP requests are translated into a Java messages to get a valuation, these tests would go into more detail as to what is involved in valuing the portfolio.

For example, you might include tests to verify the summing of stock prices a customer owns, how the system responds when prices can not be retrieved or if a customer has no stocks to value. Our example is going to look the simple case of how a single stock is valued, which is done by looking up the price in the Market Data component.

![](images/part2/design.md/test-market-data.png)

The test must interact with Market Data in order to price the stocks the customer holds so the test will use a real Portfolio component but use a test double for the Market Data interface. We talk about a customers _book_ as a way as the to record what stock quantities a customer holds. So for example, we might say that a customer has a position of 100 against Google on their book.

An example scenario might look like this.

A> #### Calculating the value of a single stock with a closing price
A>
A> Given a customer book containing `100` shares in `AMZN` and a stock price for `AMZN` of `261.82`
A>
A> When a request for a valuation is received
A>
A> Then the total portfolio valuation will be `26182.00`

with a corresponding fixture.

{title="Listing 4.1: Test fixture for the Portfolio's calculation logic", lang="java", line-numbers="on"}
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

The previous example mocked out the valuation component (at line 12 in Listing 3.1) whereas this test uses the real class to calculate prices (defined at line 6 and executed at line 17). It works with the `MarketData` and `Book` components to get the information it needs. These are stubbed at lines 4 and 5. Given these test doubles, we can setup stocks on a customer book along with corresponding prices in this fixture and verify different scenarios using HTML specifications like the following.

{title="Listing 4.2: HTML Specification marked up with Concordion instrumentation", lang="html", line-numbers="on"}
~~~~~~~
<html xmlns:concordion="http://www.concordion.org/2007/concordion">
<body>
<h1>Portfolio Valuation</h1>

<h2>Given</h2>
<p>
    A customer book <span concordion:execute="setBook(#symbol, #quantity)">
    containing <b concordion:set="#quantity">100</b> shares in
    <b concordion:set="#symbol">AMZN</b></span> and a stock price in the
    <span concordion:execute="setMarketDataPrice(#symbol, #price)"> market
    data system for <b>AMZN</b> of <b concordion:set="#price">261.82</b>
    </span>
</p>

<h2>When</h2>
<p>
    A request for a valuation is received
</p>

<h2>Then</h2>
<p>
    The total portfolio valuation will be
    <b concordion:assertEquals="getTotalPortfolioValue()">26182.00</b>
</p>
</body>
</html>
~~~~~~~


As before, the HTML interacts with the fixture to setup the stubs (lines 7 and 10), execute the function under test and verify the results (line 23). The result would look something like this.

![](images/part2/design.md/test-portfolio-valuation-calculation-specification-result.png)



### Example 5: Testing the Market Data API {#example-5}

The previous example was concerned with calculation logic once we have stock quantities and prices but we still need to test how stock prices are actually retrieved. Stock prices change daily and are typically supplied by large institutions like [Bloomberg](http://www.bloomberg.com/markets/) as data feeds. In production, we're using a free data feed supplied by Yahoo!

We have a Market Data API to get the prices, so we're naturally focusing on testing this here. Examples scenarios might include verifying what happens when stock prices are queried or when stock prices are unavailable.

![](images/part2/design.md/test-market-data.png)

The example specification below outlines what we expect to happen, in terms of interaction with the Market Data component, when a valuation is requested.

A> #### Market data API
A>
A> When a request for a valuation is received for a book containing `AMZN` and `GOOG` stocks
A>
A> Then market data is queried for `AMZN` and `GOOG`


With a corresponding fixture Setting expectations against the market data API.


{title="Listing 5.1: Test fixture for the market data API", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class MarketDataTest {
    private final Mockery context = new JUnit4Mockery();

    private final MarketData marketData = context.mock(MarketData.class);
    private final StubBook book = new StubBook();
    private final Portfolio portfolio = new Portfolio(book, marketData);

    public MultiValueResult verifySymbolCheckedWas(
            final String firstSymbol, final String secondSymbol) {
        book.add(fromSymbol(firstSymbol)).add(fromSymbol(secondSymbol));
        context.checking(new Expectations() {{
            oneOf(marketData).getPrice(fromSymbol(firstSymbol));
            oneOf(marketData).getPrice(fromSymbol(secondSymbol));
        }});
        portfolio.value();
        context.assertIsSatisfied();
        return multiValueResult()
            .with("firstSymbol", firstSymbol)
            .with("secondSymbol", secondSymbol);
    }
}
~~~~~~~

Notice the verification is in the form of expectations. We're saying here that we expect a certain interaction between the `portfolio` and the `marketData` components but not verifying how any return values might be used by the `portfolio`.

It's saying that when when prices are queried for Amazon and Google, the market data component is accessed using the `getPrice` method of the API and that's all.

The result would look something like this. Again, notice that no results are explicitly stated, only that the market data "is queried for AMZN and GOOG".

![](images/part2/design.md/test-market-data-specification-result.png)



### Example 6: Testing real Yahoo! Market Data {#example-6}

We'd also need some kind of test to ensure that the real Yahoo market data component operates as expected. We've already built our market data adapter that we fake out in the previous tests (Example 5.) but now we need to make sure that how we expect fake market data components to behave in tests is actually how they behave with real Yahoo.

We've shown that when the market data API is queried for say, Amazon or Google, that a specific API method is called, now we need to show what happens when it's called.

![](images/part2/design.md/test-yahoo.png)


For example, specifying that a specific request should be made to Yahoo when a price is requested might look like this.

A> #### Specific HTTP message to Yahoo
A>
A> When the price for `AMZN` is requested by the portfolio for the date `March 26, 2013`
A>
A> Then the following HTTP `GET` request to Yahoo is made [a specific HTTP message]


With a fixture as below.

{title="Listing 6.1: Test Yahoo's query endpoint", lang="java", line-numbers="on"}
~~~~~~~
@RunWith(ConcordionRunner.class)
@ExpectedToPass
public class YahooTest {

    private Date date;
    private final FakeYahoo yahoo = new FakeYahoo();
    private final String host = "http://localhost:" + FakeYahoo.port;
    private final Yahoo client = new YqlWebService(anApacheClient(), host);
    private final Clock clock = new FrozenClock(date) {
        @Override
        public Date now() {
            return date;
        }
    };
    private MarketData marketData = new YahooMarketData(client, clock);

    @Before
    public void start() {
        yahoo.start();
    }

    public String getPriceFromYahoo(String symbol, String date) {
        String response = "{\"quote\":{\"Close\":\"200.10\"}}";
        this.date = new Date(date);
        yahoo.stub(
                urlStartingWith("/v1/public/yql"),
                aResponse().withBody(response));
        marketData.getPrice(fromSymbol(symbol));
        List<LoggedRequest> requests
            = yahoo.requestsForHttpGet(urlStartingWith("/v1/public/yql"));
        return new WiremockLoggedRequest(requests).toString();
    }

    @After
    public void stop() {
        yahoo.stop();
    }
}
~~~~~~~

There's a fair bit of setup in this test. The main thing to note is that a fake Yahoo server is setup (line 6) and the internal component that acts as the client (at line 8) is setup to point to it. The client will make a real HTTP request to the fake server. The fake server allows us to interrogate the messages it received for the purposes of the test (line 29).

The assertion against a specific HTTP message is defined in the HTML specification. The result looks like this.

![](images/part2/design.md/test-yahoo-specification-result.png)



A> ## Keeping fakes in sync with real services {#keeping-fakes-in-sync-with-real-services-aside}
A>
A>We've verified that we make the right API calls to Yahoo but used a fake Yahoo to do so. The tests go through the production Yahoo class adapter but talk to a different end points which we own. There's a danger that the behaviour we set on these fake services can get out of sync with the real services. If Yahoo change their API, we'd want a test to fail. Faked out tests could still pass.
A>
A>For example, if we've build our tests expecting market data to respond with a HTTP response code of 404 (Not Found) for a price that isn't yet available, we should prove that's what Yahoo would actually return. Working from a specification is one thing but we'd prefer to have a test fail if our mocks and real market data components get out of sync.
A>



## Testing end-to-end (system tests) {#testing-end-to-end}

The previous examples focus on specific scenarios, interacting with a limited number of components. None of the previous tests interact with more than couple of components but they overlap to simulate the broader path through the system. The run within a reduced context (for example, not within a fully started application stack) and avoid duplication. This does however mean that so far, we've never run all the components together at the same time.

To address this, we still need to write some additional end-to-end tests. From the introduction of the decoupled architecture above, we still need to address the following points. I'm describing these as end-to-end as it reflects the notion of multiple components working together. It doesn't mean that we'll use real external systems though, the tests would be entirely within our own system boundary.

![](images/part2/design.md/test-end-to-end.png)

The few end-to-end tests required would startup the full stack and fake out external systems. They'd probably use the UI for input and are really there as litmus tests to ensure the production-like configuration of components is wired up correctly. We'd only run one or two test scenarios as we will have already tested the edge-cases and are just sense checking that the application is assembled correctly. These tests would be more about infrastructure that functionality.

People often get hung up on this kind of test. They worry that without exercising many scenarios through a fully assembled application, the system may not work in production. You have to have confidence in the previous tests and that they demonstrate the system's behaviour. You really shouldn't need many of these heavier, end-to-end tests.



## Benefits using ports and adapters

Getting the design of your tests right using ports and adapters means you wont be duplicating effort, you'll have created a efficient test suite that runs quickly. In a similar way that TDD gives you a flexible design, a ports and adapters design will encourage loosely coupled components with very flexible composability. You'll have built a very adaptable architecture.



## Disadvantages using ports and adapters

Decomposing a system into discrete but overlapping areas is actually quite difficult. It often feels like a protracted process and once done, it's difficult to keep all the overlapping parts in your head. When you come to write a new set of tests, you've got to first understand a whole bunch of previous tests and how they interconnect. Reasoning about where new ones might fit in is hard and its difficult to get feedback if you've got it wrong. Build times may go up but you'll probably just not notice that you're duplicating effort.

It can also be hard to win over business stakeholders, testers and developers. It's much more natural for people to accept the system is working a certain way if they see if running in it's entirety. Despite logical arguments that a decoupled testing approach can yield equivalent coverage, it's just human nature to accept the empirical over the intellectual argument.

Introducing this stuff late in a project lifecycle is arguably less likely to succeed. If you've already got a slow and duplication heavy build, it's probably not the right technique for a quick fix. It takes sustained effort to get right
and is easier to introduce right from the start of a new project. If you're willing to retrofit to an existing system, be prepared to re-architect large parts of the system.
