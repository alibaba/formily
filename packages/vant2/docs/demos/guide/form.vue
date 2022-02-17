<template>
  <Form :form="form" @autoSubmit="log" @autoSubmitFailed="log">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-component="Input"
        :required="true"
      />
      <SchemaArrayField
        name="multiple"
        :enum="[
          { label: '选项1', name: 1 },
          { label: '选项2', name: 2 },
        ]"
        x-component="Checkbox.Group"
        :required="true"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block> 提交 </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Checkbox, Input, Select, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({ components: { Input, Checkbox } })

export default {
  components: { Submit, Checkbox, Form, ...fields },
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
