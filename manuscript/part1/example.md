# Examples

W> ## This section is not yet finished
W>
W> This section is not yet finished. It's a work in progress, a lean publishing effort. I try not to publish anything that's too sketchy but expect missing parts to the narrative.
W>
W> Help set the direction, get involved and make suggestions via the [Leanpub page](https://leanpub.com/essential_acceptance_testing).
W>

## Retail website

### Pick a story

From Amazon's early backlog;

> "Users should be able see total prices for their basket."

![First pass at defining the story](images/story_1.png)

Perhaps "story" is too grand a title but requirements will often start life vague like this. Our first job is to add some specificity. In discussion with the business owner, developers and testers, focus on expanding the description to make any implications, explicit. This helps make scope more concrete.

> "As an Amazon customer, when I visit the checkout area, I would like to review the items in my shopping basket along with a total price and delivery cost, so that I know how much I will be spending if I go on to purchase the items."

![Second attempt at defining the story](images/story_2.png)

I find forcing myself to use the phrase "so that" helps me think about the context of the story. Why is it needed? What is the user hoping to achieve? I find this can help me tease out additional requirements that would otherwise go inferred.

On the back of the card, we might capture some early thoughts about acceptance criteria, questions, general comments and scope.

![The back of the index card captures some additional thoughts](images/story_3.png)

D> ## Story scope {#story-scope-aside}
D> It's important to think about what's **not** in scope as well as what is. It's another way to constrain the development so things don't run away form you. Listing these may prompt the creation of new stories. The back of the card is a great place to put things down that are definitely not going to be delivered.
D> It's important to think about what's **not** in scope as well as what is. It's another way to constrain the development so things don't run away form you. Listing these may prompt the creation of new stories. The back of the card is a great place to put things down that are definitely not going to be delivered.


We're starting to think about example scenarios and their outcome.


A useful way to rephrase a story is in the BDD-style of _given_, _when_, _then_. This can help focus on important aspects but takes practice and careful consideration to be useful. It's all too easy to skip the hard questions. Forcing yourself to think about them can tease out additional facets which you may have missed. Remember though that BDD is just another tool and it's not always appropriate. It's not the goal unto itself so don't shoe horn it if it's not going to fit.

D> ## Badly worded stories {#badly-worded-stories-aside}
D> It's usually a bad idea to talk about specific UI components in stories. "When a user navigates to the front page, enters their name and click's the 'submit' button..." would read better as "When a user attempts to enter their name and login so that...". It focuses the team at a business context and avoids the volatile details. For example, why must the user _click_? They may _tap_ on an iPad. It may also encourage developer's to implement the tests to mimic the wording which can lead to coupling at the test infrastructure level and inflexible test design.


### Agree acceptance criteria

This step is about committing acceptance criteria to some electronic form and agreeing with everyone it expresses the expectations and is in a form that is conducive to turning into an executable artifact. This is where you'd write your HTML document, Wiki page or failing test using your favorite nUnit framework.

### Develop functionality

### Demonstrate and sign off



## Financial Application
