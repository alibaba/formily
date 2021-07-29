<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Radio, Submit } from '@formily/element'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Radio,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        radio: {
          type: 'boolean',
          title: '单选',
          enum: [
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
        },
      },
    }

    const form = createForm()

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
