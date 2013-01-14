
## What's an Acceptance Test?

Before we start, we should probably agree on some common definitions. Deciding on a definition of acceptance test can be contentious. Different people have different interpretations. So what _is_ an acceptance test?

> An acceptance test is any test that helps the customer "accept" that the system behaves as they intend it to.

Helps a custom "accept" system behaviour? What would help me accept a system works as I expect? I imagine I'd need to _see_ something. Some output against a running system. Perhaps this could be a demo but really, I'd prefer something automated and repeatable. Something

Traditional definitions emphasis the idea that acceptance tests _must_ be customer authored. I tend to agree with this.

D>## Starting the full stack {#starting-the-full-stack}

D> Many teams fall into the trap of starting the full stack up in order to run an acceptance test. Apart from being expensive to start a web server and initialise the system, starting up the full stack doesn't automatically mean the test that runs will be an _acceptance test_. It just means it's running against a fully started system.

D> An acceptance test is just as valid if it's run against a subset of the full system. In fact, this is an approach I prefer as it encourages a component based design. We'll look at this more in the [Port and Adapters](#ports-and-adapters) section.


## Confidence and Trust

## Why do we care?