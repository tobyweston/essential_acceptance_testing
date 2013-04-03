# Introduction {#introduction}


## What's an acceptance test?

Before we start, we should agree on some working definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what is an acceptance test?

> An acceptance test is a set of _executable_ criteria, examples or a specification that help the customer "accept" that the system behaves as intended.

What would help a customer "accept" a system works as intended? The customer gains confidence if they're able to define requirements and see how varying inputs affect the behaviour of a running system. For example, they may document, test against running code, watch a manual demo or explore an automated test. The important point here is that the customer's criteria for acceptance are recorded and verified against a running system.

Recording the runtime behaviour of a system after the fact is only half the story. Deciding _what_ that behaviour should be before starting work is the tricky part. Getting input from customers _before_ building out the system is useful in ensuring we build the _right_ system. Acceptance tests are a great vehicle for discussing and formalising these requirements.

Many teams emphasize that acceptance tests should be customer authored. If we write software that nobody wants, there's not much point in writing it. The customer can express their requirements in the form of acceptance criteria forming a specification against which the system can be verified. Adding to our definition then would give us something like.

>  An acceptance test is a set of _executable_ criteria, examples or a specification that help the customer "accept" that the system behaves as intended. The test is used to specify required behaviour _before_ implementing functionality and then verify the behaviour against the completed implementation.

In [Agile Testing](http://amzn.to/WKDYkq), Lisa Crispin and Janet Gregory describe acceptance tests as

> "Tests that define the business value each story must deliver. They may verify functional requirements or nonfunctional requirements such as performance or reliability ... Acceptance test is a broad term that may include both business facing and technology facing tests."

An important addendum to our definition then should be that acceptance tests don't have to be about just business behaviour, they can also be about broader system qualities such as non-functional requirements and usability. It's still about customer confidence.

Unfortunately, Cripin's definition talks specifically about _stories_ and business _value_. I say unfortunate because acceptance tests may or may not have anything to do with user stories. We'll talk about stories later but in our definition, we're talking generally about system behaviour and brushing over the idea that stories could describe that behaviour. A story isn't necessarily a prerequisite for an acceptance test. Similarly, _business value_ is a tricky thing to quantify so measuring it in a test can be a challenge. We'll talk more about that later too.



## What are acceptance criteria?

We'll often use the terms acceptance criteria and acceptance test interchangeably but I think about them as distinct.

Acceptance criteria are the set of criteria that, when verified against a running system, give confidence to the customer that the system behaves as expected. They represent the requirements or specification for a small set of functionality and are written in such a way as to be quantifiable. They're typically defined when doing analysis and are mostly concerned with the business functionality. Therefore, the customer is mostly best placed to define the criteria. I'm saying "mostly" because non-functional requirements, despite affecting the customer, are usually championed by technical stakeholders.

Defining the criteria is a useful step in understanding what's required. It helps us define the scope of the feature so developers know when to stop. Importantly, it also helps the team to drive out a shared understanding. Criteria should be implementation agnostic and written at a fairly high level. We then _implement_ the criteria in terms of one or more acceptance tests. A single criterion (for example, "the total basket value is displayed correctly") may require multiple examples to be comprehensive (for example, what _exactly_ does it mean to "display correctly" in our example?). That's where implementing the acceptance _criteria_ as executable acceptance _tests_ comes in.

Remembering our definition, we're emphasising that tests are executable and criteria are not. An acceptance test is a physical test artifact. It may be a xUnit test written in the language of choice, a test script that requires a human to step through, a record-replay style UI test or even a checklist on a scrap of paper.

Acceptance criteria _become_ acceptance tests. Attributes that describe acceptance tests also describe acceptance criteria with the additional fact that tests should be _executable_. Executing acceptance tests verify that the acceptance criteria have been met.

{title="Attributes of acceptance criteria and tests"}
| Acceptance Criteria           | Acceptance Tests              |
|-------------------------------|-------------------------------|
|Document behaviour             |Document behaviour             |
|Are specific                   |Are specific                   |
|Are demonstrable and provable  |Are demonstrable and provable  |
|Require discussion             |Require discussion             |
|Are agreed                     |Are agreed                     |
|                               |**Are executable**             |




## What's a story?

Acceptance criteria are usually discussed in terms of _user stories_ so it's worth while making sure we have a common understanding of what makes up a story. Agile processes often focus on stories as a way of gathering requirements and organising them into deliverable chunks that have _business value_. It's common to associate acceptance tests with individual stories. Once the test is passing, the story is considered finished. There's a close relationship between stories and acceptance testing.

Mike Cohen [describes user stories](http://www.mountaingoatsoftware.com/topics/user-stories) as follows.

> "User stories are short, simple description of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system."

He goes on to describe the typical template as something like

> As a <type of user>, I want <some goal> so that <some reason>

This is the generally accepted definition of a user story. In practice however, teams tend to settle on their own style of writing stories loosely based on this definition. Sometimes a short description is not enough. Some teams stick to the template whilst others expand it to write requirements out long hand. Some teams abandon it completely and just write abbreviated notes.

Whatever the choice, each team will likely think of these as "stories" but it can be tricky to agree on exactly what is and what isn't a story. Stories should be short enough to be achievable but still provide some level of business "value". Stories help set the rhythm of development (see [later](#lack-of-structure-and-direction) and help orientate the team. However, it's easy to get confused by the difference between tasks and stories. It is useful to capture discrete tasks, things like "pay the suppliers" or "talk to Bob in Commodities about their new API", but if these don't add business "value", chances are they're not really stories.

The reason this matters is because "business value" is supposed to enable the opportunity for profit. If we're not clear about the definition of the term story, it's easy to create and focus development on tasks which don't add value and so don't contribute towards profit. You can think of the idea of "business value" as simply "cash" or "profit". That way, you can ask yourself "would this story contribute to the bottom line?". To get the most out of the whole thing, a link from story to acceptance criteria needs to be established. That way, you can demonstrate when "value" has been added to the system and expand on the stories acceptance criteria.

To capture and track progress, some teams write stories on index cards, others write tasks or work items on post-its. Others still write up analysis in their issue tracking software or wiki.

D> ## Team lead beware! {#team-lead-beware-aside}
D>
D> It's easy to get confused with the difference between tasks and stories. The team lead role can suffer from this especially but keeping track of todo items needn't muddy the waters when it comes to planning story delivery. It's important to realise that tasks or todo items fit more appropriately under project or team management activities and not story planning. That way, it's easier to pick the right tool to manage them.
D>
D> David Allen's [Getting Things Done](http://amzn.to/YwwTSX) is a great way to manage your todo pile.



## Bringing it all together

Why is this discussion important? How we interpret the definition of user stories has a knock on affect on how we choose to implement an acceptance testing strategy. If the story definition is vague and sprawling, it's difficult to define concise acceptance criteria. Without clear acceptance criteria, it's difficult to be clear about what we're supposed to develop. Without understanding what we're supposed to develop, it's difficult to know when we've actually built it.

Sticking to the letter of Cohen's definition above can lead to ambiguous requirements. We need to work a little harder. The definition should encourage us to think about requirements from the customer's perspective, clearly articulate the goal and solidify _why_ it's important (the _so that_ clause). It's important to recognise that it's not a literal mantra. Articulating the goal will likely take more than a single sentence on an index card and that's where defining acceptance criteria comes in.

Working from story definition through defining acceptance criteria to delivery is something [David Peterson](http://blog.davidpeterson.co.uk) calls the [Story delivery lifecycle](#story-delivery-life-cycle). It underpins common agile processes and we'll take a look at it in the [Process overview](#process-overview) section.




## Confidence and trust

Showing the customer running code builds trust. When you can associate running code to individual customer stories during an iteration, it gives confidence that the team can deliver and deliver the right thing. If we keep talking to the business whilst developing the acceptance criteria, we stand a better chance of discovering misunderstanding early and reduce the risk of critical failure.

This confidence and trust doesn't come easy. Teams may have to talk at length about how a test actually proves a feature is working correctly. The customer may also want to refer back to passing tests, perhaps to cross-reference a specific feature.

Running your tests as part of your automated build and structuring the output in line with stories or iterations can help. It also forms a kind of 'live' system documentation. The majority of specification testing frameworks offer strategies for achieving this and we'll talk specifically about [Concordion](http://concordion.org) in [Part 3](#part3).

D>## Technical vs business language {#technical-vs-business-language-aside}
D>
D> It's a really good idea to aim for a ubiquitous language between development and the business. It helps make sure that when someone is talking about something, the whole team have a collective understanding of what that _thing_ is. As a silly example, is an "instrument" a violin or an equity derivative from the finance industry?
D>
D> When it comes to setting acceptance criteria, the language should favour the business camp. Write in terms of _business goals_ and not _test scripts_. The business shouldn't care how a test is implemented behind the scenes. It should be shown to go green in the language _they_ understand.
D>
D> It may be that whilst building trust, developers have to explain what components are being exercised or even show data in it's raw form but ultimately, the code is none of the business's concern. I see far too many teams fall into the trap where the business try to influence test infrastructure or how to go about testing some feature. This is always down to trust. Work hard at building trust and avoid the frustration.


## Further reading

 * [User Stories Applied: For Agile Software Development](http://amzn.to/WLmrVy), Mike Cohn
 * [Succeeding with Agile: Software Development Using Scrum](http://amzn.to/11jVsrz), Mike Cohn
 * [Bridging the Communication Gap](http://amzn.to/14A3Cds), Gojko Adzic
 * [Specification by Example: How Successful Teams Deliver the Right Software](http://amzn.to/YOPrlo), Gojko Adzic
 * [ATDD by Example: A Practical Guide to Acceptance Test-driven Development](http://amzn.to/Yxr8V4), Markus Gartner
