# Quick Start

## Install Dependencies

### Install the Core Library

To use Formily, you must use [@formily/core](https://core.formilyjs.org), which is responsible for managing the status of the form, form verification, linkage, and so on.

```bash
$ npm install --save @formily/core
```

### Install UI Bridge Library

The kernel alone is not enough. We also need a UI library to access kernel data to achieve the final form interaction effect. For users of different frameworks, we have different bridge libraries.

**React users**

```bash
$ npm install --save @formily/react
```

**Vue users**

```bash
$ npm install --save @formily/vue
```

### Install component library

To quickly implement beautiful forms, we usually need to use industry-leading component libraries, such as [Ant Design](https://ant.design) and [Alibaba Fusion](https://fusion.design). However, these excellent component libraries are not fully covered in some scenes of the form. For example, the detailed preview state is not supported by Ant Design, and some scene-based components are not supported, so Formily is in On top of this, @formily/antd and @formily/next are encapsulated to ensure that users can use it out of the box.

**Ant Design users**

```bash
$ npm install --save antd moment @formily/antd
```

**Alibaba Fusion users**

```bash
$ npm install --save @alifd/next moment @formily/next
```

## Import Dependencies

Use ES Module import syntax to import dependencies

```ts
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { FormItem, Input } from '@formily/antd'
```

## Exmaple

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/antd'

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <Field
          name="input"
          title="Input box"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input]}
        />
      </FormLayout>
      <FormConsumer>
        {() => (
          <div
            style={{
              marginBottom: 20,
              padding: 5,
              border: '1px dashed #666',
            }}
          >
            Real-time response：{form.values.input}
          </div>
        )}
      </FormConsumer>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

From the above examples, we can learn a lot:

- [createForm](https://core.formilyjs.org/api/entry/create-form) is used to create the core domain model of the form, which is the standard ViewModel as the [MVVM](https://core.formilyjs.org/guide/mvvm) design pattern.
- The [FormProvider](https://react.formilyjs.org/api/components/form-provider) component is used as the entrance to the view layer bridge form model. It has only one parameter, which is to receive the Form instance created by createForm and pass the Form instance to the child component in the form of context.
- The [FormLayout](https://antd.formilyjs.org/components/form-layout) component is a component used to control the style of [FormItem](https://antd.formilyjs.org/components/form-item) in batches. Here we specify the layout as top and bottom layout, that is, the label is on the top and the component is on the bottom.
- The [Field](https://react.formilyjs.org/api/components/field) component is a component used to undertake common fields.
  - The name attribute identifies the path of the field in the final submitted data of the form.
  - Title attribute, which identifies the title of the field
    - If the decorator is specified as FormItem, then the title attribute will be received as the label by default in the FormItem component.
    - If specified as a custom component, the consumer of the title will be taken over by the custom component.
    - If decorator is not specified, then the title will not be displayed on the UI.
  - Required attribute, a shorthand for required verification, which identifies that the field is required
    - If the decorator is specified as FormItem, then an asterisk prompt will automatically appear, and there will be corresponding status feedback if the verification fails. These are the default processing done inside the FormItem.
    - If the decorator is specified as a custom component, the corresponding UI style needs to be implemented by the custom component implementer.
    - If decorator is not specified, then required will just block submission, and there will be no UI feedback for verification failure.
  - InitialValue property, which represents the default value of the field
  - Decorator attribute, representing the UI decorator of the field, usually we will specify it as FormItem
    - Note that the decorator attribute is passed in the form of an array, the first parameter represents the specified component type, and the second parameter represents the specified component attribute.
  - The component attribute, which represents the input control of the field, can be Input or Select, etc.
    - Note that the component property is passed in the form of an array, the first parameter represents the specified component type, and the second parameter represents the specified component property.
- The [FormConsumer](https://react.formilyjs.org/api/components/form-consumer) component exists as a responder of a responsive model. Its core is a render props mode. In the callback function as children, all dependencies are automatically collected. If the dependencies change, it will be re-rendered. With the help of FormConsumer, we can Conveniently realize the needs of various calculations and summaries.
- The [FormButtonGroup](https://antd.formilyjs.org/components/form-button-group) component exists as a form button group container and is mainly responsible for the layout of the buttons.
- The [Submit](https://antd.formilyjs.org/components/submit) component exists as an action trigger for form submission. In fact, we can also directly use the form.submit method to submit. But the advantage of using Submit is that there is no need to write the onClick event handler on the Button component every time, and it also handles the loading state of the Form. If the onSubmit method returns a Promise and the Promise is pending, the button will automatically enter the loading state.
