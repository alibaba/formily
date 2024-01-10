# Checkbox

> Checkbox

## Markup Schema example

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Boolean
        name="single"
        title="Are you sure"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaField.String
        name="multiple"
        title="Check"
        enum={[
          {
            label: 'Option 1',
            value: 1,
          },
          {
            label: 'Option 2',
            value: 2,
          },
        ]}
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    single: {
      type: 'boolean',
      title: 'Are you sure?',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
    },
    multiple: {
      type: 'array',
      title: 'Check',
      enum: [
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="single"
      title="Are you sure"
      decorator={[FormItem]}
      component={[Checkbox]}
    />
    <Field
      name="multiple"
      title="Check"
      dataSource={[
        {
          label: 'Option 1',
          value: 1,
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ]}
      decorator={[FormItem]}
      component={[Checkbox.Group]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://ant.design/components/checkbox-cn/
