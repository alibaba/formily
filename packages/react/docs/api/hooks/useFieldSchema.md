# useFieldSchema

## 描述

主要在自定义组件中读取当前字段的 Schema 信息，该 hook 只能用在 SchemaField 或者 RecursionField 的子树中使用

## 签名

```ts
interface useFieldSchema {
  (): Schema
}
```

Schema 参考[Schema](/api/shared/schema)

## 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, useFieldSchema } from '@formily/react'

const form = createForm()

const Custom = () => {
  const schema = useFieldSchema()
  return (
    <code>
      <pre>{JSON.stringify(schema.toJSON(), null, 2)}</pre>
    </code>
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Object
        name="custom"
        x-component="Custom"
        x-component-props={{
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Custom',
              },
            },
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```
