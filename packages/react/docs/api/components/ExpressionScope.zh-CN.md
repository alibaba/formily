---
order: 8
---

# ExpressionScope

## 描述

用于自定义组件内部给 json-schema 表达式传递局部作用域

## 签名

```ts
interface IExpressionScopeProps {
  value?: any
}
type ExpressionScope = React.FC<IExpressionScopeProps>
```

## 用例

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
