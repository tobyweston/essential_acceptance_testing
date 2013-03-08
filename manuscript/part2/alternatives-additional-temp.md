
(to slot in after 'Don't write acceptance tests')

## Hexagonal Architecture

The traditional view of acceptance tests is that they are heavy weight, long running and coarse grained. This is because typically, they test multiple components, often repeatedly across scenarios. They'll often exercise the UI and database.

Alistair Cockburn's [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture) or _ports and adepters_ design talks about decoupling these components to provide a lightweight alternative. When you decompose to components that can be tested independently, you can be more flexible about composing test scenarios. That way, scenarios no longer have to contain repeated fragments. 

Cockburn's canonical example talks about decoupling the database and/or UI so that the core system can be tested with or without these components. Have a look at the [How testing can influence design](#how-testing-can-influence-design) section for a more in-depth look.

In order to replace a long running traditional style acceptance test with an equivalent ports and adapters style test, you need to overlap tests to replicate the coverage. For example, lets assume we need to verify the following;

> "when a asks for their portfolio value, today's stock price is retrieved from Yahoo, multiplied by the number of stocks the client owns and the total is displayed in the UI"

There's essentially three components here, the UI, a business logic component (the "domain objects") and an external Yahoo stock price service. We don't need the test to interact directly with all of these to verify the statement above.

Instead, we can verify:

 1. When we ask for the portfolio value in the UI, a specific message is sent to the business logic component.
 1. The response from the business logic component updates a specific field on the UI appropriately
 1. When the business component receives a message, it calls out to a market data service (for stock prices).
 1. The response from the market data service is returned to the client in the agreed message format (which may be in a different form).

These verifications overlap each other to address to aggregated verification, they just do it in a series of steps rather than in one big go.

This is a slightly simplified example, for an expanded example, see the [ports and adapters section](#ports-and-adapters).




(to add at the end)

## Summary

Not defining acceptance criteria upfront and getting agreement in favour of informal agreement and fast feedback against production.