<template>
  <FormProvider :form="form">
    <Field
      name="field"
      title="输入框"
      :component="[VanField, { label: '输入框', placeholder: '请输入' }]"
    />
    <Field
      name="textarea"
      title="文本框"
      :component="[
        VanField,
        {
          autosize: true,
          type: 'textarea',
          label: '文本框',
          placeholder: '请输入',
        },
      ]"
    />
    <Field
      name="fieldRead"
      title="输入框"
      pattern="readPretty"
      :component="[VanField, { label: '输入框', placeholder: '请输入' }]"
    />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { Field as VanField, Submit } from '@formily/vant2'

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      VanField,
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
