<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :component="[Input, { label: '输入框', placeholder: '请输入' }]"
    />
    <Field
      name="textarea"
      title="文本框"
      :component="[Input.TextArea, { label: '文本框', placeholder: '请输入' }]"
    />
    <Field
      name="inputRead"
      title="输入框"
      pattern="readPretty"
      :component="[Input, { label: '输入框', placeholder: '请输入' }]"
    />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { Input, Submit } from '@formily/vant2'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      Input,
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
