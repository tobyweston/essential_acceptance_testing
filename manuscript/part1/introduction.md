# Introduction {#introduction}


## What is an acceptance test?

Before we start, we should agree on some working definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what is an acceptance test?

> An acceptance test is a set of examples or a specification that helps the customer "accept" that a system behaves as intended.

What would help a customer "accept" a system works as intended? The customer gains confidence if they're able to define requirements and see those requirements manifest as behaviour in a running system. For example, the customer might define their expectations and verify these against running code in a demo. The important point here is that the customer's criteria for acceptance are recorded and verified against a running system.

Recording the runtime behaviour of a system after the fact is only half the story. Deciding _what_ that behaviour should be before starting work is the tricky part. Getting input from customers before building out the system is useful in ensuring we build the _right_ system. Acceptance tests are a great vehicle for discussing and formalising these requirements.

>  An acceptance test is a set of examples or a specification that helps the customer "accept" that a system behaves as intended. The test is used to specify required behaviour and to verify that behaviour against a running system.

Many teams emphasize that acceptance tests should be customer authored. If we write software that nobody wants, there's not much point in writing it. The customer can express their requirements in the form of acceptance criteria; a specification against which the system can be verified.

In [Agile Testing](http://amzn.to/WKDYkq), Lisa Crispin and Janet Gregory describe acceptance tests as

> "Tests that define the business value each story must deliver. They may verify functional requirements or nonfunctional requirements such as performance or reliability ... Acceptance test is a broad term that may include both business facing and technology facing tests."

An important addendum to our definition then should be that acceptance tests don't have to be about just business behaviour, they can also be about broader system qualities such as non-functional requirements and usability. It's still about customer confidence.

Unfortunately, Cripin's definition talks specifically about _stories_ and business _value_. I say unfortunate because acceptance tests may or may not have anything to do with user stories. We'll talk about stories later but in our definition, we're talking generally about system behaviour and brushing over the idea that stories can describe that behaviour. A story isn't necessarily a prerequisite for an acceptance test. Similarly, business _value_ is a tricky thing to quantify, so measuring it in a test can be a challenge. We'll talk more about that [later too](#business-value).

Applying the addendum to our definition gives the following.

>  An acceptance test is a set of examples or a specification that helps the customer "accept" that a system behaves as intended. The test is used to specify required behaviour and to verify that behaviour against a running system. Acceptance tests are not limited to confirming business behaviour but can also verify that broader, non-functional objectives have been met.



## What are acceptance criteria?

We'll often use the terms acceptance criteria and acceptance test interchangeably but really they're distinct.

Acceptance criteria are the set of criteria that, when verified against a running system, give confidence to the customer that the system behaves as intended. They represent the requirements or specification for a small set of functionality and are written in such a way as to be quantifiable. They're typically defined when doing analysis and since they're mostly concerned with business requirements, the customer is best placed to define them. Non-functional requirements, despite affecting the customer, usually end up being championed by technical stakeholders.

Defining the criteria is a useful step in really understanding what's required. It helps us define the scope of a feature so developers know when to stop. Importantly, it also helps the team to drive out a shared understanding of the requirements. Criteria should be implementation independent and written at a high level. We then _implement_ the criteria in terms of one or more acceptance tests.

A single criterion ("the total basket value is displayed correctly") may require multiple examples to be comprehensive (what _exactly_ does it mean to "display correctly"?). That's where implementing the acceptance _criteria_ as executable acceptance _tests_ comes in.

Referring back to our definition, we're emphasising that tests are executable and criteria are not. An acceptance test is a physical test artifact. It may be a xUnit test written in the language of choice, a test script that requires a human to step through, a record-replay style UI test or even a checklist on a scrap of paper.

Adding this dimension to our definition gives us the following.

>  An acceptance test is a set of _executable_ criteria that helps the customer "accept" that a system behaves as intended. The test is used to specify required behaviour and to verify that behaviour against a running system. Acceptance tests are not limited to confirming business behaviour but can also verify that broader, non-functional objectives have been met.


Acceptance criteria _become_ acceptance tests. Attributes that describe acceptance tests also describe acceptance criteria with the additional fact that tests should be _executable_. Executing acceptance tests verify that the acceptance criteria have been met.

{title="Attributes of acceptance criteria and tests"}
| Acceptance Criteria           | Acceptance Tests              |
|-------------------------------|-------------------------------|
|Document behaviour             |Document behaviour             |
|Are specific                   |Are specific                   |
|Are illustrative               |Are illustrative               |
|Are quantitative               |Are quantitative               |
|Require discussion             |Require discussion             |
|Are agreed                     |Are agreed                     |
|                               |**Are executable**             |




## What is a story?

Acceptance criteria are usually discussed in terms of _user stories_ so it's worth while making sure we have a common understanding of what makes up a story. Agile processes often focus on stories as a way of gathering requirements and organising them into deliverable chunks that have _business value_. In [Planning Extreme Programming](http://amzn.to/14EflKC), Kent Beck and Martin Fowler describe a user story as "a chunk of functionality that is of value to the customer". It's common to associate acceptance tests with stories. Once the tests are passing, a story is considered finished. There's a close relationship between stories and acceptance testing.

Mike Cohen [describes user stories](http://www.mountaingoatsoftware.com/topics/user-stories) as follows.

> "User stories are short, simple description[s] of a feature told from the perspective of the person who desires the new capability, usually a user or customer of the system."

He goes on to describe the typical template developed by Connextra

> As a <type of user>, I want <some goal> so that <some reason>

Cohen's description is the generally accepted definition of a user story and is so commonly discussed in terms of the Connextra structure that the two have become almost synonymous. In practice however, teams tend to settle on their own style of writing stories loosely based on the combination. Sometimes a short description is not enough. Some teams stick to the template whilst others expand it to write requirements out long hand. Some teams abandon it completely and just write abbreviated notes.

Settling on the appropriate scope for a story is also something teams can struggle with. Stories should be short enough to be achievable but still provide some level of business value. Stories help set the [rhythm of development](#lack-of-structure-and-direction) and help orientate the team. However, it's easy to get confused by the difference between tasks and stories. It is useful to capture discrete tasks, things like "pay the suppliers" or "talk to Bob in Commodities about their new API", but if these don't add business value, chances are they're not really stories.

The reason this matters is because "business value" is supposed to enable an opportunity for profit. If we're not clear about the definition of the term story, it's easy to create and focus development on tasks which don't add value and so don't contribute towards profit. You can think of the idea of "business value" as simply "cash" or "profit". That way, you can ask yourself "would this story contribute to the bottom line?". To get the most out of acceptance testing, a link from story to acceptance criteria needs to be established. That way, you can demonstrate when real value has been added to the system and elaborate on the details of exactly how.

To capture and track progress, some teams write stories on index cards, others write tasks or work items on post-its. Others still write up analysis in their issue tracking software or wiki.

A> ## Tasks vs stories {#tasks-vs-stories-aside}
A>
A> It's easy to get confused with the difference between tasks and stories. The team lead role can suffer from this especially but keeping track of todo items needn't muddy the waters when it comes to planning story delivery.
A>
A> It's important to realise that tasks or todo items fit more appropriately under project or team management activities and not story planning. That way, it's easier to pick the right tool to manage them. David Allen's [Getting Things Done](http://amzn.to/YwwTSX) is a great way to manage your todo pile.



## Bringing it all together

Why is this discussion important? How we interpret the definition of user stories has a knock on effect on how we choose to implement our acceptance testing approach. Sticking to the letter of Cohen's story definition above can lead to ambiguous requirements. We need to think a little harder. His definition should encourage us to think about requirements from the customer's perspective, clearly articulate the goal and solidify _why_ it's important (the _so that_ clause).

It's also important to recognise that the Connextra template is not a literal mantra. Articulating the goal will likely take more than a single sentence on an index card. That's where defining unambiguous acceptance criteria comes in.

If the story definition is vague, it's difficult to define concise acceptance criteria. Without clear acceptance criteria, it's difficult to be confident about what we're supposed to develop. Without understanding what we're supposed to develop, it's difficult to know when we've actually built it.

Working from story definition through defining acceptance criteria to delivery is something [David Peterson](http://blog.davidpeterson.co.uk) calls the [Story delivery lifecycle](#story-delivery-life-cycle). It brings together the ideas of stories, acceptance criteria and tests with a framework for iterative development that underpins common agile processes. We'll take a closer look at it next.


