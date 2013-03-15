# Q&A

## What do we mean when we say "acceptance testing"

See the [Introduction](#part1) section.



## How do I manage large numbers of acceptance tests?

Easier answer for greenfield projects, much harder for existing code bases.

I think there's two aspects to this, keeping the testing fast enough and keeping the tests relevant.

It can also be difficult to physically manage a large number of test artifacts. Test specification tools can help and many suggest approaches to creating overview or "library" artifacts to bring together all the specifications. If you're using Concordion, there's a Ant task available to [generate overview pages](http://baddotrobot.com/blog/2010/07/07/generate-concordion-overviews/). Cross linking from JIRA or your wiki may also be an option. I've also worked on teams where custom search tools were written to help locate scenarios.


## How do you map acceptance tests to stories in say JIRA?



## How does applying acceptance testing techniques help us focus on reducing complexity?



## When would you not write stories? Acceptance criteria?

Stories can be a necessary ceremony to overcome other system constraints or dysfunction.



## How does agile acceptance testing differ from conventional UAT?

> "It would interesting to know how Agile Acceptance testing is different from traditional user acceptance testing in Waterfall model."


## What are some other testing strategies? How does acceptance testing fit in?

> "Can we also briefly talk about the different test types (testing strategies) and how acceptance testing fits into this whole family? You can hear people talking about Smoke tests, End to End tests, Acceptance tests, Performance tests, Module tests, Integration tests, Unit tests (Mock/Interaction testing style, Inputs/Outputs testing style, ...), Regression testing etc."

> "Can we talk about the different approaches to defining acceptance criteria, for example: low level www browser scenario descriptions like "user fills in the registration form with username and email and password, and clicks the submit button" vs high level business functionality descriptions like "user submits a new registration request providing personal details."

> "Who defines the acc criteria? Business defines the acc criteria, devs define them, testers define them, everybody defines them, devs pair with testers and business when defining them, ...?"

> "Can we talk about exposing the acceptance criteria to the business. Why would we like to do it, what problems do we face when doing it? What tools can we use (defining criteria in Java like Yatspec or JUnit, defining criteria in text like Cucumber, ...)?"


## How do you layer various types of testing to maximise benefit?

> "The team I'm on write automated unit tests and have recently begun writing automated acceptance tests. We are not exactly sure where these should fit in at the moment, as we still use mocked objects in the acceptance tests they feel more like just unit tests written in business language. This has some benefit, but not as much as we were expecting\hoping. We're not sure whether we should instead be writing them more like end-to-end tests, or perhaps a mixture of both. So we'd be interested in seeing some real-world examples of how other teams might layer their various test suites, and how much value they really bring in comparison to other types of testing."


## How does exception testing fit with unit and end-to-end tests?


## Aren't acceptance tests slow with high maintenance costs?


## What's the best way to leverage CI servers like TeamCity and Jenkins?



## Where does BDD fit in?



## Can I run acceptance tests in parallel?



## How can I run acceptance tests which exercise business processes than span multiple business days?



## How should I setup and tear down data?



## What's the difference between unit, acceptance, integration and system tests?