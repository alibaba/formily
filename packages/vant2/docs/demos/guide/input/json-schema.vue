<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Submit, Input } from '@formily/vant2'

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-component': 'Input',
      'x-component-props': { label: '输入框', placeholder: '请输入' },
    },
    textarea: {
      type: 'string',
      'x-component': 'Input',
      'x-component-props': {
        autosize: true,
        type: 'textarea',
        label: '文本框',
        placeholder: '请输入',
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    Input,
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
    log(value) {
      console.log(value)
    },
  },
}
</script>
