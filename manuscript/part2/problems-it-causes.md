# Problems acceptance testing can cause {#problems-it-can-cause}

W> ## This section is not yet finished
W>
W> This section is not yet finished. It's a work in progress, a lean publishing effort. I try not to publish anything that's too sketchy but bear with me.
W>
W> Help set the direction, get involved and make suggestions via the [Leanpub page](https://leanpub.com/essential_acceptance_testing).
W>

## Communication crutch

The typical process described above encourages communication but it also formalises it. It places check points which are designed to ensure that key conversations take place and agreement is established.

However, it can also encourage the team to focus on these as the only *required* conversations. If developer's find it hard to have conversations with the business, it may be that they'll make one token effort under the umbrella of "agreeing acceptance criteria" and forgo more ad-hoc conversations.



## Hand off behaviour

In agreeing acceptance criteria, the whole team (testers, developers and business) should be engaged and collaborating. With any discreet steps, it can be easy to assign responsibilities to roles and hand off responsibility when you're step is done. I'm not sure if this kind of process really encourages collective responsibility.

For example, one team I worked with directed testing staff to speak with the business to define acceptance criteria and draft acceptance tests. These were then handed off to the development team who would alter the draft tests to fit in with the code structure and go off and implement the feature. When done, it would be demoed with the business but would often bear little resemblance to what they agreed with testers.

The problem here was that each stage was accompanied with a hand off and a loss continuity. The hand off closely followed role divides within the team. Testers would hand off to developers. Developers would hand off to the business. It turns out that developer's didn't like talking to the business and so the process was shoehorned into mimicking the communication structures. There's an analogy to Conway's law here.

The intention behind having defined steps is around breaking down communication barriers but examples like this show that we can misuse the formalism to reinforce existing barriers.



## Technical over exposure

The business know too much about the technology choices. It's really none of their business! [more]


## Cargo cult

One of the biggest problem with the traditional acceptance test process is the temptation to focus on the practices and not the reasons behind them. Just like a [cargo cult](http://en.wikipedia.org/wiki/Cargo_cult), practitioners can be lured into following behaviours in the hope that the benefits will magically manifest. It's a causal fallacy. Tests aren't the goal unto themselves.



## Command and control structures

The agree, demo, sign off check points are designed to ensure  key things happen during development. The steps can be misused however to create a command and control structure whereby the teams completion or lack of completion of the steps are used to exert pressure and assign blame.

The steps are supposed to be a guide. Getting a sticker or moving an index card across the board are not the goals unto themselves. Progress indicators like this can highlight bottlenecks and show progress but if these symptoms are used as a stick to beat the team, the overall situation won't improve.

We shouldn't loose sight that the steps in any system should not be about targets and outputs but about understanding the team's capabilities. If the biggest bottleneck in the system is getting the business to find time to go through acceptance criteria, we've exposed an underlying problem to address. We shouldn't plaster over it by working around it or blame the process and give up.


## Construct validity

The story life cycle is premised on a story having business "value". In practice, it can be very difficult to define this value. Often, we assume _real_ value (i.e. cash) will come later and _interim_ value (i.e. features) will come from stories. There is obvious tension between real value and theoretical value. For example, some business models adopt a "built it, and they will come" approach. They may interpret business value in the story sense to mean incremental features but it's real value may well be in attracting users and capturing their life time value (revenue).

Defining business "value" suffers from a kind of construct validity. Are the things we measure reflective of the underlying value we're postulating. Is the thing we're measuring representative of value? Are we creating a "value" construct that really models our goals?



## Artificial constraints


