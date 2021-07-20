<template>
  <FormProvider :form="form">
    <SchemaField> </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, TimePicker, Submit } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    TimePicker,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
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
