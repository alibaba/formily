<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script>
import { Input, Icon } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const { SchemaField } = createSchemaField({
  components: {
    Input,
  },
})

const PrefixIcon = {
  functional: true,
  render(h) {
    return h(Icon, { props: { type: 'user' } })
  },
}

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      'x-component': 'Input',
      'x-content': {
        prefix: PrefixIcon,
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
