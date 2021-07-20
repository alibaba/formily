<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="textarea"
      title="文本框"
      :decorator="[FormItem]"
      :component="[TextArea]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, Field } from '@formily/vue'
import { FormItem, Input, TextArea, Submit } from '@formily/element'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      Input,
      TextArea,
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
