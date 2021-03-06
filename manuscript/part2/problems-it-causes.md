# Problems acceptance testing can cause {#problems-it-can-cause}

## Communication crutch

The typical process described above encourages communication but it also formalises it. It places check points which are designed to ensure that key conversations take place and agreement is established.

However, it can also encourage the team to focus on these as the only *required* conversations. If developers find it hard to have conversations with the business, it may be that they'll make a token effort under the umbrella of "agreeing acceptance criteria" and forgo more meaningful conversations.



## Hand off behaviour

In agreeing acceptance criteria, the whole team (testers, developers and business) should be engaged and collaborating. With discrete steps it can be easy to assign responsibilities to roles and hand off responsibility when your step is done. I'm not sure if this kind of process really encourages collective responsibility.

For example, in one team I worked with, testers would speak with the business to define acceptance criteria and draft acceptance tests. These were then handed off to the development team who would alter the draft tests to fit in with the code structure before implementing the feature. When done, developers would demo to the business but it would often bear little resemblance to what they agreed with the testers.

The problem here was that each stage was accompanied with a hand off and a loss of continuity. This leads to a chinese whispers affect. Business would hand off to testers. Testers would hand off to developers. Developers would hand off to the business. It turns out that developers didn't like talking to the business and so hijacked the process to avoid interacting with them directly.

The intention behind having defined steps is around breaking down communication barriers, but examples like this show that we can misuse it to reinforce existing barriers.



## Technical overexposure

If we're not careful, the business can end up knowing too much about the technology choices. The business may feel that they need to be aware of the system architecture or technical decisions in order to approve a working system. In reality, it's really none of their concern. The business should be concerned that their business goals can be met and should learn to trust the technical staff to deliver an architecture that can support that objective. This goes both ways as the technical staff have to earn that trust.

Business staff are not best placed to make technical decisions and knowing too much about technology empowers them to do so. It's the same for technical staff; technical staff are not best placed in making business decisions. That's not to say that business and technology staff shouldn't collaborate but they should be realistic and honest about their limitations.

If the business are acclimatised to focus on technology, it can be difficult to refocus on high-level business value. It can help to be upfront about this and have an honest discussion with the entire team.



## Cargo cult

One of the biggest problems with the traditional acceptance test process is the temptation to focus on the practices and not the reasons behind them. Just like a [cargo cult](http://en.wikipedia.org/wiki/Cargo_cult), practitioners can be lured into following behaviours in the hope that the benefits will magically manifest. It's a causal fallacy; tests aren't the goal unto themselves.

The best recourse is to continually evaluate the process. Having something to actually measure against makes this much less subjective but coming up with meaningful heuristics is notoriously difficult.


## Command and control structures

The agree, demo, sign off checkpoints are designed to ensure key things happen during development. However, the steps can be misused to support command and control structures and put pressure on the team if they don't complete steps.

The steps are supposed to be a guide. Getting a sticker or moving an index card across the board are not goals unto themselves. Progress indicators like this can highlight bottlenecks and show progress but if these symptoms are used as a stick to beat the team, the overall situation won't improve.

We shouldn't lose sight that the steps in any system should not be about targets and outputs but about understanding the team's capabilities. If we can demonstrate that the biggest bottleneck in the system is getting the business to go through acceptance criteria, we've exposed an underlying problem to address. We shouldn't plaster over it by working around it or blame individuals which can lead to defensive behaviours.


## Construct validity

The story delivery cycle is premised on a story having business "value". In practice, it can be very difficult to define this value. Often, we assume _real_ value (i.e. cash) will come later and _speculative_ value (i.e. features) will come from stories. There is obvious tension between real value and theoretical value. For example, some business models adopt a "build it and they will come" approach. They may interpret business value in the story sense to mean incremental features but its real value may well be in attracting users and capturing their life time value (revenue).

Defining business "value" can easily suffer from a lack of construct validity. Are the things we measure reflective of the underlying value we're postulating? Are we creating a "value" construct that really models our goals?



## Artificial constraints

We have to be careful not to constrain ourselves artificially. The given/when/then pattern advocated by BDD encourages a certain way to frame our thought process. This isn't always appropriate and we should avoid assuming it is. At the heart of agile principles is the idea to adapt, we should always be mindful of this and continually review process.
