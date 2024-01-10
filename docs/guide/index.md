# Introduction

## Problem

As we all know, the form scene has always been the most complex scene in the front-end and back-end fields. What is the main complexity of it?

- There are a lot of fields, how can the performance not deteriorate with the increase of the number of fields?
- Field association logic is complex, how to implement complex linkage logic more simply? How to ensure that the form performance is not affected when the field is associated with the field?

  - One-to-Many (asynchronous)
  - Many-to-One (asynchronous)
  - Many-to-Many (asynchronous)

- Complex form data management
  - Form value conversion logic is complex (front and back formats are inconsistent)
  - The logic of merging synchronous and asynchronous default values is complicated
  - Cross-form data communication, how to keep the performance from deteriorating with the increase in the number of fields?
- Complex form state management
  - Focusing on the self-incrementing list scenario, how to make the array data move, and the field status can follow the move during the deletion process?
- Scene reuse of forms
  - Query list
  - Dialog/Drawer form
  - Step form
  - Tab form
- Dynamic rendering requirements are very strong
  - Field configuration allows non-professional front-ends to quickly build complex forms
  - Cross-terminal rendering, a JSON Schema, multi-terminal adaptation
  - How to describe the layout in the form protocol?
    - Vertical layout
    - Horizontal layout
    - Grid layout
    - Flexible layout
    - Free layout
  - How to describe the logic in the form protocol?

So many problems, how to solve them, think about it, But we still have to find a solution，Not only to solve but also to solve elegantly, The Alibaba digital supply chain team, after experiencing a lot of middle and back-office practice and exploration, finally precipitated **Formily form solution**. All the problems mentioned above, after going through UForm to Formily1.x, until Formily2.x finally achieved the degree of **elegant solution**. So how does Formily 2.x solve these problems?

## Solution

In order to solve the above problems, we can further refine the problem and come up with a breakthrough direction.

### Accurate Rendering

In the React scenario, to realize a form requirement, most of them use setState to realize field data collection. because form data needs to be collected and some linkage requirements are realized.This implementation is very simple and the mental cost is very low, but it also introduces performance problems, because each input will cause all fields to be rendered in full. Although there is diff at the DOM update level, diff also has a computational cost, which wastes a lot of computational resources. In terms of time complexity, the initial rendering of the form is O(n), and the field input is also O(n), which is obviously unreasonable.

Historical experience is always helpful to mankind. Decades ago, humans created the MVVM design pattern. The core of this design pattern is to abstract the view model and consume it at the DSL template layer.SL uses a certain dependency collection mechanism, and then uniformly schedules in the view model to ensure that each input is accurately rendered. This is the industrial-grade GUI form!

It just so happened that the github community abstracted a state management solution called Mobx for such MVVM models. The core capabilities of [Mobx](https://github.com/mobxjs/mobx) are its dependency tracking mechanism and the abstraction capabilities of responsive models.

Therefore, with the help of Mobx, the O(n) problem in the form field input process can be completely solved, and it can be solved very elegantly. However, during the implementation of Formily 2.x, it was discovered that Mobx still has some problems that are not compatible with Formily's core ideas. In the end, we only can reinvent one wheel,[@formily/reactive](https://reactive.formilyjs.org) which continues the core idea of Mobx.

Mention here [react-hook-form](https://github.com/react-hook-form/react-hook-form) , Very popular, known as the industry’s top performance form solution, let’s take a look at its simplest case:

```tsx pure
import React from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'

function App() {
  const { register, handleSubmit, errors } = useForm() // initialize the hook
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstname" ref={register} /> {/* register an input */}
      <input name="lastname" ref={register({ required: true })} />
      {errors.lastname && 'Last name is required.'}
      <input name="age" ref={register({ pattern: /\d+/ })} />
      {errors.age && 'Please enter number for age.'}
      <input type="submit" />
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Although the value management achieves accurate rendering, when the verification is triggered, the form will still be rendered in full. Because of the update of the errors state, the overall controlled rendering is necessary to achieve synchronization. This is only the full rendering of the verification meeting. In fact, there is linkage. To achieve linkage with react-hook-form, it also requires overall controlled rendering to achieve linkage. Therefore, if you want to truly achieve accurate rendering, it must be Reactive!

### Domain Model

As mentioned in the previous question, the linkage of forms is very complicated, including various relationships between fields. Let’s imagine that most form linkages are basically linkages triggered based on the values of certain fields. However, actual business requirements may be sophisticated. It is not only necessary to trigger linkage based on certain field values, but also based on other side-effect values, such as application status, server data status, page URL, internal data of a UI component of a field, and current Other data status of the field itself, some special asynchronous events, etc. Use a picture to describe:

![image-20210202081316031](//img.alicdn.com/imgextra/i3/O1CN01LWjBSt251w5BtGHW2_!!6000000007467-55-tps-1100-432.svg)

As you can see from the above figure, in order to achieve a linkage relationship, the core is to associate certain state attributes of the field with certain data. Some data here can be external data or own data. For example, the display/hide of a field is associated with certain data, the value of a field is associated with certain data, and the disabling/editing of a field is associated with certain data. Here are three examples. We have actually abstracted it. One of the simplest Field model:

```typescript
interface Field {
  value: any
  visible: boolean
  disabled: boolean
}
```

Of course, does the Field model only have these 3 attributes? Definitely not, if we want to express a field, then the path of the field must have, Because we want to describe the entire form tree structure, at the same time, we also need to manage the properties of the field corresponding to the UI component. For example, Input and Select have their properties. For example, the placeholder of Input is associated with some data, or the drop-down option of Select is associated with some data, so you can understand it. So, our Field model can look like this:

```typescript
interface Field {
  path: string[]
  value: any
  visible: boolean
  disabled: boolean
  component: [Component, ComponentProps]
}
```

We have added the component attribute, which represents the UI component and UI component attribute corresponding to the field, so that the ability to associate certain data with the field component attribute, or even the field component, is realized. Are there any more? Of course, there are also, such as the outer package container of the field, usually we call it FormItem, which is mainly responsible for the interactive style of the field, such as the field title, the style of error prompts, etc., If we want to include more linkage, such as the linkage between certain data and FormItem, then we have to add the outer package container. There are many other attributes, which are not listed here.

From the above ideas, we can see that in order to solve the linkage problem, no matter how abstract we are, the field model will eventually be abstracted. It contains all the states related to the field. As long as these states are manipulated, linkage can be triggered.

Regarding accurate rendering, we have determined that we can choose a Reactive solution similar to Mobx. Although it is a reinvention of a wheel, the Reactive model is still very suitable for abstract responsive models. So based on the ability of Reactive, Formily, after constant trial and error and correction, finally designed a truly elegant form model. Such a form model solves the problem of the form domain, so it is also called a domain model. With such a domain model, we can make the linkage of the form enumerable and predictable, which also lays a solid foundation for the linkage of the protocol description to be discussed later.

### Path System

The field model in the form domain model was mentioned earlier. If the design is more complete, it is not only a field model, but also a form model as the top-level model. The top-level model manages all the field models, and each field has its own Path. How to find these fields? The linkage relationship mentioned earlier is more of a passive dependency, but in some scenarios, we just need to modify the state of a field based on an asynchronous event action. Here is how to find a field elegantly. The same It has also undergone a lot of trial and error and correction. Formily's original path system @formily/path solves this problem very well. It not only makes the field lookup elegant, but it can also deal with the disgusting problem of inconsistent front-end and back-end data structures through destructuring expressions.

### Life Cycle

With the help of Mobx and the path system, we have created a relatively complete form scheme, but after this abstraction, our scheme is like a black box, and the outside world cannot perceive the internal state flow process of the scheme. If you want to implement some logic in a certain process stage, you cannot achieve it. So, here we need another concept, the life cycle. As long as we expose the entire form life cycle as an event hook to the outside world, we can achieve an abstract but flexible form solution.

### Protocol Driven

If you want to implement a dynamically configurable form, you must make the form structure serializable.
There are many ways to serialize, which can be a UI description protocol based on the UI, or a data description protocol based on the data. Because the form itself is to maintain a copy of data, it is natural that for the form scenario, the data protocol is the most suitable. To describe the data structure, [JSON-Schema](https://json-schema.org/) is now the most popular in the industry. Because the JSON Schema protocol itself has many verification-related attributes, this is naturally associated with form verification. Is the UI description protocol really not suitable for describing forms? No, the UI description protocol is suitable for more general UI expressions. Of course, the description form is not a problem, but it will be more front-end protocol. On the contrary, JSON-Schema is expressible at the back-end model layer, and is more versatile in describing data. Therefore, the two protocols have their own strengths, but in the field of pure forms, JSON-Schema will be more domain-oriented.

So, if we choose JSON-Schema, how do we describe the UI and how do we describe the logic? It is not realistic to simply describe the data and output the form pages available for actual business.

The solution of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) is that data is data and UI is UI. The advantage of this is that each protocol is a very pure protocol, but it brings a large maintenance cost and understanding cost.
To develop a form, users need to constantly switch between the two protocols mentally. Therefore, if you look at such a split from a technical perspective, it is very reasonable, but from a product perspective, the split is to throw the cost to the user. Therefore, Formily's form protocol will be more inclined to expand on JSON-Schema.

So, how to expand? In order not to pollute the standard JSON-Schema attributes, we uniformly express the extended attributes in the x-\* format:

```json
{
  "type": "string",
  "title": "String",
  "description": "This is a string",
  "x-component": "Input",
  "x-component-props": {
    "placeholder": "please enter"
  }
}
```

In this way, the UI protocol and the data protocol are mixed together. As long as there is a unified extension agreement, the responsibilities of the two protocols can still be guaranteed to be single.

Then, what if you want to wrap a UI container on certain fields? Here, Formily defines a new schema type called `void`. No stranger to void, there is also void element in W3C specification, and void keyword in js. The former represents virtual elements, and the latter represents virtual pointers. Therefore, in JSON Schema, void is introduced to represent a virtual data node, which means that the node does not occupy the actual data structure. So, we can do this:

```json
{
  "type": "void",
  "title": "card",
  "description": "This is a card",
  "x-component": "Card",
  "properties": {
    "string": {
      "type": "string",
      "title": "String",
      "description": "This is a string",
      "x-component": "Input",
      "x-component-props": {
        "placeholder": "please enter"
      }
    }
  }
}
```

In this way, a UI container can be described. Because the UI container can be described, we can easily encapsulate a scene-based component, such as FormStep. So how do we describe the linkage between fields? For example, one field needs to control the display and hide of another field. We can do this:

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "title": "Source",
      "x-component": "Input",
      "x-component-props": {
        "placeholder": "please enter"
      }
    },
    "target": {
      "type": "string",
      "title": "Target",
      "x-component": "Input",
      "x-component-props": {
        "placeholder": "please enter"
      },
      "x-reactions": [
        {
          "dependencies": ["source"],
          "when": "{{$deps[0] == '123'}}",
          "fulfill": {
            "state": {
              "visible": true
            }
          },
          "otherwise": {
            "state": {
              "visible": false
            }
          }
        }
      ]
    }
  }
}
```

The target field is described with the help of `x-reactions`, which depends on the value of the source field. If the value is `'123'`, the target field is displayed, otherwise it is hidden. This linkage method is a passive linkage. What if we want to achieve active linkage ? It can be like this:

```json
{
  "type": "object",
  "properties": {
    "source": {
      "type": "string",
      "title": "Source",
      "x-component": "Input",
      "x-component-props": {
        "placeholder": "please enter"
      },
      "x-reactions": [
        {
          "when": "{{$self.value == '123'}}",
          "target": "target",
          "fulfill": {
            "state": {
              "visible": true
            }
          },
          "otherwise": {
            "state": {
              "visible": false
            }
          }
        }
      ]
    },
    "target": {
      "type": "string",
      "title": "Target",
      "x-component": "Input",
      "x-component-props": {
        "placeholder": "please enter"
      }
    }
  }
}
```

Just change the location of `x-reactions`, put it on the source field, and then specify a target.

It can be seen that our linkage is actually based on:

- condition
- Condition-satisfied action
- Unsatisfied action

To achieve. Because the internal state management uses the [@formily/reactive](https://reactive.formilyjs.org) solution similar to Mobx, Formily easily realizes passive and active linkage scenarios, covering most business needs.

Therefore, our form can be described by protocol, and it can be configurable no matter how complicated the layout is or the linkage is very complicated.

### Layered Architecture

I talked about the solutions to various problems at the beginning, so how do we design now to make Formily more self-consistent and elegant?

![](https://img.alicdn.com/imgextra/i4/O1CN019qbf1b1ChnTfT9x3X_!!6000000000113-55-tps-1939-1199.svg)

This picture mainly divides Formily into the kernel layer, UI bridge layer, extended component layer, and configuration application layer.

The kernel layer is UI-independent. It ensures that the logic and state of user management are not coupled to any framework. This has several advantages:

- Logic and UI framework are decoupled, and framework-level migration will be done in the future, without extensive refactoring of business code.
- The learning cost is uniform. If the user uses @formily/react, the business will be migrated to @formily/vue in the future, and the user does not need to learn again.

JSON Schema exists independently and is consumed by the UI bridging layer, ensuring the absolute consistency of protocol drivers under different UI frameworks, and there is no need to repeatedly implement protocol parsing logic.

Extend the component layer to provide a series of form scene components to ensure that users can use it out of the box. No need to spend a lot of time for secondary development.

## Competitive Product Comparison

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Table, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const text = (content, tooltips) => {
  if (tooltips) {
    return (
      <div>
        {content}
        <Tooltip title={tooltips}>
          <QuestionCircleOutlined style={{ marginLeft: 3 }} />
        </Tooltip>
      </div>
    )
  }
  return content
}

const dataSource = [
  {
    feature: 'Custom component access cost',
    antd: '4.x low access cost',
    fusion: 'high',
    formik: 'low',
    finalForm: 'low',
    schemaForm: text('high', 'Because of coupling bootstrap'),
    hookForm: text('high', 'Because of coupling React Ref'),
    'formily1.x': 'low',
    'formily2.x': 'low',
  },
  {
    feature: 'performance',
    antd: text(
      '4.x performance is better',
      'Only solved the value synchronization and accurate rendering'
    ),
    fusion: 'bad',
    formik: 'bad',
    finalForm: text(
      'better',
      'But only solved the value synchronization and accurate rendering'
    ),
    schemaForm: 'bad',
    hookForm: text(
      'good',
      'But only solved the value synchronization and accurate rendering'
    ),
    'formily1.x': text(
      'excellent',
      'Can solve the precise rendering in the linkage process'
    ),
    'formily2.x': text(
      'excellent',
      'Can solve the precise rendering in the linkage process'
    ),
  },
  {
    feature: 'Whether to support dynamic rendering',
    antd: 'no',
    fusion: 'no',
    formik: 'no',
    finalForm: 'no',
    schemaForm: 'yes',
    hookForm: 'no',
    'formily1.x': 'yes',
    'formily2.x': 'yes',
  },
  {
    feature: 'Whether to use out of the box',
    antd: 'yes',
    fusion: 'yes',
    formik: 'no',
    finalForm: 'no',
    schemaForm: 'yes',
    hookForm: 'no',
    'formily1.x': 'yes',
    'formily2.x': 'yes',
  },
  {
    feature: 'Whether to support cross-terminal',
    antd: 'no',
    fusion: 'no',
    formik: 'no',
    finalForm: 'no',
    schemaForm: 'no',
    hookForm: 'no',
    'formily1.x': 'yes',
    'formily2.x': 'yes',
  },
  {
    feature: 'Development efficiency',
    antd: 'general',
    fusion: 'generalv',
    formik: 'general',
    finalForm: 'general',
    schemaForm: text(
      'low',
      'Source code development requires manual maintenance of JSON'
    ),
    hookForm: 'general',
    'formily1.x': 'high',
    'formily2.x': 'high',
  },
  {
    feature: 'Learning cost',
    antd: 'easy',
    fusion: 'easy',
    formik: 'easy',
    finalForm: 'hard',
    schemaForm: 'hard',
    hookForm: 'easy',
    'formily1.x': 'very hard',
    'formily2.x': text('hard', 'The concept is drastically reduced'),
  },
  {
    feature: 'View code maintainability',
    antd: text('bad', 'Lots of conditional expressions'),
    fusion: text('bad', 'Lots of conditional expressions'),
    formik: text('bad', 'Lots of conditional expressions'),
    finalForm: text('bad', 'Lots of conditional expressions'),
    schemaForm: 'good',
    hookForm: text('bad', 'Lots of conditional expressions'),
    'formily1.x': 'good',
    'formily2.x': 'good',
  },
  {
    feature: 'Scenario-based packaging capabilities',
    antd: 'no',
    fusion: 'no',
    formik: 'no',
    finalForm: 'no',
    schemaForm: 'yes',
    hookForm: 'no',
    'formily1.x': 'yes',
    'formily2.x': 'yes',
  },
  {
    feature: 'Whether to support form preview',
    antd: 'no',
    fusion: 'yes',
    formik: 'no',
    finalForm: 'no',
    schemaForm: 'no',
    hookForm: 'no',
    'formily1.x': 'yes',
    'formily2.x': 'yes',
  },
]

export default () => {
  return (
    <Table
      dataSource={dataSource}
      pagination={false}
      bordered
      scroll={{ x: 1600 }}
      size="small"
    >
      <Table.Column title="ability" dataIndex="feature" width={160} />
      <Table.Column title="Ant Design Form" dataIndex="antd" width={160} />
      <Table.Column title="Fusion Form" dataIndex="fusion" width={160} />
      <Table.Column title="Formik" dataIndex="formik" width={160} />
      <Table.Column
        title="React Final Form"
        dataIndex="finalForm"
        width={160}
      />
      <Table.Column
        title="React Schema Form"
        dataIndex="schemaForm"
        width={160}
      />
      <Table.Column title="React Hook Form" dataIndex="hookForm" width={160} />
      <Table.Column title="Formily1.x" dataIndex="formily1.x" width={160} />
      <Table.Column title="Formily2.x" dataIndex="formily2.x" width={160} />
    </Table>
  )
}
```

## Core Advantages

- high performance
- Out of the box
- Linkage logic to achieve high efficiencyv
- Cross-terminal capability, logic can be cross-frame, cross-terminal reuse
- Dynamic rendering capability

## Core Disadvantage

- The learning cost is relatively high. Although 2.x has already converged a large number of concepts, there is still a certain learning cost.

## Who is using it?

- Alibaba
- Tencent
- ByteDance

## Q/A

Q: Now that I have Vue, why do I still need to provide @formily/vue?

Answer: Vue is a UI framework. The problem it solves is a wider range of UI problems. Although its reactive ability is outstanding in form scenarios, at least it is more convenient than native React to write forms, but if it is in more complex form scenarios , We still need to do a lot of abstraction and encapsulation, so @formily/vue is to help you do these abstract encapsulation things, really let you develop super-complex form applications efficiently and conveniently.

Q: What is the biggest advantage of Formily2.x compared to 1.x?

Answer: The cost of learning, yes, the core is to allow users to understand Formily more quickly. We have tried our best to avoid all kinds of obscure logic and boundary problems during the 2.x design process.

Q: What is the browser compatibility of Formily 2.x?

Answer: IE is not supported, because the implementation of Reactive strongly relies on Proxy.
