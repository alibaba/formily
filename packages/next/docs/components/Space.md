# Space

> Super convenient Flex layout component, can help users quickly realize the layout of any element side by side next to each other

## Markup Schema example

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Space,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField>
        <SchemaField.Void
          title="name"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Space"
        >
          <SchemaField.String
            name="firstName"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="lastName"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
        </SchemaField.Void>
        <SchemaField.Void
          title="Text concatenation"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Space"
        >
          <SchemaField.String
            name="aa"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: 'Unit',
            }}
            required
          />
          <SchemaField.String
            name="bb"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: 'Unit',
            }}
            required
          />
          <SchemaField.String
            name="cc"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: 'Unit',
            }}
            required
          />
        </SchemaField.Void>
        <SchemaField.String
          name="textarea"
          title="text box"
          x-decorator="FormItem"
          required
          x-component="Input.TextArea"
          x-component-props={{
            style: {
              width: 400,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Space,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'void',
      title: 'Name',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      properties: {
        firstName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        lastName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
      },
    },
    texts: {
      type: 'void',
      title: 'Text concatenation',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      properties: {
        aa: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: 'Unit',
          },
          'x-component': 'Input',
          required: true,
        },
        bb: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: 'Unit',
          },
          'x-component': 'Input',
          required: true,
        },
        cc: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: 'Unit',
          },
          'x-component': 'Input',
          required: true,
        },
      },
    },

    textarea: {
      type: 'string',
      title: 'Text box',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: 400,
        },
      },
      required: true,
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <VoidField
        name="name"
        title="name"
        decorator={[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]}
        component={[Space]}
      >
        <Field
          name="firstName"
          decorator={[FormItem]}
          component={[Input]}
          required
        />
        <Field
          name="lastName"
          decorator={[FormItem]}
          component={[Input]}
          required
        />
      </VoidField>
      <VoidField
        name="texts"
        title="Text concatenation"
        decorator={[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]}
        component={[Space]}
      >
        <Field
          name="aa"
          decorator={[
            FormItem,
            {
              addonAfter: 'Unit',
            },
          ]}
          component={[Input]}
          required
        />
        <Field
          name="bb"
          decorator={[
            FormItem,
            {
              addonAfter: 'Unit',
            },
          ]}
          component={[Input]}
          required
        />
        <Field
          name="cc"
          decorator={[
            FormItem,
            {
              addonAfter: 'Unit',
            },
          ]}
          component={[Input]}
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="text box"
        decorator={[FormItem]}
        component={[
          Input.TextArea,
          {
            style: {
              width: 400,
            },
          },
        ]}
        required
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## API

| Property name | Type                                      | Description     | Default value |
| ------------- | ----------------------------------------- | --------------- | ------------- |
| style         | CSSProperties                             | Style           | -             |
| className     | string                                    | class name      | -             |
| prefix        | string                                    | style prefix    | true          |
| size          | `number \|'small' \|'large' \|'middle'`   | interval size   | 8px           |
| direction     | `'horizontal' \|'vertical'`               | direction       | -             |
| align         | `'start' \|'end' \|'center' \|'baseline'` | align           | `'start'`     |
| wrap          | boolean                                   | Whether to wrap | false         |
