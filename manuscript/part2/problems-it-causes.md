# Problems acceptance testing can cause {#problems-it-can-cause}

## Communication crutch

The typical process described above encourages communication but it also formalises it. It places check points which are designed to ensure that key conversations take place and agreement is established.

However, it can also encourage the team to focus on these as the only *required* conversations. If developer's find it hard to have conversations with the business, it may be that they'll make one token effort under the umbrella of "agreeing acceptance criteria" and forgo more meaningful conversations.



## Hand off behaviour

In agreeing acceptance criteria, the whole team (testers, developers and business) should be engaged and collaborating. With any discreet steps, it can be easy to assign responsibilities to roles and hand off responsibility when you're step is done. I'm not sure if this kind of process really encourages collective responsibility.

For example, one team I worked with directed testers to speak with the business to define acceptance criteria and draft acceptance tests. These were then handed off to the development team who would alter the draft tests to fit in with the code structure before implementing the feature. When done, developers would demo to the business but it would often bear little resemblance to what they agreed with the testers.

The problem here was that each stage was accompanied with a hand off and a loss of continuity. This lead to a chinese whispers affect. Business would hand off to testers. Testers would hand off to developers. Developers would hand off to the business. It turns out that developer's didn't like talking to the business and so hijacked the process to avoid interacting with them directly.

The intention behind having defined steps is around breaking down communication barriers but examples like this show that we can misuse the formalism to reinforce existing barriers.



## Technical over exposure

If we're not careful, the business can end up knowing too much about the technology choices. The business may feel that they need to be aware of the system architecture or technical decisions in order to approve a working system. In reality, it's really none of their concern. The business should be concerned that their business goals can be met and should learn to trust the technical staff to deliver an architecture that can support that objective. This goes both ways though as the technical staff have to earn that trust.

Business staff are not best placed to make technical decisions and knowing too much about technology empowers them to do so. It's the same for technical staff, technical staff are not best placed in making business decisions. That's not to say that business and technology staff should not collaborate but a they should be realistic and honest about their limitations.

If the business are acclimatised to focus on technology, it can be difficult to refocus on high-level business value. It can help to agree this point with the team so that they can be reminded when veering off track.



## Cargo cult

One of the biggest problems with the traditional acceptance test process is the temptation to focus on the practices and not the reasons behind them. Just like a [cargo cult](http://en.wikipedia.org/wiki/Cargo_cult), practitioners can be lured into following behaviours in the hope that the benefits will magically manifest. It's a causal fallacy; tests aren't the goal unto themselves.

The best recourse is to continually evaluate the process. Having something to actually measure against makes this much less subjective but cumming up with meaningful heuristics is notoriously difficult.


## Command and control structures

The agree, demo, sign off check points are designed to ensure key things happen during development. The steps can be misused however to create a command and control structure whereby the teams completion or lack of completion of the steps are used to exert pressure and assign blame.

The steps are supposed to be a guide. Getting a sticker or moving an index card across the board are not the goals unto themselves. Progress indicators like this can highlight bottlenecks and show progress but if these symptoms are used as a stick to beat the team, the overall situation wont improve.

We shouldn't lose sight that the steps in any system should not be about targets and outputs but about understanding the team's capabilities. If we can demonstrate that the biggest bottleneck in the system is getting the business to go through acceptance criteria, we've exposed an underlying problem to address. We shouldn't plaster over it by working around it or blame individuals or the process and give up.


## Construct validity

The story delivery cycle is premised on a story having business "value". In practice, it can be very difficult to define this value. Often, we assume _real_ value (i.e. cash) will come later and _speculative_ value (i.e. features) will come from stories. There is obvious tension between real value and theoretical value. For example, some business models adopt a "build it and they will come" approach. They may interpret business value in the story sense to mean incremental features but it's real value may well be in attracting users and capturing their life time value (revenue).

Defining business "value" can easily suffer from a lack of construct validity. Are the things we measure reflective of the underlying value we're postulating. Is the thing we're measuring representative of value? Are we creating a "value" construct that really models our goals?



## Artificial constraints

We have to be careful not to constrain ourselves artificially. The given/when/then pattern advocated by BDD for example encourages a certain way to frame our thought process. This isn't always appropriate and we should avoid falling into assuming it is. At the heart of agile principles is the idea to adapt, we should always be mindful of this and continually review process.
