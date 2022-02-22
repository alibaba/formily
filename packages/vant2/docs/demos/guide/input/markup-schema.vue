<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="Input"
        :x-component-props="{ label: '输入框', placeholder: '请输入' }"
      />
      <SchemaStringField
        name="textarea"
        x-component="Input"
        :x-component-props="{
          autosize: true,
          type: 'textarea',
          label: '文本框',
          placeholder: '请输入',
        }"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { Input, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Input,
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
