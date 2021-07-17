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
                'x-component': 'Custom',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, useFieldSchema } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

const Custom = defineComponent({
  setup() {
    const schemaRef = useFieldSchema()
    return () => {
      const schema = schemaRef.value
      return h(
        'div',
        {
          style: { whiteSpace: 'pre' },
        },
        [JSON.stringify(schema.toJSON(), null, 4)]
      )
    }
  },
})

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
  },
})

export default {
  components: { FormProvider, SchemaField, SchemaObjectField },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      form,
    }
  },
}
</script>
