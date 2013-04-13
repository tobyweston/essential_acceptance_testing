
# Alternatives to acceptance tests {#alternatives}

## Don't write acceptance tests

There's always the option not to write acceptance tests.

If you genuinely don't have a customer or if you are your own customer, it's worth thinking carefully about whether there is value in going through the steps described in [Part 1](#[part1).

A big part of acceptance testing is ensuring you achieve what the customer intended. The customer is the audience and acceptance tests aim to give them confidence. Without that audience, testing confidence is more about supporting the development team and is typically technology focused. In Brian Marick's testing matrix, testing focus tends to shift from the upper to lower quadrants when you don't have a customer.

![Brian Marick's testing matrix](images/part2/alternatives.md//testing-matrix.png)

You may shift emphasis onto coarse grained style testing, exercising large parts of the system with scenarios driven out by the development team and not the business. You can think of this as component testing if it helps. Test whatever you feel needs testing. Start the stack up, drive the application through it's UI or test multiple components using a ports and adapters style. The choice is yours.

 The key to this point is that you should understand if you really need to write customer focused, business facing tests. You can then make a deliberate decision to not go through the story delivery lifecycle as it's described in Part 1. You'll understand where to spend effort in terms of the testing matrix above and can make decisions about the types of test to write. Something like the testing pyramid developed by Mike Cohn in [Succeeding in Agile](http://amzn.to/YnXRdp) may be a useful guide.

![The testing triangle; fewer tests exist that exercise the UI than core services (behaviours) and components (units)](images/part2/alternatives.md/test-pyramid.png)



## Use a hexagonal architecture {#use-a-hexagonal-architecture}

The traditional view of acceptance tests is that they are heavy weight, long running and coarse grained. This is because typically, they test multiple components, often repeatedly across scenarios. They'll often exercise the UI and database.

Alistair Cockburn's [Hexagonal](http://alistair.cockburn.us/Hexagonal+architecture) or _ports and adapters_ architecture talks about decoupling these components to provide a lightweight alternative. When you decompose to components that can be tested independently, you can be more flexible about composing test scenarios. That way, scenarios no longer have to contain repeated fragments.

Cockburn's canonical example talks about decoupling the database and/or UI so that the core system can be tested with or without these components. Have a look at the [How testing can influence design](#how-testing-can-influence-design) section for a more in-depth look.

In order to replace a long running traditional style acceptance test with an equivalent ports and adapters style test, you need to overlap tests to replicate the coverage. For example, lets assume we need to verify the following;

> "when a asks for their portfolio value, today's stock price is retrieved from Yahoo, multiplied by the number of stocks the client owns and the total is displayed in the UI"

There's essentially three components here, the UI, the business logic components (the "domain model") and an external Yahoo stock price service. The traditional view might interact with these like this.

![](images/part2/alternatives.md/typical-acceptance-test.png)

We don't need to interact with all of these at once to verify the statement above. Instead, we can verify the following.

 1. When we ask for the portfolio value in the UI, a specific message is sent to the domain model.

	The response from the domain model updates a specific field on the UI appropriately

    The shaded circle represents a test double; a stub or mock that we use in place of a real component.

	![](images/part2/alternatives.md/ports-and-adapters-1.png)


 1. When the domain model receives the message from the previous test, it calls out to a market data service (for stock prices).

	The response from the market data service is returned to the client in the agreed message format.

	![](images/part2/alternatives.md/ports-and-adapters-2.png)

 1. An integration test may also be need to verify that the domain model's message makes the correct call to a real Yahoo service, verifying that the previous test is actually representative.

These verifications overlap each other to address to aggregated verification, they just do it in a series of steps rather than in one big go. Putting it all together it would look like the following. The dashed lines show how tests need to overlap to provide completeness. Shaded circles are fake components, unfilled circles are real components or services.

![](images/part2/alternatives.md/ports-and-adapters-combined.png)

This is a slightly simplified description, for an expanded example, see the [Ports and adapters](#ports-and-adapters) section.



## Don't specify

We've talked a lot about specifying upfront but defining a specification upfront, albeit incrementally, is still a form of upfront design. It's an improvement over traditional waterfall "big upfront design" but it may be an option to eliminate it all together.

If you can deliver features quickly enough and cheaply enough, you can agree behaviour with the customer against the deployed, live features. To do this effectively, it makes sense to have very small requirements or stories and to be talking to the business constantly. You should expect to deploy several iterations of features before getting it right. Google have apparently practiced these ideas by deploying experimental features to a subset of their environment to gather feedback.

It's difficult though as it presupposes that the stories have demonstrable value and can be small enough to deliver cheaply. In some domains it may just not be possible to deliver "work in progress" that isn't quite technically correct. Finance applications for example may not be able to tolerate incorrect calculations. Domains may also be constrained by regulatory requirements.


## Measure don't agree

Arguably the most important success criteria is if a feature directly affects your revenue. If a deployed feature is making or saving you money, it's a success. You may get additional feedback by virtue of being in a live environment. If you can move away from agreeing acceptance criteria and defining acceptance tests upfront towards understanding how features affect key business metrics, you can start to measure these and use them to course correct. This fits nicely into the plan, do, check, adjust cycle.

![Identifying business metrics inputs directly into the check step of Deming's PDCA cycle](images/part2/alternatives.md/pdca.png)



## Log don't specify

In the typical process, specification is done upfront. The acceptance criteria is agreed and formalised in an acceptance test that remains unimplemented. Stakeholders get together to agree these artifacts and then development gets underway. When done, everyone gets together and confirms that the tests verify the criteria (through demos and reviewing the acceptance tests). If the formalising acceptance criteria step becomes onerous, you can drop this in favour of a more lightweight approach.

Matt Savage coined the phrase "log don't specify" to capture the idea of writing acceptance tests in such a way as to capture and communicating key events during a test but without specifying these upfront. Using typical specification frameworks like Concordion or FIT, HTML "specifications" document important events, inputs and outputs of a test. The HTML is then instrumented and run with the framework to produce styled HTML artifacts indicating success or failure. These are the kind of artifacts you can share with business to verify requirements and document system behaviour. There's usually an setup cost in authoring then instrumenting these artifacts.

You can flip this on its head if you skip the specification step and instrument your test code directly to document behaviour as it executes. The [Yatspec](http://code.google.com/p/yatspec/) framework does this when writing Java tests. It's aim is to reduce the cost of specification upfront but replaces this with constraints in the way you write the tests. You're forced to write test code adhering to certain conventions to be able to log events as they happen. This has a cost in itself as the natural language structure it requires may not come easily for all test problems. The theory though is that this instrumentation cost is lower than, for example, Concordion's upfront costs. That's something you'll have to judge for yourself however.

![Example of Yatspec output documenting system behaviour. The test code logs runtime behaviour](images/part2/alternatives.md/yatspec-example.png)


