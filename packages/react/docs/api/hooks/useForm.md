# useForm

## Description

Mainly read the current [Form](https://core.formilyjs.org/api/models/form) instance in the custom component to implement some side-effect dependencies, such as relying on the errors information of the Form, for Implement some more complex scenario-based components

## Signature

```ts
interface useForm {
  (): Form
}
```

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm, observer } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const Custom = observer(() => {
  const form = useForm()
  return <div>{form.values.input}</div>
})

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input]} />
    <Field name="custom" component={[Custom]} />
  </FormProvider>
)
```
