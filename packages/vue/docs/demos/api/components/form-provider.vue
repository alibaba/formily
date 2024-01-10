<template>
  <FormProvider :form="form">
    <Field name="input" :component="[Input]" />
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, Field },
  data() {
    return {
      Input,
      form: createForm(),
    }
  },
}
</script>
