# Submit

> Submit button

## Ordinary submission

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="input box"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="input box"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Prevent Duplicate Submission (Loading)

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="input box"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="input box"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit
        onSubmit={(values) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log(values)
              resolve()
            }, 2000)
          })
        }}
        onSubmitFailed={console.log}
      >
        submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

For button-related API properties, we can refer to https://ant.design/components/button-cn/, and the rest are the unique API properties of the Submit component

| Property name   | Type                                                                                             | Description                                               | Default value |
| --------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------------- |
| onClick         | `(event: MouseEvent) => void \| boolean`                                                         | Click event, if it returns false, it can block submission | -             |
| onSubmit        | `(values: any) => Promise<any> \| any`                                                           | Submit event callback                                     | -             |
| onSubmitSuccess | (payload: any) => void                                                                           | Submit successful response event                          | -             |
| onSubmitFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | Submit verification failure event callback                | -             |
