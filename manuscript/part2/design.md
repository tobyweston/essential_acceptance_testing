# How testing can influence design {#design}

If we decouple the system's components, it makes them easier to test in isolation. This has the additional benefit of creating a more flexible architecture. This section describes the ports and adapters approach when applied to testing.



## Example problem

Lets imagine an investment portfolio system concerned with helping customers manage their stock investments. The acceptance criteria for the next piece of work is as follows.

> "As a retail customer, when I ask for my portfolio's value, today's stock price is retrieved from the market, multiplied by the number of stocks I own and the total is displayed."

The system is composed of a web front end (UI), server side component accessed via HTTP (the back-end) and a market data service provided by Yahoo.


## Ports and adapters {#ports-and-adapters}

Rather than verify the system using coarse grained, end-to-end style tests (like in the [Alternatives](#use-a-hexagonal-architecture) section), we'll describe how a ports and adapters technique can be used. Rather than running several coarse grained tests, we'll decouple the system using explicit boundaries (interfaces) and design a set of tests to exercise the iteration between those boundaries. These should compliment each other to provide the same level of confidence. 

![Multiple coarse grained tests repeatidly exercise the same parts of the system architecture](images/part2/design.md/coarse-grained-tests-design.png)

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

Keep to the constraints shown in the [Ports and adapters symbols aside](#port-and-adapters-symbols-aside), all communication to the domain model is done via a port and adapter pair. The exception, Yahoo, is explained later. 

We've broken down the previous coarse grained architecture into a series of interfaces (ports), their implementations (adapters) and domain model. The domain model is both the `Portfolio` and `Market Data` and we could have represented this as a single element.


* Test 1 - A pure UI test
* Test 2 - A UI transport test
* Test 3 - Portfolio's HTTP adapter test
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



### Test 3 - Portfolio's HTTP adapter test

When the `Portfolio` HTTP adapter receives a specific message, we expect a specific interaction with the `Portfolio` component. We're verifying the transport layer (JSON/HTTP) is translated into our business API. 

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