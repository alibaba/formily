# Core Architecture

## Domain Model

Formily's kernel architecture is very complicated, because it is necessary to solve a domain-level problem, rather than a single point of specific problem, first go to the architecture diagram:

![](https://img.alicdn.com/imgextra/i4/O1CN01HlrsLS1hQAJnihhh1_!!6000000004271-55-tps-2431-2037.svg)

## Description

From the above figure, we can see that the Formily kernel is actually a @formily/reactive domain model.

The actual consumption domain model mainly relies on the @formily/reactive responder mechanism for dependency tracking to consume.

We can consume any attribute in the Form/Field/ArrayField/ObjectField/VoidField model in the responder (Reactions). When the dependent attribute changes, the responder will execute repeatedly.

So as to realize the Reactive programming model at the form level.
