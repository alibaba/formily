# useExpressionScope

## 描述

主要在自定义组件中读取表达式作用域，表达式作用域的来源主要有：

- createSchemaField 顶层下发
- SchemaField 组件属性下发
- ExpressionScope/RecordScope/RecordsScope 自定义组件内部下发

## 签名

```ts
interface useExpressionScope {
  (): any
}
```

## 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  useExpressionScope,
  RecordScope,
} from '@formily/react'

const form = createForm()

const Custom = () => {
  const scope = useExpressionScope()
  return (
    <code>
      <pre>{JSON.stringify(scope, null, 2)}</pre>
    </code>
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
  },
  scope: {
    topScope: {
      aa: 123,
    },
  },
})

export default () => (
  <FormProvider form={form}>
    <RecordScope
      getRecord={() => ({ name: 'Record Name', code: 'Record Code' })}
      getIndex={() => 2}
    >
      <SchemaField scope={{ propsScope: { bb: 321 } }}>
        <SchemaField.String name="custom" x-component="Custom" />
      </SchemaField>
    </RecordScope>
  </FormProvider>
)
```
