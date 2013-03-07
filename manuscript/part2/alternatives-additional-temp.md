
(to slot in after 'Don't write acceptance tests')

## Hexagonal Architecture

The traditional view of acceptance tests is that they are heavy weight, long running, coarse grained tests, often exercising the UI and database. Alistair Cockburn's [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture) or _ports and adepters_ design talks about decoupling components to provide a lightwieght alternative.

The cannonical example talks about decoupling the database and/or UI so that the core system can be tested with or without these components. Have a look at the [How testing can influence design](#how-testing-can-influence-design) section for a more in-depth look.

In order to replace a long running traditional style acceptance test with an equivilant ports and adapters style test, you need to overlap the components to replicate the test coverage. For example, lets assume we need to verify the following;

> "when a user selects the 'current price' option in the UI, today's stock price is retrieved from Yahoo, and displayed in the UI"

There's essentially three components here, the UI, a business logic component (the "system") and an external Yahoo stock price service. We don't need the test to interact directly with each of these to verify the statement above.

Instead, we can verify, 

 - when we select the 'current price' option in the UI, a specific message is sent to the business logic component.
- the response from the business logic component updates a specific field on the UI appropriately
 - when the business component recieves a message, it calls out to a stock price service using a specific message format.
 - the response from the stock pirce service is returned to the client in the agreed message format (which will be different from the response).

 These verifications overlap each other to address to aggregated verification, they just do it in a series of steps rather than in one big go.
 
----
 
 When a user requests the current price in the UI, the business component is asked for the current price and responds accordingly, so that the user can see the latest price (Abstract tag line, what's happening)
 
(Concrete in expectation, not in implementation) Examples; Given the current price is 99.9, when the current price button is clicked then 3 is displayed in the "foo" field. Additional examples might include when there are no prices, non-zero prices etc. It's a this point you define the tag line above.

Here, the verification is 

---

 1. When you click the button, tbe UI asks for the current price and it's displayed in the UI. Examples are special displays; -ve prices in red. UI Test. Real UI calls stub Stocks (port). 

What does it mean to ask for the current price. When the UI asks for the current price (implying it the mechanism can be subtitutted, sometimes its a button, sometimes its a dropdown with auto update) , a message is sent to the Stocks component (or in our case, the business Stocks' "port" represented by). Verified by expectation. 

UI/view test
  
 1. Next test is 'what does it mean to 'ask for the current price'? When UI asks for the current price, a message is sent to the stocks component and it looks like this. Real UI calls mock Stocks (port) so we can assert expecations on the message format (ie, Java API or JSON). For example, if json; when I click a button I expect a message to go over the wire.
 
Even if we have different 'views', we only need to test this once becuase they view tests all ask the same question and this is verifying what happens when you ask the question. 

The definition of 'UI asks for' is the same for each test. Test it once; it's definied _how_ you actually do it in subsequent tests.

UI transport test.

 1. When the Stocks component (adaptor) recieves a specific message (in terms of format, ie, json), we assert an expectation on the incoming port on the Stocks component. We're verifying the transport layer (JSON/HTTP) into API (interface). We're stubbing out the real Stocks component and setting an expectation instead.

 Test's JSON turns into Java (API)

 1. Testing our specific implementation of the port. When you ask for the current price, I'll go and get it from the Market Data port; I'll ask Market Data for the current price of stock for todays date. Expectation rather than a stub.

 Java (API) to Java (API).
 
 
 1. Next would be the Yahoo adapter, an integration test. When the adapter is asked for the current stock price (via port) for stock GOGL and date Tuesday, we expect the price to be 134.22. 

Can't mock it because we're using real Yahoo. If Yahoo change their API, the test will fail. The previous test would still pass as our internal API is still working, it's just the adapter that's broken.
 
## A note on itegration tests

We've verifyied that we make the right API calls to Yahoo but some combination of tests may want to use a fake Yahoo. You'll still be using the Yahoo adapter but talking to a different service (which you own, for example, a running HTTP server with canned responses). When you get into this situation, you'll want to run a test now and again to verify your fake and real Yahoo services are in sync.
 
 
 Ameliorates the customer's concern...
 
 
(to add at the end)

## Summary

Not defining acceptance criteria upfront and getting agreement in favour of informal agreement and fast feedback against production.