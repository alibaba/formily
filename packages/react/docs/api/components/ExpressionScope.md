---
order: 8
---

# ExpressionScope

## Description

Used to pass local scopes to json-schema expressions inside custom components

## Signature

```ts
interface IExpressionScopeProps {
  value?: any
}
type ExpressionScope = React.FC<React.PropsWithChildren<IExpressionScopeProps>>
```

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  ExpressionScope,
} from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const Container = (props) => {
  return (
    <ExpressionScope value={{ $innerScope: 'this inner scope value' }}>
      {props.children}
    </ExpressionScope>
  )
}

const SchemaField = createSchemaField({
  components: {
    Container,
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Void x-component="Container">
        <SchemaField.String
          name="input"
          x-component="Input"
          x-value="{{$innerScope}}"
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
)
```
