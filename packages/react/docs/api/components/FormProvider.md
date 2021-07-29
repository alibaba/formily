---
order: 6
---

# FormProvider

## Description

The entry component is used to place the order context to the field component and is responsible for the communication of the entire form state. It is equivalent to a communication hub.

## Signature

```ts
type FormProvider = React.FC<{
  form: Form // form instance created by createForm
}>
```

Form reference [Form](https://core.formilyjs.org/api/models/form)

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input]} />
  </FormProvider>
)
```
