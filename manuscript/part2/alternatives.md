
# Alternatives to acceptance tests {#alternatives}

## Don't write acceptance tests

There's always the option not to write acceptance tests.

If you genuinely don't have a customer or if you are your own customer, it's worth thinking carefully about whether there's value in following the story delivery lifecycle in full.

A big part of acceptance testing is ensuring you achieve what the customer intended. The customer is the audience and acceptance tests aim to give them confidence. Without a business customer, testing is more about supporting the development team and is typically technology focused. Brian Marick developed these ideas back in 2003 in a [series of posts](http://www.exampler.com/old-blog/2003/08/21/#agile-testing-project-1) where he discussed tests in terms of their position along two axis; if they support the development team or critique the product (the x axis) and if they're more technology focused or customer facing (the y axis).

In Brian Marick's testing matrix, testing focus tends to shift from the upper to lower quadrants when you don't have a customer.

![Brian Marick's testing matrix](images/part2/alternatives.md//testing-matrix.png)k

You may shift emphasis onto coarse grained style testing, exercising large parts of the system with scenarios driven out by the development team and not the business. You can think of this as component testing if it helps. Test whatever you feel needs testing. Start the stack up, drive the application through it's UI or test multiple components using a ports and adapters style. The choice is yours.

The key to this point is that you should understand if you really need to write customer focused, business facing tests. You can then make a deliberate decision about defining acceptance criteria upfront. You'll understand where to spend effort in terms of the testing matrix above and can make decisions about the types of test to write.

Another way to visualise your testing is to use consider where your tests fit in terms of the testing pyramid developed by Mike Cohn in [Succeeding in Agile](http://amzn.to/YnXRdp). Cohen suggests a balance of testing types; write fewer tests that exercise the UI than tests that exercise core services (behaviours) and components (unit tests). This is just one approach though and not gospel. It's certainly possible to invert the triangle and still have an effective testing strategy (we touched on this in the previous [overview section](#process-overview)).

![The testing triangle; fewer tests exist that exercise the UI than core services (behaviours) and components (units)](images/part2/alternatives.md/test-pyramid.png)



## Use a hexagonal architecture {#use-a-hexagonal-architecture}

The traditional view of acceptance tests is that they are heavy weight, long running and coarse grained. This is because they usually test multiple components, often repeatedly over different scenarios. They'll often exercise the UI and database and start up the full stack.

Alistair Cockburn's [Hexagonal](http://alistair.cockburn.us/Hexagonal+architecture) or _ports and adapters_ architecture talks about decoupling these components to provide a lightweight alternative. When you decompose to components that can be tested independently, you can be more flexible about composing test scenarios. That way, scenarios no longer have to contain repeated fragments.

Cockburn's canonical example talks about decoupling the database and/or UI so that the core system can be tested with or without these components. You can apply the principle to a much finer degree however if you build you're application in such a way as to clearly demarcate component boundaries and allow alternate components to be be plugged in at these boundaries.

In order to replace a long running traditional style acceptance test with an equivalent ports and adapters style test, you need to overlap tests to replicate the coverage. For example, lets assume we need to verify the following;

> "when a asks for their portfolio value, today's stock price is retrieved from Yahoo, multiplied by the number of stocks the client owns and the total is displayed in the UI"

There's essentially three components here, the UI, the business logic components (the "domain model") and an external Yahoo stock price service. The traditional view might interact with these like this.

![](images/part2/alternatives.md/typical-acceptance-test.png)

We don't need to interact with all of these at once to verify the statement above. Instead, we can verify the following in separate tests with overlapping concerns.

 1. When we ask for the portfolio value in the UI, a specific message is sent to the domain model.

	The response from the domain model updates a specific field on the UI appropriately

    We can test the UI independently by using a test double for the domain model; a stub or mock that we use in place of a real component. The test double is represented as a shaded circle below.

	![](images/part2/alternatives.md/ports-and-adapters-1.png)


 1. When the domain model receives a message from the UI, it calls out to a market data service (for stock prices).

	The response from the market data service is returned to the client in the agreed message format.

    Again, we can test the domain model without the real market data service using a test double.

	![](images/part2/alternatives.md/ports-and-adapters-2.png)

 1. An integration test is also needed to verify that the domain model's message makes the correct call to a real Yahoo service, verifying that the previous test is actually representative.

These verifications overlap each other to verify the overall behaviour in a series of steps rather than in one big go. Putting it all together it would look like the following. The dashed lines show how tests need to overlap to provide completeness. Shaded circles are fake components, unfilled circles are real components or services.

![](images/part2/alternatives.md/ports-and-adapters-combined.png)

This is a slightly simplified description, for an expanded example, see the [How testing can influence design](#design) section.



## Don't specify

We've talked about specifying upfront but defining a specification upfront, albeit incrementally, is still a form of upfront design and has an inherent cost associated with it. It's an improvement over traditional waterfall "big upfront design" but it may be that you're able to eliminate it all together.

If you can deliver features quickly enough and cheaply enough, you can agree behaviour with the customer against the deployed, live features. To do this effectively, it makes sense to have very small requirements or stories and to be talking to the business constantly. You should expect to deploy several iterations of a feature before getting it right and so it may not be appropriate for all businesses. Google practice these ideas by deploying experimental features to a subset of their environment to gather feedback.

It's a difficult technique to pull off though as it presupposes that the stories have demonstrable value and can be small enough to deliver cheaply. In some domains it may just not be possible to deliver "work in progress" if it isn't technically correct. Finance applications for example may not be able to tolerate imprecise calculations. Domains may also be constrained by regulatory requirements.


## Measure, don't agree

Arguably the most important success criterion is whether a feature directly affects your revenue. If a deployed feature is making or saving you money, it's a success. You may get additional feedback by deploying often to a live environment. If you can move away from agreeing acceptance criteria and defining acceptance tests upfront towards understanding how features affect key business metrics, you can start to measure these and use them to course correct.

William Deming popularised the ideas of solving problems using a critical thinking framework based on Walter Shewhart's work on statistical process control at Bell Labs in the 1930's. The Shewhart Cycle, later known as the Plan Do Check Adjust (or Act) Cycle emphasises continuous improvement based on careful planning, execution, reflection and adjustments. If you can gather meaningful statistics about deployed features, you can start to apply Deming's principles and act (or adjust) based on the measurements. The aim is to take speculation out of it and make genuinely informed decisions.


![Identifying business metrics inputs directly into the check step of Deming's PDCA cycle](images/part2/alternatives.md/pdca.png)

A trivial example might be to gather information about how much a partially complete feature is actually being used. If there's no uptake after a few days in production, you'll have more information to go on when deciding to continue work on the feature. Taking it further, if you then realise the partial feature is actually costing more money that it's generating, you might make the call to drop it.

In short, start measuring meaningful indicators and show the business. Rather than agree with the business what _might_ be valuable upfront, prove to them what _is_ valuable against production.



## Log, don't specify

As described in [Part 1](#part1), when agreeing acceptance criteria, stakeholders get together to agree the specification and then development gets underway. When done, everyone gets together and confirms that the tests verify the criteria.

Using traditional specification frameworks like Concordion or FIT, HTML "specifications" document important events, inputs and outputs of a test. The HTML is then instrumented and run with the framework to produce styled HTML artifacts indicating success or failure. These are the kind of artifacts you can share with business to verify requirements and document system behaviour. There's usually a setup cost in authoring then instrumenting these artifacts.

You can flip this on its head if you skip the specification step and instrument your test code directly to document behaviour as it executes. Matt Savage coined the phrase "log, don't specify" to capture the idea of writing acceptance tests in such a way as to capture and communicate key events during a test but without specifying an upfront "specification". The idea is to use a more lightweight approach when the upfront formalisation of acceptance criteria becomes too onerous.

The [Yatspec](http://code.google.com/p/yatspec/) framework does this for the Java community. It logs events in HTML as they happen based on conventions and constraints to the way you write your tests. This has a cost in itself as the natural language structure it requires may not come easily for all test problems. The theory though is that this instrumentation cost is lower than, for example, Concordion's upfront costs. That's something you'll have to judge for yourself however.



![Example of Yatspec output documenting system behaviour. The test code logs runtime behaviour](images/part2/alternatives.md/yatspec-example.png)


