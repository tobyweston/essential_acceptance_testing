
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

For an expanded example, see the [ports and adapters section](#ports-and-adapters).




(to add at the end)

## Summary

Not defining acceptance criteria upfront and getting agreement in favour of informal agreement and fast feedback against production.