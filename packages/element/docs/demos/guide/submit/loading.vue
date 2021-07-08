<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="input1"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        required
        title="输入框"
        name="input2"
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit @submit="handleSubmit">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormLayout,
  Submit,
  FormButtonGroup,
  FormItem,
  Input,
} from '@formily/element'

const fields = createSchemaField({ components: { FormItem, Input } })

export default {
  components: {
    FormProvider,
    FormLayout,
    Submit,
    FormButtonGroup,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
  methods: {
    handleSubmit(values) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(values)
          resolve()
        }, 2000)
      })
    },
  },
}
</script>
