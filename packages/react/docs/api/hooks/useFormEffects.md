# useFormEffects

## Description

Mainly inject side-effect logic into the current [Form](https://core.formilyjs.org/api/models/form) instance in the custom component to implement some more complex scenario-based components

<Alert>
Note: It is invalid to monitor onFormInit in the effects function, because the Form has already been initialized when rendering to the current component, and the effects function will only be executed once, so if you want to rely on the data of useState, please use the reference data of useRef.
</Alert>

## Signature

```ts
interface useFormEffects {
  (form: Form): void
}
```

## Example

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { FormProvider, Field, useFormEffects } from '@formily/react'
import { Input, Form } from 'antd'

const form = createForm({
  effects() {
    onFieldReact('custom.aa', (field) => {
      field.value = field.query('input').get('value')
    })
  },
})

const Custom = () => {
  useFormEffects(() => {
    onFieldReact('custom.bb', (field) => {
      field.value = field.query('.aa').get('value')
    })
  })
  return (
    <div>
      <Field name="aa" decorator={[Form.Item]} component={[Input]} />
      <Field name="bb" decorator={[Form.Item]} component={[Input]} />
    </div>
  )
}

export default () => (
  <FormProvider form={form}>
    <Field name="input" decorator={[Form.Item]} component={[Input]} />
    <Field name="custom" decorator={[Form.Item]} component={[Custom]} />
  </FormProvider>
)
```
