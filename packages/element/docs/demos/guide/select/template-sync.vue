<template>
  <FormProvider :form="form">
    <Field
      name="select"
      title="选择框"
      :decorator="[FormItem]"
      :component="[
        Select,
        {
          style: {
            width: '240px',
          },
        },
      ]"
      :dataSource="[
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { FormItem, Select, Submit } from '@formily/element'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      Select,
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
