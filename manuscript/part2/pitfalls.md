# Common pitfalls

W> ## This section is not yet finished
W>
W> This section is not yet finished. It's a work in progress, a lean publishing effort. I try not to publish anything that's too sketchy but bear with me.
W>
W> Help set the direction, get involved and make suggestions via the [Leanpub page](https://leanpub.com/essential_acceptance_testing).
W>


## Features hit production that the customer didn't want

(collective understanding)



## Users describe solutions not problems

(technical over exposure)

Need to deconstruct.

An alternative is to drive out specifications on production. If you can deliver features quickly and cheaply enough, you can iterate against production until done. You could even try multiple implementations at the same time. This does imply you need a concrete measure of success.

Defining a specification upfront, albeit iteratively is still a form of big upfront design. It's an improvement over traditional waterfall big up front design.

The only real acceptance criteria is "is it making money?".



## Users can't tell how the system is supposed to behave

(shared memory)



## Users can't tell if feature x is already implemented



## Tests repeat steps from other tests as part of their scenario



## The acceptance test suite takes forever to run



## Intermittent failures in tests

Randomness / flickering behaviour.

