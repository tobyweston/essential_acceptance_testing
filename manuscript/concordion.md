
You might be used to the term test fixture relating to fixing test _data_. This definition comes from the physical engineering world where some apparatus is needed to physically _fix_ the subject of a test to be able to get consistent results. For example, the rig you've seen at Ikea that simulates a person sitting on a chair 10,000 times. Related to software, _fixing_ the data set and environment makes sense. Typically, in unit testing frameworks like JUnit and NUnit, the test fixture is a physical class that's run by the framework and forms the test's context during execution. For example, something that runs with a `BlockJUnit4ClassRunner` like a class containing `@Test` methods.

Fit 

In Yatspec, anything 

A fixture in Concordion has slightly different semantics.

I tend to think of a fixture as fixing the data _and_ scenarios. 