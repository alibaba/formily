<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, InputNumber, Submit } from '@formily/element'

const schema = {
  type: 'object',
  properties: {
    inputNumber: {
      type: 'number',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    InputNumber,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    return {
      form,
      schema,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
