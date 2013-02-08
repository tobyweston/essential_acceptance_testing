# Problems it tries to fix

## Communication barriers

The typical process described earlier can be useful to force communication. There's a formal vehicle (the acceptance test artifacts) that have to be authored and agreed and checkpoints in place to highlight the agreement (see the [stickers as sign-off](#stickers-as-sign-off-aside) aside).

For some teams this is really important but it doesn't mean that the story definition lifecycle is a substitute for natural, daily communication. It can be tempting to lean on formal mechanisms like this as the _only_ communication mechanism but this can lead to its own problems (discussed in the [problems section](problems-it-can-cause)).

The spirit of the thing is to encourage communication not to stifle it. You create artifacts that can be shared, referred back to and you demonstrate these executable artifacts to the stakeholders. It doesn't preclude speaking to them whenever you feel like it. If you discover new insight, you're free to adjust the acceptance criteria and tests.

When not using this approach, you find that requirements are being misunderstood or not delivered as the customer intended, forced communication like this _may_ be useful. In this case, it's a technique that may help overcome these underlying problems.

## Lack of shared memory

The acceptance tests document a shared (and agreed) understanding of features. As time goes on, its easy to forget how a particular feature is supposed to behave. Especially if new requests seem to contradict existing features.

The set of documentation forms an live record of the system's behaviour. Available to everyone and in business language as to be accessible. Tools like [Yatspec](http://code.google.com/p/yatspec/), [Concordion](http://concordion.org) and Concordion.NET, emphasise this aspect and can create a HTML documentation set for you publish. You can organise this however you like. You might show features grouped by area, iteration and even use it as developer API documentation.

![An example of a Concordion HTML overview. Tests are groups under tabs and users can drill down into the detail.](images/concordion/overview_passing.png)


## Lack of collective understanding

It's very difficult to appreciate what a customer really wants from broken fragments of conversations or email trails. There a lot of room for ambiguity. By slowing down and carefully going over examples and collaboratively creating acceptance criteria, the hope is that any misunderstanding will come up early and be addressed. It's often the case that specific questions about error and edge cases will cause the customer to think harder about their requirements.

Writing acceptance criteria down in the form of tests isn't the only tool available here. Conversation, previous documentations, spreadsheets, flow diagrams, gorilla diagramming, anything and everything all feed into the process.


## Ambiguous language

Often customers and developers have their own language for things. When there's ambiguity in terminology, misunderstanding or confusion is bound to arise.

For example, in finance the noun _trade_ can mean very different things to different departments. The direction of a transaction, _buy_ or _sell_ can be inverted depending on what side of the fence you sit on. Getting this right in your system is obviously going to be important.

Not assuming anything and defining terms clearly in acceptance tests can be a good way to ensure some consistency. This takes discipline though and relies on people bringing up inconsistent use of terminology as it happens. The formalism of terminology in an acceptance test artifact should solidify this ubiquity.

The spirit here is to strive for a ubiquitous language.


## Lack of structure and direction

Iterative development favours planning; iterations are planned ahead of time. The stories to deliver are fixed at the start of an iteration. Although the iterations are short, it still represents some rigidity. The balance is in offering the delivery team stability as well as being responsive to changes in business priorities.

By stability, I mean that the goal for the next week or so is well known and the team know where they're heading and why. They're free from process distraction. With it, scope creep or fire fighting can be kept to a minimum and the team free to focus on multiple, small, achievable deliveries.

Having an established process like the story definition life cycle can give structure to delivery and contribute to sustainable pace. Such a process certainly offers clear boundaries and check points. Crossing them helps establish a rhythm or cadence and gives us a chance to celebrate in what we've achieved. People know where they stand.

Compare this to the prospect of working on a large multi-feature chunk of work with no clear end in sight. Moral and discipline suffer.

This may partly be a point more about decomposition than acceptance testing. People just handle small tasks better. There is a personal psychology aspect but there's also advantages for the business in dealing in small features. It reduces risk and allows for quicker change of direction. It's the cost of change curve.


