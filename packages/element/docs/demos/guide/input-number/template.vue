<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[
        InputNumber,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormItem, InputNumber, Submit } from '@formily/element'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      InputNumber,
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
