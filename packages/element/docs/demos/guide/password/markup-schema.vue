<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="密码框"
        x-decorator="FormItem"
        x-component="Password"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { FormItem, Password, Submit } from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Password,
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
