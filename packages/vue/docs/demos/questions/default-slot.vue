<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { Button } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const { SchemaField } = createSchemaField({
  components: {
    Button,
  },
})

const schema = {
  type: 'object',
  properties: {
    button: {
      type: 'void',
      'x-component': 'Button',
      'x-content': '一个普通的按钮',
    },
  },
}

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema,
    }
  },
}
</script>
