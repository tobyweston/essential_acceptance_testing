
Originally in part1/introduction.md (at the end of the Introduction section)

D> ##Specification by example {#specification-by-example-aside}
D>
D> Specification by example is a way to describe your requirements using realistic examples. Rather than trying to express requirements through abstract statements, you'd typically describe the context in english and follow it with example scenarios which when executed would hold true for a system implementing the requirements correctly.
D>
D> Following the process outlined in this book would naturally lead to a degree of specification by example. Don't get hung up on the term, I see it as just a useful label for the way we might naturally express requirements. If it's useful to think up examples to get your point across, go for it.
D>
D> Balancing enough scenarios to cover functionality without repeating yourself is key. When done right, they should form an accessible record of how the system behaves.




Originally in part1/introduction.md (at the end of Acceptance Criteria vs Acceptance Tests (what are acceptance criteria)

D>## Starting up the full stack {#starting-the-full-stack-aside}
D>
D> Many teams fall into the trap of thinking they need to start up the full stack in order to run an acceptance test. Apart from being expensive to say, start a web server and initialise the system, starting up the full stack doesn't automatically mean the test that runs will be an _acceptance test_. It just means it's running against a fully started system.
D>
D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [Ports and Adapters](#ports-and-adapters) section.
