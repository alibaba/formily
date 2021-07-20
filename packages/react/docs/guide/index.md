# Introduction

The core positioning of @formily/react is to realize a state binding relationship between ViewModel ([@formily/core](//core.formilyjs.org)) and components. It is not responsible for managing form data and form verification. It is only A rendering glue layer, but such a layer of glue is not dirty, it will elegantly decouple a lot of dirty logic and become maintainable.

## Ultra high performance

With the responsive model of [@formily/core](//core.formilyjs.org), @formily/react can obtain super high performance advantages without any optimization, relying on tracking, accurate updates, on-demand rendering, let us The form of really does only need to focus on business logic, without considering performance issues.

## Out of the box

@formily/react provides a series of React components, such as Field/ArrayField/ObjectField/VoidField. When using it, users only need to pass the component property to the Field component (supporting two-way binding conventions such as value/onChange). Quick access to @formily/react, the access cost is extremely low.

## JSON Schema Driver

@formily/react provides protocol-driven components such as SchemaField. It is also driven by the standard JSON-Schema, so that form development can become more dynamic and configurable. What's more, we can achieve a protocol that allows multiple terminals Render the form.

## Scene Reuse

With the help of protocol-driven capabilities, we can abstract a protocol fragment carrying business logic into a scene component to help users develop efficiently in certain scenes, such as scene components such as FormTab and FormStep.

## Smart tips

Because formily is a complete Typescript project, users can develop on VSCode to get the maximum intelligent prompt experience

![img](https://img.alicdn.com/imgextra/i2/O1CN01yiREHk1X95KJPPz1c_!!6000000002880-2-tps-2014-868.png)

## Status observable

Install [FormilyDevtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN) to observe the model status changes in real time and troubleshoot problems

![img](https://img.alicdn.com/imgextra/i4/O1CN01DSci5h1rAGfRafpXw_!!6000000005590-2-tps-2882-1642.png)
