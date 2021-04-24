---
order: 4
---

# SchemaField (JSON Schema)

## 描述

SchemaField 支持直接传入 [JSON-Schema](/api/shared/schema) 对象渲染表单。

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <SchemaField :schema="{
      type: 'object',
      properties: {
        input: {
          type: 'string',
          'x-component': 'Input',
        },
      },
    }">
    </SchemaField>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const { SchemaField } = createSchemaField({
  components: {
    Input
  },
})

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm()
    }
  }
}
</script>

:::
