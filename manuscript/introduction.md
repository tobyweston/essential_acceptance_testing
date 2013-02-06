# Introduction


## What's an Acceptance Test?

Before we start, we should probably agree on some common definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what _is_ an acceptance test?

> An acceptance test is a set of _executable_ criteria, examples or specification that help the customer "accept" that the system behaves as they intend it to.

So, as a customer, what would help me "accept" a system works as I expect? I imagine I'd want to _see_ something. Some output to verify the behaviour of a running system. This could be a demo or something automated and repeatable. The important points are that I've recorded my criteria for acceptance and these can be verified against a running system.

Documenting the runtime behaviour of a system is only half the story though. The other half is deciding what that behaviour should be. Getting input from interested parties _before_ building out a component is vital in ensuring we build the _right_ component. Turns out that acceptance tests are a great vehicle for discussing amd formalising these requirements.

Traditional definitions emphasize that acceptance tests should be customer authored. I tend to agree with this. If we write software that nobody wants, there's not much point in writing it. The customer can express their requirements in the form of acceptance criteria, a specification against which the system can be validated. Adding to our definition then would give us something like.

>  An acceptance test is a set of _executable_ criteria, examples or specification that help the customer "accept" that the system behaves as they intend it to. The test can be used to specify required behaviour _before_ implementing functionality and then validate the behaviour against the completed implementation.


## Acceptance Criteria vs Acceptance Tests

We'll often use the terms acceptance criteria and acceptance test interchangeably but I tend to think about them as distinct.

Acceptance criteria are the set of criteria that, when verified against a running system, give confidence to the customer that the system behaves as expected. They represent the requirements or specification for a small set of functionality and are written in such a way as to be quantifiable. They're typically defined when doing the analysis for a story and are typically concerned with the business functionality. The implication here is that the business are best placed to define the first set of criteria.

Defining the criteria is a useful step in understanding a story. It helps us define the scope of the feature so developers know when to stop. Importantly, it also helps the team to drive out a shared understanding of the story. Criteria should be implementation agnostic and written at a fairly high level. You'd then _implement_ the criteria in terms of one or more acceptance tests. A single criteria (for example, "the total basket value is displayed correctly") may require multiple examples to be provable (for example, what exactly does "correct" mean here?). That's where the implementation as executable acceptance _tests_ comes in.

An acceptance test is the physical test artifact to be executed. It may be a test-test[^test-test], a test script that requires a human to step through, a record-replay style UI test or even a checklist on a scrap of paper. The acceptance test can be seen as the confirmation step in Ron Jefferies' [Three Cs of a user story](http://xprogramming.com/articles/expcardconversationconfirmation/).

[^test-test]: any test written in the language of choice, typically using a unit testing framework or similar. It could be a Java test to run in JUnit, a piece of JavaScript to run with Jasmine, Ruby and RSpec, C# and NUnit or just a main method. Calling them _unit_ tests would be clumsy but you'd get the idea.

Acceptance criteria _become_ exception tests. Attributes that describe acceptance tests also describe acceptance criteria with the additional fact that tests should be _executable_.

{title="Attributes of acceptance criteria and tests"}
| Acceptance Criteria           | Acceptance Tests              |
|-------------------------------|-------------------------------|
|Document behaviour             |Document behaviour             |
|Are specific                   |Are specific                   |
|Are demonstrable and provable  |Are demonstrable and provable  |
|Require discussion             |Require discussion             |
|Are agreed                     |Are agreed                     |
|                               |Are executable                 |


D>## Starting up the full stack {#starting-the-full-stack-aside}
D>
D> Many teams fall into the trap of thinking they need to start up the full stack in order to run an acceptance test. Apart from being expensive to say, start a web server and initialise the system, starting up the full stack doesn't automatically mean the test that runs will be an _acceptance test_. It just means it's running against a fully started system.
D>
D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [Port and Adapters](#ports-and-adapters) section.

## What's a story?

Acceptance criteria are usually discussed in terms of _user stories_ so it may be worth while making sure we have a common understanding of what makes up a story. A typical agile process will focus on stories as a way of gathering requirements and organising them into deliverable chunks that, again, have _business value_. It's common then to associate acceptance tests with individual stories. Once the test is passing, we can infer that the story is finished. There's a close relationship between stories and acceptance testing.

Mike Cohen [describes user stories](http://www.mountaingoatsoftware.com/topics/user-stories) as

> "User stories are short, simple description of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system."

He goes on to describe the typical template as something like

> As a <type of user>, I want <some goal> so that <some reason>

This is pretty much the accepted definition of a user story but I don't think it's the full story. In practice, teams settle on their own style of writing stories loosely based on this definition. Some teams write stories on index cards, others write tasks or work items on post-its whilst others write up the background analysis in JIRA. Each team may use these to work out what to deliver and each may think of these as "stories". But to adhere to the spirit of the definition, a link to acceptance criteria needs to be established.

D> ## Tasks vs stories {#tasks-vs-stories-aside}
D>
D> It's easy to get confused with the difference between tasks and stories. It's useful to capture discrete tasks, things like "pay the suppliers" or "talk to Bob in Commodities about their new API", but if these don't satisfy the "implementation _implies_ business value" proposition, chances are they're not stories.
D>
D> The team lead role can suffer from this a lot but keeping track of todo items needn't muddy the waters when it comes to planning the story delivery of the team. It's important to realise that tasks or todo items fit more appropriately under project or team management and not story planning. That way, it's easier to pick the right tool to manage them. David Allen's [Getting Things Done](http://amzn.to/YwwTSX) is a great way to manage your todo pile.

Why is this discussion important? How we interpret the definition of user stories has a knock on affect on how we choose to implement an acceptance testing strategy. If the story definition is vague and sprawling, it's difficult to be define concise acceptance criteria. Without clear acceptance criteria, it's difficult to be clear about what we're supposed to develop. Without understanding what we're supposed to build, it's difficult to know when we've actually built it.

Sticking to the letter of the definition above can lead to ambiguous requirements. We need to work a little harder. The spirit of the definition should encourage us to think about requirements from the customer's perspective, clearly articulate the goal and solidify _why_ it's important (the _so that_ clause). Articulating the goal will likely take more that a single sentence on an index card. That's where defining acceptance criteria comes in.

Working from story definition through defining acceptance criteria to delivery is something David Peterson calls the [Story Delivery Life Cycle](#story-delivery-life-cycle) and we'll look at that in the [process overview](#process-overview) section.

D>## A new acceptance test per story? {#a-new-acceptance-test-per-story-aside}
D>
D> Another pitfall teams often fall into is to automatically create new acceptance tests for a new story. This may be a reasonable choice to start with but can quickly lead to hundreds and hundreds of acceptance tests, many of which may duplicate parts of others. It's a far more scalable strategy to look for existing acceptance tests that exercise related areas and augment them. Obviously there is balance to be had and it makes sense to organise your tests so that you can quickly understand which stories they exercise (some suggestions are offered later).

It's totally acceptable for a single acceptance test to demonstrate multiple stories. Acceptance tests should be revisited and leveraged when new stories are defined. When it comes to acceptance testing, duplicated test paths often lead to slower test runs. Designing your system and test infrastructure to be componentised can also help with speed.  We'll look at this more in the [Port and Adapters](#ports-and-adapters) section.



## Confidence and Trust

Showing the customer running code builds trust. When you can associate running code to individual customer stories during an iteration, it gives confidence that the team can deliver and deliver the right thing. If we keep talking to the business whilst developing the acceptance criteria, we stand a better change of discovering misunderstanding early and reduce the risk of critical failure.

This confidence and trust doesn't come easy. Teams may have to talk at length about how a test actually proves a feature is working correctly. The customer may also want to refer back to passing tests, perhaps against a specific feature.

Running your tests as part of your automated build and structuring the output in line with stories or iterations can help here. It also forms a kind of 'live' system documentation. All the major specification testing frameworks offer strategies for achieving this and we'll talk specifically about Concordion in [Part 3](#part3).

D>## Technical vs business language {#technical-vs-business-language-aside}
D>
D> It's a really good idea to aim for a ubiquitous language between development and the business. It helps make sure that when someone is talking about the noun _instrument_, the team have a collective understanding of what an instrument actually is (is it a violin or an equity derivative?). When it comes to setting acceptance criteria, the language should favour the business camp. Write in terms of _business goals_ and not _test scripts_.
D>
D> The business shouldn't care how a test is implemented behind the scenes. It should be shown to go green in the language _they_ understand. It may be that whilst building trust, developers have to explain what components are being exercised or even show data in it's raw form but ultimately, the code is none of the business's concern. I see far too many teams fall into this trap whereby the business try to influence test infrastructure or how to go about testing some feature. This is always down to trust. Work hard at building trust and avoid frustration.


## Further reading

 * [User Stories Applied: For Agile Software Development](http://amzn.to/WLmrVy), Mike Cohn
 * [Succeeding with Agile: Software Development Using Scrum](http://amzn.to/11jVsrz), Mike Cohn
 * [Bridging the Communication Gap](http://amzn.to/14A3Cds), Gojko Adzic
 * [Specification by Example: How Successful Teams Deliver the Right Software](http://amzn.to/YOPrlo), Gojko Adzic
 * [ATDD by Example: A Practical Guide to Acceptance Test-driven Development](http://amzn.to/Yxr8V4), Markus Gartner
