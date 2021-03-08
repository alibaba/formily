# @formily/reactive

> Web Reactive Library Like Mobx

## QuikStart

```tsx
import React from 'react'
import { createForm, onFieldChange } from '@formily/core'

const attach = <T extends { onMount: () => void }>(target: T): T => {
  target.onMount()
  return target
}

const form = attach(createForm({}))
const field = attach(
  form.createField({
    name: 'aa',
    required: true,
  })
)
field.onInput('').then(() => {
  console.log(field.value, field.errors)
})

export default () => (
  <button
    onClick={() => {
      field.onInput('123').then(() => {
        console.log(field.value, field.errors)
      })
    }}
  >
    click
  </button>
)
```
