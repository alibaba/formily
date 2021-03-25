# useFieldSchema

## 描述

主要在自定义组件中读取当前字段的 Schema 信息，该 hook 只能用在 SchemaField 或者 RecursionField 的子树中使用

## 签名

```ts
interface useFieldSchema {
  (): Ref<Schema>
}
```

Schema 参考[Schema](/api/shared/schema)

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
                'x-component': 'Custom',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, useFieldSchema } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const Custom = defineComponent({
  setup () {
    const schemaRef = useFieldSchema()
    return () => {
      const schema = schemaRef.value
      return h('div', {
        style: { whiteSpace: 'pre' }
      }, [JSON.stringify(schema.toJSON(), null, 4)])
    }
  }
})

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaObjectField },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      form
    }
  }
}
</script>
:::
