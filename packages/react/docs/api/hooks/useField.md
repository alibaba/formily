# useField

## Description

Mainly used in custom components to read current field properties, manipulate field status, etc. It can be used in the subtree of all Field components. Note that the one you get is [GeneralField](https://core.formilyjs.org/ api/models/field#generalfield), if you need to process different types of fields, please use [Type Checker](https://core.formilyjs.org/api/entry/form-checker)

<Alert>
Note: If you want to use useField in a custom component and respond to changes in the field model, you need to wrap the observer for the custom component
</Alert>

## Signature

```ts
interface useField {
  (): Field
}
```

## Example

```tsx
import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer,
} from '@formily/react'
import { Input, Form, Button } from 'antd'

// FormItem UI component
const FormItem = observer(({ children }) => {
  const field = useField()
  return (
    <Form.Item
      label={field.title}
      help={field.selfErrors?.length ? field.selfErrors : undefined}
      extra={field.description}
      validateStatus={field.validateStatus}
    >
      {children}
    </Form.Item>
  )
})

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
        <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
        <Button
          type="primary"
          onClick={() => {
            form.submit(console.log)
          }}
        >
          Submit
        </Button>
      </Form>
    </FormProvider>
  )
}
```
