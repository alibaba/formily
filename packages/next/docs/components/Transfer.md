# Transfer

> Shuttle Box

## Markup Schema example

```tsx
import React from 'react'
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/next'
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
          { label: 'Option 1', value: 'aaa' },
          { label: 'Option 2', value: 'bbb' },
        ]}
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
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/next'
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
        { label: 'Option 1', value: 'aaa' },
        { label: 'Option 2', value: 'bbb' },
      ],
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
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="transfer"
      title="shuttle box"
      dataSource={[
        { label: 'Option 1', value: 'aaa' },
        { label: 'Option 2', value: 'bbb' },
      ]}
      decorator={[FormItem]}
      component={[Transfer]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://fusion.design/pc/component/basic/transfer
