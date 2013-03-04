# Typical process overview {#process-overview}

## The story delivery lifecycle {#story-delivery-life-cycle}

A typical agile process used by many teams today revolves around the following steps (which [David Peterson](http://www.concordion.org/memo/StoryDeliveryLifecycle.pdf) refers to as the Story delivery lifecycle).

| Story delivery lifecycle     |
|-------------------------------|
| 1. Pick a story               |
| 2. Agree acceptance criteria  |
| 3. Develop functionality      |
| 4. Demonstrate and sign off   |
| 6. Repeat                     |


![The story delivery lifecycle](images/story-lifecycle.png)



## Pick a story

Picking the next story to play should be as simple as taking the next highest priority story from the list of options. Creating the option list or backlog is a little more interesting. Ideally, there should be ongoing work to identify concepts that, if realised, would help achieve business goals (cash). In the corporate environment, this is typically business analysts working out candidate features for a given project.

D> ## What's a Story? {#whats-a-story-aside}
D>
D> There is often some debate about the definition of the term "story". For the purpose of this discussion, lets assume that a story is just a way to decompose the requirements into achievable chunks that, if implemented, would add _business value_.
D>
D> It's common to physically write the story description on an index card. Teams might then use this as a token on the team's project board to visualise it's life, moving from left to right to indicate progress.

It would usually fall to the iteration planning of a Scrum-like process to move a set of stories from the backlog to the planned iteration. The team would then attempt to deliver these stories when starting the iteration. In a Kanban-like process, the backlog becomes the pool of candidate stories that are drawn from at any given time; it becomes the input queue for subsequent activities (such as agreeing acceptance criteria). In both cases, it helps if when picking up a story to work on, there is a good understanding of the business objective it realises. In other words, what's the _real value_ this story would deliver.

The next step is to nail this down as acceptance criteria.



## Agree acceptance criteria

A> ## Inputs and outputs {#agree-acceptance-criteria-inputs-outputs-aside}
A> **Inputs:**
A>
A> - Story
A> - Additional information and communication
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


It may be that the story you pick up lacks sufficient detail to answer the question "how do we know it's done?". To figure this out, you can formalise the acceptance criteria. Capture example scenarios, edge cases and outcomes. The idea here is to describe the requirements not in terms of a series of instructions to follow (a traditional test script) but as an english description of the business goals. When you can prove these have been met, you know the story is done.

When you describe the high level business scenarios like this, you implicitly create a specification accessible to business and technical staff. You're not concerned with the details of how things will be implemented. It's a chance to focus on the business intent and make sure everyone involved understands what's expected, the terminology and the business context.

This is best done with the business or customer. Get together and make sure everyone has a common understanding of what's needed. Expect lots of discussion about the specifics and come up with concrete examples and scenarios. What questions, if answered, will convince the customer that the system is behaving as they specified?

D> ## Do we need a meeting to agree acceptance criteria?
D>
D> No. You don't need a meeting to define acceptance criteria, in fact, its great if you can keep discussing and clarifying them as you need to. You may find it useful however, to have a kick-off meeting where you can discuss a story's background, context and goals.
D>
D> Note that I'm not talking about an _iteration planning_ meeting here, more like a story definition meeting. The difference is that we're not trying to _plan_ which stories are being played in an iteration. Instead we want to work up the teams understanding of a story. To be most efficient, some analysis work should have already been undertaken.

Once you've written the criteria down, the next step is to formally agree them with interested parties. We'll brush over how best to physically record the criteria but aim to have them in a format that will help you later when it comes to converting them into executable tests. For arguments sake, you might record these on a Wiki, HTML pages stored with the source code or just on the back of the story card. The point is that after this step, everyone involved has agreed that the list of criteria is a reasonable effort at documenting the intent. It's not set in stone but it captures the current understanding.

Remember that all this is done before writing any production code.

![An example of acceptance criteria documented and ready to be agreed. It's loaded with domain specific terminology that also should be agreed](images/example-spec.png)


A> ## Define acceptance criteria check list {#define-acceptance-criteria-check-list-aside}
A> Tick off these items as you go through the agree acceptance criteria phase.
A>
A> - Business analysis has been undertaken
A> - Developers understand the business background, context and goals for a story
A> - There is no ambiguity about business terms and everyone agrees on their definition
A> - Acceptance criteria have been discussed and documented
A> - Agreement has been reached on the acceptance criteria


## Develop

A> ## Inputs and outputs {#develop-inputs-outputs-aside}
A> **Inputs:**
A>
A> - Story and context
A> - Agreed acceptance criteria
A>
A> **Outputs:**
A>
A> - Implemented story functionality (deployable)
A> - Acceptance tests (converted from acceptance criteria)
A>
A> **Avoid:**
A>
A> - Implementing anything unrelated to the story


As well as implementing the underlying features, the developers should be converting acceptance criteria into runnable tests during this phase. It may be that tests are written early in the development phase, before any real work has gone on and they'll continue fail until the story is completed. Or, it may be that the majority of development is undertaken before work on implementing the acceptance tests start.

Which approach you choose has interesting influences on developer testing. For example, if the coarse grained acceptance test is left until the end, there's more scope to focus on unit tests and adopt a TDD approach. TDD in this sense can be used as a _design aid_. When it comes to implementing the acceptance test, there'll be very little left unknown. It can be a bit like test-confirm where you back fill the details to get a green test.

When developer's start with failing acceptance tests, the focus shifts a little. Acceptance tests can be used to drive out coarse grained behaviour like unit tests drive out local design choices. The tests themselves may change more frequently with more discussion with the customer taking place. The emphasis is on requirements (the story) and in this sense, the tests become more of a _requirements aid_. This ATDD approach puts acceptance tests in the position that TDD puts unit tests in; at the beginning.


D> ## Stickers as sign-off {#stickers-as-sign-off-aside}
D>
D> A great technique to visualise progress of a story is to use stickers to represent agreement or sign-off at the various stages. For example, when a business analyst agrees to the acceptance criteria, a story's index card might get a green sticker. When a testers agrees, a blue sticker and when developers agree, a yellow one. You can have as many stickers as you like or you could use columns on your board instead.
D>
D> The whole purpose of the define, agree, develop, demo cycle is to spot problems early and adjust. In that spirit, it makes sense to prevent progress to the next step until previous steps have be completed. For example, don't start development until you have the full set of stickers. If this causes delays and 'blocked' work, missing stickers can help highlight where the bottleneck lies.


There's an argument in claiming that unit tests may not even be needed with sufficient acceptance tests in place. The meaning of "sufficient" here is open for debate. If the edge cases that unit tests would have picked up are unlikely to materialise and if the cost of fixing these once in production is low, then why test upfront? Especially, if this upfront cost affects the time to delivery (time to pay day). To put the argument in the extreme, you could say that you're not really doing ATDD if you're still writing unit tests. Acceptance tests have monetary value, unit tests have design value.

Your team's experiences and preferences will influence which approach you choose. Sometimes, the two compliment each other, other times they get in each others way and duplicate effort. Judicious testing takes practice.



## Demonstrate

This step is about proving to customers that their requirements have been realised. It's about giving them confidence. You can do this in whatever way works best for your team. A common approach is to run through a manual demo and walk through the passing acceptance tests huddled around a desk or with a projector.

After the demo, if everyone agrees the implementation does what's expected, the story can be marked as done and you can go round the  cycle again with the next story. If everyone doesn't agree or if new issues come up, it's ok to go round the loop again with the same story. Agree, develop, demo and deliver.

You might choose to do this against a new story, related to the same area if you discover _incremental_ improvements that could be made. This is different from going round the delivery cycle again with the same story which would be more _iterative_. Think of it like incrementally adding value rather than iteratively delivering value. It's like tweaking an already selling product in order to sell more (incremental improvement) as apposed to tweaking a product enough that it will actually sell in the first place (iterating).

![Acceptance criteria from above converted into a running acceptance test; an example of something you might demo](images/example-spec-passing.png)


### A note on manual testing

If you're lucky, there's plenty of people on hand willing to perform some exploratory testing. This doesn't have to wait until the end of an iteration, it can start as soon as a story is stable enough to test. Usually this would be when the story is finished and acceptance tests are passing. It's useful to have a stable deployment environment for this.

Acceptance testing doesn't negate the need for manual, exploratory style testing. Lisa Crispin calls this kind of testing critiquing the product. Some product critique can be achieved using acceptance testing whilst others require a more manual approach or specialist tools. We'll look more at this later when we talk about Brian Marick's testing matrix and Crispin's elaboration.

To some degree, acceptance test suites address the need for regression testing. That is to say that they can show that the specifications haven't changed over time.



## Deliver

An optional step in the lifecycle is to actually deliver the demoed feature. This may get less emphasis because it's usually associated with a release where multiple stories are deployed together. It's actually a crucial step though as its only after this point that potential story value is actually released. It can be incorporated into the story delivery lifecycle when continuous delivery ideas are applied with the aim to deploy individual stories as they're ready.

It's a fairly extreme position to take and requires careful crafting of stories so that they add demonstrable value.


![The story delivery lifecycle](images/story-lifecycle-extended.png)
