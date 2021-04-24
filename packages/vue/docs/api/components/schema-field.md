---
order: 4
---

# SchemaField (Markup Schema)

## 描述

SchemaField 组件是专门用于解析[JSON-Schema](/api/shared/schema)动态渲染表单的组件。
在使用 SchemaField 组件的时候，需要通过 createSchemaField 工厂函数创建一个 SchemaField 组件。

## 签名

```ts
type ComposeSchemaField = {
  SchemaField: Vue.Component<any, any, any, ISchemaFieldProps>
  SchemaMarkupField: Vue.Component<any, any, any, ISchema>
  SchemaStringField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaObjectField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaArrayField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaBooleanField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaDateField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaDateTimeField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaVoidField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
  SchemaNumberField: Vue.Component<any, any, any, Omit<ISchema, 'type'>>
}

//工厂函数参数属性
interface ISchemaFieldFactoryProps {
  components?: {
    [key: string]: Vue.Component //组件列表
  }
  scope?: any //全局作用域，用于实现协议表达式变量注入
}

//SchemaField属性
interface ISchemaFieldProps extends IFieldFactoryProps {
  schema?: ISchema //字段schema
  scope?: any //协议表达式作用域
  name?: string //字段名称
}

//工厂函数
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): ComposeSchemaField
}
```

IFieldFactoryProps 参考 [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

ISchema 参考 [ISchema](/api/shared/schema#ischema)

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField name="input" x-component="Input" />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    Input
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaStringField },
  data() {
    return {
      form: createForm()
    }
  }
}
</script>

:::
