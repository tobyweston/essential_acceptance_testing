# Problems acceptance testing tries to fix

## Communication barriers

The typical process described in [part 1](#part1) can be useful in encouraging communication. There's a formal vehicle (the acceptance test artifacts) that must be created and agreed and it puts checkpoints in place to emphasise the agreement (for example, see the [stickers as sign-off](#stickers-as-sign-off-aside) aside).

It doesn't mean that the story delivery lifecycle is a substitute for spontaneous and continued communication. It can be tempting to lean on formal mechanisms like this as the _only_ communication mechanism but this can lead to its own problems (discussed in the [problems section](#problems-it-can-cause)).

The spirit of the process is to encourage communication not to stifle it. You create artifacts that can be shared, referred back to and you demonstrate these executable artifacts to the stakeholders. It doesn't preclude speaking to them whenever you feel like it. If you discover new insight, you're free to adjust the acceptance criteria and tests; to go round the loop again.

When not using this approach, if you find that requirements are being misunderstood or not delivered as the customer intended, forcing formal communication like this may be useful. It's a technique that may help overcome underlying communication problems and if there's already good communication, it can be used to document the dialogue.



## Lack of shared memory

The acceptance tests document a shared (and agreed) understanding of features. As time goes on, its easy to forget how a particular feature is supposed to behave. If acceptance tests are in a customer friendly format, they form reference documentation that will always be accurate; a live record of the system's behaviour.

Tools like [Yatspec](http://code.google.com/p/yatspec/), [Concordion](http://concordion.org) and Concordion.NET, emphasise this aspect and can be used to create HTML documentation to share. You can organise this however you like. You might show features grouped by area, iteration and even use it for developer API documentation.

![An example of a Concordion HTML overview. Tests are grouped under tabs and users can drill down into the test's detail.](images/concordion/overview-passing.png)



## Lack of collective understanding of requirements

It's very difficult to appreciate what a customer really wants from broken fragments of conversations or email trails. There's a lot of room for ambiguity. By slowing down and carefully going over examples and collaboratively creating acceptance criteria, the hope is that any misunderstanding will come up early and be addressed. It's often the case that specific questions about error and edge cases will surface and cause the customer to think harder about their requirements.

Writing acceptance criteria down in the form of tests isn't the only tool available here. Conversation, previously generated documentation, spreadsheets, flow diagrams, gorilla diagramming, anything and everything all feed into the process. Acceptance tests just document the understanding.



## Blurring the "what" with the "how"

This is really making the point that it's the "what" that's important and not the "how". At least, when it comes to the business goals (which are more than likely to include making money), focusing on the goal is very different than focusing on the details of how to achieve it. If these ideas are blurred, all kinds of problems can arise. It can be as simple as empowering the best placed people.

Acceptance testing, at least in principle, aims to help separate goals from implementation. Goals are defined as acceptance criteria and the development team are left to implement and prove that the criteria have been met. In practice, technology choice can undermine this aspiration. For example, if a testing technology exposes too much detail about the system design or criteria are written in technical terms (rather than business terms), the business will acclimatise in the detail and may miss the high level objectives. Defining technically oriented stories (with little real value) can be another example of blurring the lines.



## Ambiguous language

Often customers and developers have their own language for things. When there's ambiguity in terminology, misunderstanding or confusion is bound to arise.

For example, in finance, the noun _trade_ can mean very different things to different departments. The direction of a transaction, _buy_ or _sell_ can be inverted depending on what side of the fence you sit on. Getting this right in your system is obviously going to be important.

Not assuming anything and defining terms clearly in acceptance tests can be a good way to ensure some consistency. This takes discipline though and relies on people bringing up inconsistent use of terminology as it happens. Individuals may also need to be brave and ask the "obvious" questions. The agreed use of terminology formalised in an acceptance test can solidify it's definition.

The spirit here is to strive for a ubiquitous language.


## Lack of structure and direction

Iterative development favours planning; iterations are planned ahead of time. The stories to deliver are fixed at the start of an iteration. Although the iterations are short, it still imposes some rigidity. The balance is in offering the delivery team stability as well as being responsive to changes in business priorities.

By stability, I mean that the goal for the next week or so is well known and the team know where they're heading and why. They're free from process distraction. With it, scope creep and fire fighting can be kept to a minimum and the team is free to focus on multiple, small, achievable deliveries.

Having an established process like the story delivery lifecycle can give structure to delivery and contribute to sustainable pace. Such a process certainly offers clear boundaries and check points. Crossing them helps establish a rhythm or cadence and gives the team a chance to celebrate in what they've achieved. People know where they stand.

Compare this to the prospect of working on a large multi-feature chunk of work with no clear goals and no end in sight. Morale and discipline suffer. It goes against the the constancy of purpose Deming warns of when talking about the Seven Deadly Diseases.

This may well be a point more about decomposition than acceptance testing. People just handle small tasks better. There is a personal psychology aspect but there's also advantages for the business in dealing in small features. It reduces risk and allows for quicker change of direction. It's the cost of change curve.


## Team engagement

The story delivery cycle can give the entire team (developers, testers and the business) the opportunity to understand the motivations and contribute to the planning and execution of solutions. Along with creating a rhythm or cadence already mentioned, it can help galvanise a team around small, frequent delivery milestones. Compare this to teams that actively encourage "shelve stacking", where developers are spoon feed technical tasks with no real engagement and expected to simply stack the shelves without question.

