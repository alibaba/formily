---
order: 9
---

# RecordScope

## 描述

标准作用域注入组件，用于注入以下内置变量：

- `$record` 当前记录数据
- `$record.$lookup` 当前记录的父级记录，可以一直往上查找
- `$record.$index` 当前记录的索引
- `$index` 当前记录索引，等同于`$record.$index`，考虑到记录数据如果不是对象，则需要独立读取
- `$lookup` 当前记录的父级记录，等同于`$record.$lookup`，考虑到记录数据如果不是对象，则需要独立读取

## 签名

```ts
interface IRecordScopeProps {
  getRecord(): any
  getIndex?(): number
}

type RecordScope = React.FC<React.PropsWithChildren<IRecordScopeProps>>
```

## 使用约定

任何自增列表扩展组件，内部都应该使用 RecordScope，用于传递记录作用域变量，目前已实现该约定的组件包括：
@formily/antd 和 @formily/next 中的 ArrayX 系列的所有组件

## 自定义组件扩展用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecordScope } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const MyCustomComponent = (props) => {
  return (
    <RecordScope getRecord={() => props.record} getIndex={() => props.index}>
      {props.children}
    </RecordScope>
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
          lookup: {
            type: 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              record: {
                name: 'Lookup Name',
                code: 'Lookup Code',
              },
              index: 1,
            },
            properties: {
              record: {
                type: 'void',
                'x-component': 'MyCustomComponent',
                'x-component-props': {
                  record: {
                    name: 'Name',
                    code: 'Code',
                  },
                  index: 0,
                },
                properties: {
                  input: {
                    type: 'string',
                    'x-component': 'Input',
                    'x-value':
                      '{{`' +
                      '${$record.name} ' +
                      '${$record.code} ' +
                      '${$record.$index} ' +
                      '${$record.$lookup.name} ' +
                      '${$record.$lookup.code} ' +
                      '${$index} ' +
                      '${$lookup.name} ' +
                      '${$lookup.code} ' +
                      '`}}',
                  },
                },
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
