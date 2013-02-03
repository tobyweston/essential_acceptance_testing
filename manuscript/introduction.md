-# Part 1

# Introduction


## What's an Acceptance Test?

Before we start, we should probably agree on some common definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what _is_ an acceptance test?

> An acceptance test is a set of _executable_ criteria, examples or specification that help the customer "accept" that the system behaves as they intend it to.

What would help me "accept" a system works as I expect? I imagine I'd want to _see_ something. Some output to verify the behaviour of a running system. This could be a demo but really, I'd prefer something automated and repeatable. Sounds a lot like regular unit style testing doesn't it?

Documenting the runtime behaviour of our system is only half the story though. The other half is deciding what that behaviour should be. Getting input from interested parties _before_ building out a component is vital in ensuring we build the _right_ component. Turns out that acceptance tests are a great vehicle for discussing amd formalising these requirements.

Traditional definitions emphasize that acceptance tests should be customer authored. I tend to agree with this. If we write software that nobody wants, there's not much point in writing it. The customer can express their requirements in the form of acceptance criteria, a specification against which the system can be validated. Adding to our definition then would give us something like.

>  An acceptance test is a set of _executable_ criteria, examples or specification that help the customer "accept" that the system behaves as they intend it to. The test can be used to specify required behaviour _before_ implementing functionality and then validate the behaviour against the completed implementation.


## Acceptance Criteria vs Acceptance Tests

We'll often use the terms acceptance criteria and acceptance test interchangeably but I tend to think about them as distinct.

Acceptance criteria are the set of criteria that when verified against a running system give confidence to the customer that the system behaves as expected. They represent the requirements or specification for a small set of functionality and are written in such a way as to be quantifiable. They're typically defined when doing the analysis for a story and are typically concerned with the business functionality. The implication here is that the business are best placed to define the first set of criteria.

Defining the criteria is a useful step in understanding a story. It helps us define the scope of the feature so developers know when to stop. Importantly, it also helps the team to drive out a shared understanding of the story. Criteria should be implementation agnostic and written at a fairly high level. You'd then _implement_ the criteria in terms of one or more acceptance tests. A single criteria (for example, "the total basket value is displayed correctly") may require multiple examples to be provable (for example, what exactly does "correct" mean here). That's where the implementation as executable acceptance _tests_ comes in.

An acceptance test is the physical test artifact to be executed. It may be a test-test[^test-test], a test script that requires a human to run through, a record-replay style UI test or even a checklist on a scrap of paper. The acceptance test can be seen as the confirmation step in Ron Jefferies' [Three Cs of a user story](http://xprogramming.com/articles/expcardconversationconfirmation/).

[^test-test]: any test written in the language of choice. It could be a Java test to run in JUnit, a piece of JavaScript to run with Jasmine, Ruby and RSpec, C# and NUnit or just a main method. You get the idea.




D>## Starting up the full stack {#starting-the-full-stack-aside}
D>
D> Many teams fall into the trap of thinking they need to start up the full stack in order to run an acceptance test. Apart from being expensive to say, start a web server and initialise the system, starting up the full stack doesn't automatically mean the test that runs will be an _acceptance test_. It just means it's running against a fully started system.
D>
D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [Port and Adapters](#ports-and-adapters) section.

## What's a story?

## Confidence and Trust

## Why do we care?