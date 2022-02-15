<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="Input"
        :x-component-props="{ label: '输入框', placeholder: '请输入文本' }"
      />
      <SchemaStringField
        name="textarea"
        x-component="Input.TextArea"
        :x-component-props="{ label: '文本框', placeholder: '请输入文本' }"
      />
      <SchemaStringField
        x-pattern="readPretty"
        name="input-read"
        x-component="Input"
        :x-component-props="{ label: '输入框', placeholder: '请输入文本' }"
      />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/vue'
import { Input } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Input,
  },
})

export default {
  components: { FormProvider, ...fields },
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
