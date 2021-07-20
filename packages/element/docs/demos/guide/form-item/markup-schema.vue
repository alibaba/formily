<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, FormItem, Input, Submit } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default {
  components: { Form, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
