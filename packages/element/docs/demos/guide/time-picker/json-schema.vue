<template>
  <Form :form="form" label-align="left" :label-width="160">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, TimePicker, Submit } from '@formily/element'

const schema = {
  type: 'object',
  properties: {
    time: {
      type: 'string',
      title: '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        style: {
          width: '240px',
        },
      },
    },
    '[startTime,endTime]': {
      title: '时间范围',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        isRange: true,
        style: {
          width: '240px',
        },
      },
      type: 'string',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    TimePicker,
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
l
