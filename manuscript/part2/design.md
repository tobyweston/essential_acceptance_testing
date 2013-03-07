# How testing can influence design


## Ports and adapters {#ports-and-adapters}

When a user requests the current price in the UI, the business component is asked for the current price and responds accordingly, so that the user can see the latest price (Abstract tag line, what's happening)

(Concrete in expectation, not in implementation) Examples; Given the current price is 99.9, when the current price button is clicked then 3 is displayed in the "foo" field. Additional examples might include when there are no prices, non-zero prices etc. It's a this point you define the tag line above.

---

 1. When you click the button, tbe UI asks for the current price and it's displayed in the UI. Examples are special displays; -ve prices in red. UI Test. Real UI calls stub Stocks (port).

    What does it mean to ask for the current price. When the UI asks for the current price (implying it the mechanism can be substituted, sometimes its a button, sometimes its a drop down with auto update) , a message is sent to the Stocks component (or in our case, the business Stocks' "port" represented by). Verified by expectation.

    UI/view test

 1. Next test is 'what does it mean to 'ask for the current price'? When UI asks for the current price, a message is sent to the stocks component and it looks like this. Real UI calls mock Stocks (port) so we can assert expectations on the message format (ie, Java API or JSON). For example, if json; when I click a button I expect a message to go over the wire.

    Even if we have different 'views', we only need to test this once because they view tests all ask the same question and this is verifying what happens when you ask the question.

    The definition of 'UI asks for' is the same for each test. Test it once; it's defined _how_ you actually do it in subsequent tests.

    UI transport test.

 1. When the Stocks component (adapter) receives a specific message (in terms of format, ie, json), we assert an expectation on the incoming port on the Stocks component. We're verifying the transport layer (JSON/HTTP) into API (interface). We're stubbing out the real Stocks component and setting an expectation instead.

    Tests JSON turns into Java (API)

 1. Testing our specific implementation of the port. When you ask for the current price, I'll go and get it from the Market Data port; I'll ask Market Data for the current price of stock for today's date. Expectation rather than a stub.

    Java (API) to Java (API).


 1. Next would be the Yahoo adapter, an integration test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22.

    Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.



### A note on integration tests

We've verified that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.


 Ameliorates the customer's concern...