<template>
  <Form :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single"
        title="是否确认"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaArrayField
        name="multiple"
        title="复选"
        :enum="[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="CheckboxGroup"
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  Submit,
} from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Checkbox,
    CheckboxGroup,
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
l
