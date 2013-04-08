-# Part 3 - Specification testing frameworks {#part3}

Part 3 discusses Java specification testing frameworks such as Concordion, Yatspec and Fit.

[Concordion](http://www.concordion.org) is a Java framework but has been ported to most popular languages including .NET (Concordion.NET). It's emphasis on separation of test specification from implementation makes it an ideal fit for natural language specification techniques such as Behavioural Driven Design (BDD). Because of its flexible nature it also offers several benefits over older frameworks such as FIT and FITnesse.

[Yatspec](https://code.google.com/p/yatspec/) is "yet another specification testing framework" that focuses on user readable documentation. Rather than create specification artifacts upfront (for example in HTML), it parses the source code to create the documentation directly based on source code conventions.

[Fit](http://fit.c2.com/) (Framework for Integrated Test) was probably the original framework built around 2002. It's essentially unmaintained now but has been influential in the area of user viewable testing. It has a heavy focus on instrumenting HTML table and cell structures and so if often criticised for influencing how tests are written to the detriment of readability.



