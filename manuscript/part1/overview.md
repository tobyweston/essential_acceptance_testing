# Process Overview {#process-overview}

## The story delivery life cycle {#story-delivery-life-cycle}

A typical agile process used by many teams today revolves around the following steps.

1. Pick a story
1. Agree acceptance criteria
1. Develop functionality
1. Demonstrate and sign off
1. Repeat

## Pick a story

D> ## What's a Story? {#whats-a-story-aside}
D>
D> There is often some debate about the definition of a story. For the purpose of this discussion, lets assume that a story is just a way to decompose the requirements into achievable chunks that, if implemented, would add _business value_.
D>
D> It's common to physically write the story description on an index card. Teams might then use this as a token on the team's project board to visualise it's task management, moving from left to right to indicate progress.


## Agree acceptance criteria

A> ## Inputs and outputs {#agree-acceptance-criteria-inputs-outputs-aside}
A> **Inputs**
A> Story
A>
A> **Outputs**
A> List of examples and scenarios with expectations (the acceptance criteria)
A> Agreement from everyone that these demonstrate desired functionality
A> Additional documentation or context in whatever form is appropriate
A>
A> **Avoid**
A> Implementation details


It may be that the story you pick up lacks sufficient detail to answer the question "how do we know it's done?". To figure this out, you'd typically formalise the acceptance criteria. Capture examples scenarios, edge cases and outcomes. The idea here is to describe the requirements not in terms of a series of instructions to follow (a traditional test script) but as an english description of the business goals.

When you describe the high level business scenarios like this, you'll implicitly create a _specification_ accessible to business and technical staff. You're not concerned with the details of how things will be implemented. It's a chance to focus on the business intent and make sure everyone involved understands what's required, the terminology and the business context.

This is best done with the business or customer. Get together and make sure everyone has a common understanding of what's needed. You can attempt to define some acceptance criteria. Expect lots of discussion about the specifics and come up with concrete examples and scenarios. What questions if answered will convince the customer that the system is behaving as they specified?

D> ## Do we need a meeting to agree acceptance criteria?
D>
D> You don't need a meeting to define acceptance criteria, in fact, its great if you can keep discussing and clarifying them as you need to. You may find it useful to have a kick-off meeting where you can discuss a story's background, context and goals.
D>
D> Note that I'm not talking about an _iteration planning_ meeting here, more like a story definition meeting. The difference is that we're not trying to _plan_ which stories are being played in an iteration. Instead we want to work up the teams understanding of a story. To be most efficient, some analysis work should have already been undertaken.

Once you've written the criteria down, the next step is to formally agree them with interested parties. We'll brush over how best to physically record the criteria but we'd aim to have them in a format that will help us later when we come to convert them into executable tests. For arguments sake, you might record these on a Wiki, HTML pages associated with the project source or just on the back of the story card. The point is though that after this step, everyone involved has agreed that the list of criteria is a reasonable effort at documenting the intent.

Remember that all this is done before writing any production code.

A> ## Define acceptance criteria check list {#define-acceptance-criteria-check-list-aside}
A> - Business analysis has been undertaken.
A> - Developers understand the business background, context and goals for a story.
A> - There is no ambiguity about business terms and everyone agrees on their definition.
A> - Acceptance criteria have been discussed and documented.

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

![The typical story definition life cycle](images/StoryDeliveryLifecycle.png)

![A typical specification](images/AnatomyOfAnActiveSpec.png)

## Develop

## Demonstrate



