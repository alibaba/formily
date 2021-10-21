# FormLayout

> Block-level layout batch control component, with the help of this component, we can easily control the layout mode of all FormItem components enclosed by FormLayout

## Markup Schema example

```tsx
import React from 'react'
import { Input, Select, FormItem, FormLayout } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{
          labelCol: 6,
          wrapperCol: 10,
        }}
      >
        <SchemaField.String
          name="input"
          title="input box"
          x-decorator="FormItem"
          x-decorator-props={{
            tooltip: <div>123</div>,
          }}
          x-component="Input"
          required
        />
        <SchemaField.String
          name="select"
          title="select box"
          x-decorator="FormItem"
          x-component="Select"
          required
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import { Input, Select, FormItem, FormLayout } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
})

const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 6,
        wrapperCol: 10,
        layout: 'vertical',
      },
      properties: {
        input: {
          type: 'string',
          title: 'input box',
          required: true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: <div>123</div>,
          },
          'x-component': 'Input',
        },
        select: {
          type: 'string',
          title: 'Select box',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
      },
    },
  },
}

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import {
  Input,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={10}>
      <Field
        name="input"
        required
        title="input box"
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="select"
        required
        title="select box"
        decorator={[FormItem]}
        component={[Select]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## API

| Property name  | Type                                                                                   | Description                           | Default value |
| -------------- | -------------------------------------------------------------------------------------- | ------------------------------------- | ------------- |
| style          | CSSProperties                                                                          | Style                                 | -             |
| className      | string                                                                                 | class name                            | -             |
| colon          | boolean                                                                                | Is there a colon                      | true          |
| labelAlign     | `'right' \| 'left' \| ('right' \| 'left')[]`                                           | Label content alignment               | -             |
| wrapperAlign   | `'right' \| 'left' \| ('right' \| 'left')[]`                                           | Component container content alignment | -             |
| labelWrap      | boolean                                                                                | Wrap label content                    | false         |
| labelWidth     | number                                                                                 | Label width (px)                      | -             |
| wrapperWidth   | number                                                                                 | Component container width (px)        | -             |
| wrapperWrap    | boolean                                                                                | Component container wrap              | false         |
| labelCol       | `number \| number[]`                                                                   | Label width (24 column)               | -             |
| wrapperCol     | `number \| number[]`                                                                   | Component container width (24 column) | -             |
| fullness       | boolean                                                                                | Component container width 100%        | false         |
| size           | `'small' \|'default' \|'large'`                                                        | component size                        | default       |
| layout         | `'vertical' \| 'horizontal' \| 'inline' \| ('vertical' \| 'horizontal' \| 'inline')[]` | layout mode                           | horizontal    |
| direction      | `'rtl' \|'ltr'`                                                                        | direction (not supported yet)         | ltr           |
| inset          | boolean                                                                                | Inline layout                         | false         |
| shallow        | boolean                                                                                | shallow context transfer              | true          |
| feedbackLayout | `'loose' \|'terse' \|'popover' \|'none'`                                               | feedback layout                       | true          |
| tooltipLayout  | `"icon" \| "text"`                                                                     | Ask the prompt layout                 | `"icon"`      |
| tooltipIcon    | ReactNode                                                                              | Ask the prompt icon                   | -             |
| bordered       | boolean                                                                                | Is there a border                     | true          |
| breakpoints    | number[]                                                                               | Container size breakpoints            | -             |
| gridColumnGap  | number                                                                                 | Grid Column Gap                       | 8             |
| gridRowGap     | number                                                                                 | Grid Row Gap                          | 4             |
| spaceGap       | number                                                                                 | Space Gap                             | 8             |
