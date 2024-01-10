---
order: 10
---

# RecordsScope

## 描述

标准作用域注入组件，用于注入以下内置变量：

- `$records` 当前记录列表数据

## 签名

```ts
interface IRecordsScopeProps {
  getRecords(): any[]
}

type RecordsScope = React.FC<React.PropsWithChildren<IRecordsScopeProps>>
```

## 使用约定

任何自增列表扩展组件，内部都应该使用 RecordsScope，用于传递记录作用域变量，目前已实现该约定的组件包括：
@formily/antd 和 @formily/next 中的 ArrayX 系列的所有组件

## 自定义组件扩展用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecordsScope } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const MyCustomComponent = (props) => {
  return (
    <RecordsScope getRecords={() => props.records}>
      {props.children}
    </RecordsScope>
  )
}

const SchemaField = createSchemaField({
  components: {
    Input,
    MyCustomComponent,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      schema={{
        type: 'object',
        properties: {
          records: {
            type: 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              records: [
                {
                  name: 'Name',
                  code: 'Code',
                },
              ],
            },
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
                'x-value':
                  '{{`' +
                  '${$records[0].name} ' +
                  '${$records[0].code} ' +
                  '`}}',
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
