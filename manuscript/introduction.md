~# Part 1

# Introduction

## What's an Acceptance Test?

Before we start, we should probably agree on some common definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what _is_ an acceptance test?

> An acceptance test is a set of criteria or _specification_ that helps the customer "accept" that the system behaves as they intend it to.

What would help me "accept" a system works as I expect? I imagine I'd want to _see_ something. Some output to verify the behaviour of a running system. This could be a demo but really, I'd prefer something automated and repeatable. Sounds a lot like regular unit style testing doesn't it?

Documenting the runtime behaviour of our system is only half the story though. The other half is deciding what that behaviour should be. Getting input from interested parties _before_ building out a component is vital in ensuring we build the _right_ component. Turns out that acceptance tests are a great vehicle for discussing amd formalising these requirements.

Traditional definitions emphasize that acceptance tests should be customer authored. I tend to agree with this. If we write software that nobody wants, there's not much point in writing it. The customer can express their requirements in the form of acceptance criteria, a specification against which the system can be validated. Adding to our definition then would give us something like.

>  An acceptance test is a set of criteria or _specification_ that helps the customer "accept" that the system behaves as they intend it to. The test can be used to specify required behaviour _before_ implementing functionality and then validate the behaviour against the completed implementation.

D>## Starting up the full stack {#starting-the-full-stack-aside}
D>
D> Many teams fall into the trap of thinking they need to start up the full stack in order to run an acceptance test. Apart from being expensive to say, start a web server and initialise the system, starting up the full stack doesn't automatically mean the test that runs will be an _acceptance test_. It just means it's running against a fully started system.
D>
D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [Port and Adapters](#ports-and-adapters) section.

## What's a story?

## Confidence and Trust

## Why do we care?