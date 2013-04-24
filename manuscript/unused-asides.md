
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
D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [How testing can influence design](#design) section.




Originally in part1/introduction.md (in the Bring it all Together section)

D>## A new acceptance test per story? {#a-new-acceptance-test-per-story-aside}
D>
D> A common pitfall teams fall into is to automatically create new acceptance tests for a new story. This may be a reasonable choice to start with but can quickly lead to hundreds and hundreds of acceptance tests, many of which will duplicate parts of others. It's a far more scalable strategy to look for existing acceptance tests that exercise related areas and augment them. Obviously, there is a balance to be had and it makes sense to organise your tests so that you can quickly understand which stories they exercise (some suggestions are offered later).
D>
D> It's totally acceptable for a single acceptance test to demonstrate multiple stories. Acceptance tests should be revisited and leveraged when new stories are defined. When it comes to acceptance testing, duplicated test paths often lead to slower test runs. Designing your system and test infrastructure to be componentised also helps.  We'll look at this more in the [How testing can influence design](#design) section.




Originally at the end of the Introduction section (after Confidence and Trust).

D>## Technical vs business language {#technical-vs-business-language-aside}
D>
D> It's a really good idea to aim for a ubiquitous language between development and the business. It helps make sure that when someone is talking about something, the whole team have a collective understanding of what that _thing_ is. As a silly example, is an "instrument" a violin or an equity derivative from the finance industry?
D>
D> When it comes to setting acceptance criteria, the language should favour the business camp. Write in terms of _business goals_ and not _test scripts_. The business shouldn't care how a test is implemented behind the scenes. It should be shown to go green in the language _they_ understand.
D>
D> It may be that whilst building trust, developers have to explain what components are being exercised or even show data in it's raw form but ultimately, the code is none of the business's concern. I see far too many teams fall into the trap where the business try to influence test infrastructure or how to go about testing some feature. This is always down to trust. Work hard at building trust and avoid the frustration.