---
order: 5
---

# RecursionField (简易递归)

## 描述

递归渲染组件，主要基于[JSON-Schema](/api/shared/schema)做递归渲染，它是[SchemaField](/api/components/schema-field)组件内部的核心渲染组件，当然，它是可以独立于 SchemaField 单独使用的，我们使用的时候主要是在自定义组件中使用，用于实现具有递归渲染能力的自定义组件

## 签名

```ts
interface IRecursionFieldProps {
  schema: Schema //schema对象
  name?: string //路径名称
  basePath?: FormPathPattern //基础路径
  onlyRenderProperties?: boolean //是否只渲染properties
  onlyRenderSelf?: boolean //是否只渲染自身，不渲染properties
  mapProperties?: (schema: Schema, name: string) => Schema //schema properties映射器，主要用于改写schema
  filterProperties?: (schema: Schema, name: string) => boolean //schema properties过滤器，被过滤掉的schema节点不会被渲染
}

type RecursionField = Vue.Component<IRecursionFieldProps>
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaObjectField
        name="custom"
        x-component="Custom"
        :x-component-props="{
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecursionField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

// functional component in vue2
const Custom = {
  functional: true,
  render (h, { props }) {
    return h(RecursionField, { props: { name: props.name, schema: props.schema, onlyRenderProperties: true } })
  }
}

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
    Input,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaObjectField },
  data() {
    return {
      form: createForm()
    }
  }
}
</script>

:::

我们可以从组件属性中读取独立的 schema 对象，传给 RecursionField 渲染
