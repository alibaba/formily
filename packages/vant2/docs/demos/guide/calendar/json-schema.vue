<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="onSubmit"
      >提交</Submit
    >
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Submit } from '@formily/vant2'
import CustomCalendar from './custom-calendar'

const schema = {
  type: 'object',
  properties: {
    customCalendar: {
      type: 'string',
      'x-component': 'CustomCalendar',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    CustomCalendar,
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
