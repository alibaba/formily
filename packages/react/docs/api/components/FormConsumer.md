---
order: 7
---

# FormConsumer

## Description

The form response consumer is specifically used to monitor the data changes of the form model to implement various UI response components. The use method is render props.

When the dependent data in the callback function changes, the callback function will be re-rendered

## Signature

```ts
type FormConsumer = React.FC<{ children: (form: Form) => React.ReactNode }>
```

Form reference [Form](https://core.formilyjs.org/api/models/form)

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input]} />
    <FormConsumer>{(form) => form.values.input}</FormConsumer>
  </FormProvider>
)
```
