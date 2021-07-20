<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="单选"
      :decorator="[FormItem]"
      :component="[Transfer]"
      :dataSource="[
        {
          label: '选项1',
          key: 1,
        },
        {
          label: '选项2',
          key: 2,
        },
      ]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormItem, Transfer, Submit } from '@formily/element'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      Transfer,
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
