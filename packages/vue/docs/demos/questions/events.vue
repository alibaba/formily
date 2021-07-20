<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const { SchemaField } = createSchemaField({
  components: {
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-component': 'Input',
      'x-component-props': {
        '@change': (e) => console.log(e),
        onFocus: (e) => console.log(e),
      },
    },
  },
}

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
      schema,
    }
  },
}
</script>
