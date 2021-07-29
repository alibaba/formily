# Transfer

> Shuttle Box

## Markup Schema example

```tsx
import React from 'react'
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Transfer,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array
        name="transfer"
        title="shuttle box"
        x-decorator="FormItem"
        x-component="Transfer"
        enum={[
          { title: 'Option 1', key: 1 },
          { title: 'Option 2', key: 2 },
        ]}
        x-component-props={{
          render: (item) => item.title,
        }}
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
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Transfer,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: 'shuttle box',
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
      enum: [
        { title: 'Option 1', key: 1 },
        { title: 'Option 2', key: 2 },
      ],
      'x-component-props': {
        render: '{{renderTitle}}',
      },
    },
  },
}

const renderTitle = (item) => item.title

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} scope={{ renderTitle }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="transfer"
      title="shuttle box"
      dataSource={[
        { title: 'Option 1', key: 1 },
        { title: 'Option 2', key: 2 },
      ]}
      decorator={[FormItem]}
      component={[
        Transfer,
        {
          render: (item) => item.title,
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://ant.design/components/transfer-cn/
