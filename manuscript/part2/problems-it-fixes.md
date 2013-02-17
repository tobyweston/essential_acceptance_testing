# Problems acceptance testing tries to fix

W> ## This section is not finished
W>
W> This section is not yet finished. It's a work in progress, a lean publishing effort. I try not to publish anything that's too sketchy but bear with me.
W>
W> Help set the direction, get involved and make suggestions via the [Leanpub page](https://leanpub.com/essential_acceptance_testing).
W>

## Communication barriers

The typical process described in [part 1](#part1) can be useful in encouraging communication. There's a formal vehicle (the acceptance test artifacts) that should be authored and agreed and it puts checkpoints in place to emphasise the agreement (see the [stickers as sign-off](#stickers-as-sign-off-aside) aside).

It doesn't mean that the story definition life cycle is a substitute for spontaneous and continued communication. It can be tempting to lean on formal mechanisms like this as the _only_ communication mechanism but this can lead to its own problems (discussed in the [problems section](#problems-it-can-cause)).

The spirit of the process is to encourage communication not to stifle it. You create artifacts that can be shared, referred back to and you demonstrate these executable artifacts to the stakeholders. It doesn't preclude speaking to them whenever you feel like it. If you discover new insight, you're free to adjust the acceptance criteria and tests; to go round the loop again.

When not using this approach, if you find that requirements are being misunderstood or not delivered as the customer intended, forcing formal communication like this may be useful. It's a technique that may help overcome underlying communication problems but if there's already good communication, it can be used to document the dialogue.



## Lack of shared memory

The acceptance tests document a shared (and agreed) understanding of features. As time goes on, its easy to forget how a particular feature is supposed to behave. If acceptance tests are in a customer friendly format, they form reference documentation that will always be accurate; a live record of the system's behaviour.

Tools like [Yatspec](http://code.google.com/p/yatspec/), [Concordion](http://concordion.org) and Concordion.NET, emphasise this aspect and can be used create HTML documentation for you publish. You can organise this however you like. You might show features grouped by area, iteration and even use it for developer API documentation.

![An example of a Concordion HTML overview. Tests are grouped under tabs and users can drill down into the test's detail.](images/concordion/overview_passing.png)



## Lack of collective understanding of requirements

It's very difficult to appreciate what a customer really wants from broken fragments of conversations or email trails. There a lot of room for ambiguity. By slowing down and carefully going over examples and collaboratively creating acceptance criteria, the hope is that any misunderstanding will come up early and be addressed. It's often the case that specific questions about error and edge cases will surface and cause the customer to think harder about their requirements.

Writing acceptance criteria down in the form of tests isn't the only tool available here. Conversation, previously generated documentation, spreadsheets, flow diagrams, gorilla diagramming, anything and everything all feed into the process. Acceptance tests just document the understanding.



## Ambiguous language

Often customers and developers have their own language for things. When there's ambiguity in terminology, misunderstanding or confusion is bound to arise.

For example, in finance the noun _trade_ can mean very different things to different departments. The direction of a transaction, _buy_ or _sell_ can be inverted depending on what side of the fence you sit on. Getting this right in your system is obviously going to be important.

Not assuming anything and defining terms clearly in acceptance tests can be a good way to ensure some consistency. This takes discipline though and relies on people bringing up inconsistent use of terminology as it happens. The formalism of terminology in an acceptance test artifact aims to solidify their definition.

The spirit here is to strive for a ubiquitous language.

![An example of annotated acceptance criteria defining parts of the domain](missing.png)


## Lack of structure and direction

Iterative development favours planning; iterations are planned ahead of time. The stories to deliver are fixed at the start of an iteration. Although the iterations are short, it still imposes some rigidity. The balance is in offering the delivery team stability as well as being responsive to changes in business priorities.

By stability, I mean that the goal for the next week or so is well known and the team know where they're heading and why. They're free from process distraction. With it, scope creep and fire fighting can be kept to a minimum and the team is free to focus on multiple, small, achievable deliveries.

Having an established process like the story definition life cycle can give structure to delivery and contribute to sustainable pace. Such a process certainly offers clear boundaries and check points. Crossing them helps establish a rhythm or cadence and gives the team a chance to celebrate in what they've achieved. People know where they stand.

Compare this to the prospect of working on a large multi-feature chunk of work with no clear goals and no end in sight. Moral and discipline suffer. It goes against the the constancy of purpose Deming warns of when talking about the Seven Deadly Diseases.

This may well be a point more about decomposition than acceptance testing. People just handle small tasks better. There is a personal psychology aspect but there's also advantages for the business in dealing in small features. It reduces risk and allows for quicker change of direction. It's the cost of change curve.