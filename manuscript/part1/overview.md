# Typical Process Overview {#process-overview}

W> ## This section is not yet finished
W>
W> This section is not yet finished. It's a work in progress, a lean publishing effort. I try not to publish anything that's too sketchy but bear with me.
W>
W> Help set the direction, get involved and make suggestions via the [Leanpub page](https://leanpub.com/essential_acceptance_testing).
W>

## The story delivery life cycle {#story-delivery-life-cycle}

A typical agile process used by many teams today revolves around the following steps.

| Story definition life cycle  |
|------------------------------|
|1. Pick a story               |
|1. Agree acceptance criteria  |
|1. Develop functionality      |
|1. Demonstrate and sign off   |
|1. Repeat                     |
|

![The story definition life cycle](images/story_lifecycle.png)

## Pick a story

Picking the next story to play should just be about taking the next highest priority story from the list of options. Creating the option list or backlog is a little more interesting. Ideally, there should be ongoing work to identify concepts that, if realised, would help achieve business goals. In the corporate environment, this is typically business analysts working out candidate features for a given project.

It would typically fall to iteration planning of a Scrum-like process to move a set of stories from the backlog to the planned iteration. The team would then attempt to deliver these stories. In a Kanban-like process, the backlog becomes the pool of candidate stories to draw from at any given time. They create the input queue for development activities (such as agree acceptance criteria). In both cases, it helps if when picking up a story to work on, there is a good understanding of the business objective it realises. In other words, what's the _real value_ this story would deliver.

The next step is to nail this down as acceptance criteria.

D> ## What's a Story? {#whats-a-story-aside}
D>
D> There is often some debate about the definition of a story. For the purpose of this discussion, lets assume that a story is just a way to decompose the requirements into achievable chunks that, if implemented, would add _business value_.
D>
D> It's common to physically write the story description on an index card. Teams might then use this as a token on the team's project board to visualise it's task management, moving from left to right to indicate progress.


## Agree acceptance criteria

A> ## Inputs and outputs {#agree-acceptance-criteria-inputs-outputs-aside}
A> **Inputs:**
A>
A> - Story
A> - Additional communication
A>
A> **Outputs:**
A>
A> - List of examples and scenarios with expectations (the acceptance criteria)
A> - Agreement from everyone that these demonstrate desired functionality
A> - Additional documentation or context in whatever form is appropriate
A>
A> **Avoid:**
A>
A> - Implementation details


It may be that the story you pick up lacks sufficient detail to answer the question "how do we know it's done?". To figure this out, you'd typically formalise the acceptance criteria. Capture examples scenarios, edge cases and outcomes. The idea here is to describe the requirements not in terms of a series of instructions to follow (a traditional test script) but as an english description of the business goals.

When you describe the high level business scenarios like this, you'll implicitly create a specification accessible to business and technical staff. You're not concerned with the details of how things will be implemented. It's a chance to focus on the business intent and make sure everyone involved understands what's required, the terminology and the business context.

This is best done with the business or customer. Get together and make sure everyone has a common understanding of what's needed. Expect lots of discussion about the specifics and come up with concrete examples and scenarios. What questions, if answered, will convince the customer that the system is behaving as they specified?

D> ## Do we need a meeting to agree acceptance criteria?
D>
D> You don't need a meeting to define acceptance criteria, in fact, its great if you can keep discussing and clarifying them as you need to. You may find it useful however, to have a kick-off meeting where you can discuss a story's background, context and goals.
D>
D> Note that I'm not talking about an _iteration planning_ meeting here, more like a story definition meeting. The difference is that we're not trying to _plan_ which stories are being played in an iteration. Instead we want to work up the teams understanding of a story. To be most efficient, some analysis work should have already been undertaken.

Once you've written the criteria down, the next step is to formally agree them with interested parties. We'll brush over how best to physically record the criteria but we'd aim to have them in a format that will help us later when we come to convert them into executable tests. For arguments sake, you might record these on a Wiki, HTML pages associated with the project source or just on the back of the story card. The point is though that after this step, everyone involved has agreed that the list of criteria is a reasonable effort at documenting the intent.

Remember that all this is done before writing any production code.

A> ## Define acceptance criteria check list {#define-acceptance-criteria-check-list-aside}
A> - Business analysis has been undertaken
A> - Developers understand the business background, context and goals for a story
A> - There is no ambiguity about business terms and everyone agrees on their definition
A> - Acceptance criteria have been discussed and documented
A> - Agreement from everyone on acceptance criteria

D> ## Stickers as sign-off {#stickers-as-sign-off-aside}
D>
D> A great technique to visualise progress of a story is to use stickers to represent agreement or sign-off at the various stages. For example, when a business analyst agrees to the acceptance criteria, a story's index card might get a green sticker. When a testers agrees, a blue sticker and when developers agree, a yellow one. You can have as many stickers as you like or use columns on your board.
D>
D> The whole purpose of the define, agree, develop, demo cycle is to spot problems early and adjust. In that spirit, it makes sense to prevent progress to the next step until previous steps have be completed. For example, don't start development until you have the full set of stickers. If this causes delays and 'blocked' work, missing stickers can help highlight where the bottleneck lies.

D> ##Specification by example {#specification-by-example-aside}
D>
D> Specification by example is a way to describe your requirements using realistic examples. Rather than trying to express requirements through abstract statements, you'd typically describe the context in english and follow it with example scenarios which when executed would hold true for a system implementing the requirements correctly.
D>
D> Following the process outlined in this book would naturally lead to a degree of specification by example. Don't get hung up on the term, I see it as just a useful label for the way we might naturally express requirements. If it's useful to think up examples to get your point across, go for it.
D>
D> Balancing enough scenarios to cover functionality without repeating yourself is key. When done right, they should form a accessible record of how the system behaves. We'll look at some examples using Concordion in [Part 3](#part3)

![An example of acceptance criteria documented and ready for agreement](images/example_spec.png)



## Develop

As well as implementing the underlying features, the developers should be converting acceptance criteria into runnable tests during this phase. It may be that tests are written early in the development phase, before any real work has gone on where they'll fail until the story is completed. Or, it may be that the majority of development is undertaken before work on the acceptance test work starts.

Which approach you choose has interesting influences on developer testing. For example, if the coarse grained acceptance test is left until the end, there's more room to focus on unit tests and adopt a Test Driven Design (TDD) approach. TDD in this sense can be used as a _design aid_. When implementing the acceptance test, there's very little still left unknown. It's a bit like test-confirm where you back fill the details to get a green test.

When developer's start with failing acceptance tests, the focus shifts a little. Acceptance tests can be used to drive out coarse grained behaviour like unit tests drive out local design choices. The tests themselves may change more frequently with more discussion with the customer taking place. The emphasis is on requirements (the story) and in this sense, the tests become more of a _requirements aid_. This Acceptance Test Driven Design approach puts acceptance tests in the position that TDD puts unit tests; at the beginning.

There's an argument in claiming that unit tests may not even be needed with sufficient acceptance tests in place. The meaning of sufficient here is really down to the business. If it's unlikely that edge cases unit tests would have covered will actually materialise and if the cost of fixing these in production is low, then why test upfront? Especially, if this upfront cost affects the time to delivery aka time to pay day. To put the argument in the extreme, you could say that you're not really doing ATDD if you're still writing unit tests.

Which approach you choose is down to your own experience and team make up. Sometimes, the two approaches compliment each other, other times they get in each others way and duplicate effort. Judicious testing takes practice.



## Demonstrate

This step is about proving to customers that their requirements have been realised. It's about giving them confidence. You can do this in whatever way works best. A common approach is to run through a demo and go through the passing acceptance tests huddled around a desk.

![Acceptance criteria from above converted into a running acceptance test](images/example_spec_passing.png)


### A note on manual testing

If you're lucky, there's plenty of staff on hand willing to perform some exploratory testing. This doesn't have to wait until the end of an iteration, it can start as soon as a story is stable enough to test. Usually this would be when the story is finished and acceptance tests are passing. It's useful to have a stable deployment environment for this.

Acceptance testing doesn't negate the need for manual, exploratory style testing. Lisa Crispin calls this kind of testing critiquing the product. Some product critique can be achieved using acceptance testing whilst others require a more manual approach or specialist tools. We'll look more at this later when we talk about Brian Marick's testing matrix and Lisa Crispin's elaboration of it.

To some degree, acceptance test suites can cover the need for regression testing. That is to say that they can show that the specifications havn't changed over time.
