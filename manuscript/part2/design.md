# How testing can influence design {#design}

If we decouple the system's components, it makes them easier to test in isolation. This has the additional benefit of creating a more flexible architecture. This section describes the ports and adapters approach when applied to testing.



## Example problem

Lets imagine an investment portfolio system concerned with helping customers manage their stock investments. The acceptance criteria for the next piece of work is as follows.

> "As a retail customer, when I ask for my portfolio's value, today's stock price is retrieved from the market, multiplied by the number of stocks I own and the total is displayed."



### Current design

We'll assume basic design of web front end (UI), decoupled back-end and a market data service provided by Yahoo.



## Ports and adapters {#ports-and-adapters}

Rather than verify the system using coarse grained, end-to-end style tests (as described in the [Alternatives](#use-a-hexagonal-architecture) section), we'll describe how a ports and adapters technique can be used.

So, rather than running tests the following.

![Multiple coarse grained tests exercise the same parts of the system](missing.png)

We'll decouple the system using explicit boundaries (interfaces) and design a set of tests to exercise the iteration between those boundaries. These should compliment each other to provide the same level of confidence.


Let's describe the system architecture in terms of boundary interfaces (or ports), their implementations (or adapters) and core application logic (or domain model(s)).

![](images/part2/design.md/ports-and-adapter-design.png)




* Test 1 - A pure UI test
* Test 2 - A UI transport test
* Test 3 - ???
* Test 4 - A test against our market data API
* Test 5 - Real test against Yahoo's version of market data


### Test 1 - A pure UI test

When a user requests the current price in the UI, the domain model is asked for the current price and responds accordingly, so that the user can see the latest value of their portfolio (Abstract tag line, what's happening)

(Concrete in expectation, not in implementation) Examples; Given the current price is 99.9, when the current price button is clicked then 3 is displayed in the "foo" field. Additional examples might include when there are no prices, non-zero prices etc. It's a this point you define the tag line above.

---

When you click the button, the UI asks for the current price and it's displayed in the UI. Examples are special displays; -ve prices in red. UI Test. Real UI calls stub Stocks (port).

What does it mean to ask for the current price. When the UI asks for the current price (implying it the mechanism can be substituted, sometimes its a button, sometimes its a drop down with auto update) , a message is sent to the domain model (the port). Verified by expectation.



### Test 2 - A UI transport test

The previous test simply asserts that the UI can ask for the current portfolio value, it's an abstract question so it decouples the assertion from the mechanism. What it means to actually ask for the current value is described by this test. They overlap.

When the UI asks for the current value, a message is sent to the domain model (`Portfolio`). This test will use a real UI to call the `Portfolio`s port (represented by a test double) so that we can assert expectations on the message format (for example, it's JSON). It's saying "when I click a button I expect a specific message to go over the wire".




Even if we have different 'views', we only need to test this once because they view tests all ask the same question and this is verifying what happens when you ask the question.

The definition of 'UI asks for' is the same for each test. Test it once; it's defined _how_ you actually do it in subsequent tests.



### Test 3 - ???

When the Stocks component (adapter) receives a specific message (in terms of format, ie, json), we assert an expectation on the incoming port on the Stocks component. We're verifying the transport layer (JSON/HTTP) into API (interface). We're stubbing out the real Stocks component and setting an expectation instead.

Tests JSON turns into Java (API)



### Test 4 - A test against our market data API

Testing our specific implementation of the port. When you ask for the current price, I'll go and get it from the Market Data port; I'll ask Market Data for the current price of stock for today's date. Expectation rather than a stub.

Java (API) to Java (API).



### Test 5 - A test against Yahoo

Next would be the Yahoo adapter, an integration test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22.

Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.



### A note on integration tests

We've verified that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.



## Thin slice of end-to-end

---
 Ameliorates the customer's concern...