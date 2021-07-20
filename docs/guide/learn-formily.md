# How to learn Formily

## Study Suggestion

To describe Formily in one sentence, it is an MVVM form solution that abstracts the form domain model. Therefore, if you want to use Formily in depth, you must learn and understand what Formily's domain model is like and what problems does it solve. After understanding the domain model, it is actually how to consume the view layer of this domain model. This layer only needs to look at the documentation of the specific components.

## About the documentation

Because Formily’s learning costs are still relatively high, if you want to quickly understand the full picture of Formily, the most important thing is to read the documentation. It's just how to look at the document and where it will be more important. Below we give different document learning routes for different users.

### Entry-level user

- Introduction, because you need to understand Formily's core ideas and whether it is suitable for your business scenario.
- Quick start, learn how to use Formily in practice from the simplest example.
- Component documentation/core library documentation, because Formily has already encapsulated most of the out-of-the-box components for you. If you encounter component-related problems, you can just check the component documentation just like looking up a dictionary.
- Scenario case, starting from the specific scenario, see what is the best practice in this scenario.

### Advanced users

- Digest the core concepts carefully and have a deeper understanding of Formily.
- Advanced guide, mainly to learn more advanced usage methods, such as custom components, from simple custom components to super complex custom components.
- Read component documents/core library documents at any time to deepen memory
- For the details and best practices of custom component development, it is recommended to look directly at the source code of @formily/antd or @formily/next, because this is the boilerplate code and is closely related to the actual business scenario.

### Source code co-builder

- Contribution guide, understand the most basic contribution posture.
- Read the document, if you find that the document is defective, you can submit a PR to fix it.
- Read the unit test to understand the implementation details corresponding to each test case. If you find that there are missing test cases, you can submit a PR.
- Read the source code, if you find a bug in the source code, you can raise a PR.

<Alert type="error">
Pay attention to modify the source code, you must bring unit tests
</Alert>

## About the question

If you encounter problems during the development process, it is recommended to use the search function at the top of the document to quickly search for the content of the document and solve it quickly. If you can’t find it, I recommend you to ask questions in the [forum](https://github.com/alibaba/formily/discussions). It is convenient to record. If you encounter a very urgent problem, you can help solve it in the Dingding group @白玄. **It is not recommended to ask various basic questions directly without reading the document, which is very inefficient**

## About the bug

If you find behaviors that do not meet expectations during the development process and can be reproduced in the smallest case, you can submit an [issue](https://github.com/alibaba/formily/issues) to Formily
It is strongly not recommended to record the problem in the issue, which will disrupt the information flow of Issue. At the same time, **be sure to bring the smallest reproducible link address when mentioning Issue**, so that developers can quickly locate the problem and fix it quickly, instead of Find bugs in a bunch of codes.

## About Feature Request

If during the development process you find that some of Formily's designs are not good, or can be improved better, you can submit your own ideas in the [forum](https://github.com/alibaba/formily/discussions)
