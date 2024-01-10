---
order: 4
---

# SchemaField

## 描述

SchemaField 组件是专门用于解析[JSON-Schema](/api/shared/schema)动态渲染表单的组件。
在使用 SchemaField 组件的时候，需要通过 createSchemaField 工厂函数创建一个 SchemaField 组件。

## 签名

```ts
//SchemaField组件与其静态属性
type ComposeSchemaField = React.FC<
  React.PropsWithChildren<ISchemaFieldProps>
> & {
  Markup: React.FC<React.PropsWithChildren<ISchema>>
  String: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Object: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Array: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Date: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  DateTime: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Boolean: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Number: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Void: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
}

//工厂函数参数属性
interface ISchemaFieldFactoryProps {
  components?: {
    [key: string]: React.FC //组件列表
  }
  scope?: any //全局作用域，用于实现协议表达式变量注入
}

//SchemaField属性
interface ISchemaFieldProps extends IFieldFactoryProps {
  schema?: ISchema //字段schema
  scope?: any //协议表达式作用域
  name?: string //字段名称
  components?: {
    [key: string]: React.FC //局部组件列表，注意：这里传的组件是享受不到智能提示的
  }
}

//工厂函数
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): ComposeSchemaField
}
```

IFieldFactoryProps 参考 [IFieldFactoryProps](https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops)

ISchema 参考 [ISchema](/api/shared/schema#ischema)

## Markup Schema 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Select } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Select,
      }}
    >
      <SchemaField.String name="input" x-component="Input" />
      <SchemaField.String
        name="select"
        x-component="Select"
        x-component-props={{
          style: {
            width: 200,
            marginTop: 20,
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

## JSON Schema 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Select } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Select,
      }}
      schema={{
        type: 'object',
        properties: {
          input: {
            type: 'string',
            'x-component': 'Input',
          },
          select: {
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              style: {
                width: 200,
                marginTop: 20,
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
