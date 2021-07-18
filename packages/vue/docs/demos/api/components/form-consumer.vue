<template>
  <FormProvider :form="form">
    <Field name="input" :component="[Input]" />
    <FormConsumer>
      <template #default="{ form }">
        {{ form.values.input }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, Field, FormConsumer },
  data() {
    return {
      Input,
      form: createForm(),
    }
  },
}
</script>
