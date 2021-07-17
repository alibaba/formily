<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaObjectField
        name="custom"
        x-component="Custom"
        :x-component-props="{
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecursionField } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

// functional component in vue2
const Custom = {
  functional: true,
  render(h, { props }) {
    return h(RecursionField, {
      props: {
        name: props.name,
        schema: props.schema,
        onlyRenderProperties: true,
      },
    })
  },
}

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
    Input,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaObjectField },
  data() {
    return {
      form: createForm(),
    }
  },
}
</script>
