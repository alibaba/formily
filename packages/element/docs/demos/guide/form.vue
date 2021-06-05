<template>
  <Form :form="form" :label-col="6" :wrapper-col="10">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        :required="true"
      />
      <SchemaStringField
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        :required="true"
      />
    </SchemaField>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, components } from '@formily/element'

const form = createForm()
const fields = createSchemaField({ components })

export default {
  components: { Form, ...fields },
  data() {
    return {
      form,
    }
  },
}
</script>
