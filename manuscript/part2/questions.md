# Q&A

## What do we mean when we say "acceptance testing"

See the [Introduction](#part1) section.



## How do I manage large numbers of acceptance tests?

It can also be difficult to physically manage a large number of test artifacts.

This is easier to answer for greenfield projects and much harder for existing code bases with lots of tests.

For the greenfield project, you're influenced by the testing tools you are using. If you're running acceptance tests using JUnit a report will be generated. For vanilla JUnit tests, this isn't really usable to search for specific tests by it's metadata. With other HTML specification tools like Yatspec or Concordion, you can create additional HTML pages to manage and share the results. You might also consider writing custom search tools to help find relevant tests.

For example, when using Concordion you can automatically create overview pages to bring together the specifications in one place using an [Ant task](http://baddotrobot.com/blog/2010/07/07/generate-concordion-overviews/). This allows for cross linking from JIRA or your wiki. Using the Ant task, metadata is inserted into the HTML specifications and used by the tool to generate overview pages and group related tests. For example, the following would associate the test to the group Bugs and Version 2.1. These are easily searchable from the generated overview page.

{title="Listing 1: HTML metadata for the Concordion Ant task", lang="html", line-numbers="on"}
~~~~~~~
<head>
    <title>Example 1: Adding a test to multiple groups</title>
    <meta name="group" content="Bugs, Version 2.1"/>
</head>
~~~~~~~


You can also associate tests with their corresponding JIRA in a similar way.

{title="Listing 2: Metadata associating the story with a specific JIRA", lang="html", line-numbers="on"}
~~~~~~~
<head>
    <title>Adding Group Metadata</title>
    <meta name="jira" content="1240"/>
</head>
~~~~~~~

Wiring this up to the build would generate an overview page summarising passing and failing tests and allow you to search and group the tests. For example, you might choose to group your tests by iteration making sign off straight forward.

![](/missing.png)


Another aspect to managing the acceptance tests is having an understanding of what tests have already been written. You potentially don't want to write a brand new test if another is already testing the same area and can just be updated. There's a balance to be had between writing too many acceptance tests and writing fewer tests that exercise too much. Writing your tests in a ports and adapters style means you can be less worried about expensive, long running tests but you can still write too many to effectively manage.

In order to understand what tests have been previously written...

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