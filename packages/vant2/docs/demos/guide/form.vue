<template>
  <Form :form="form" @autoSubmit="log" @autoSubmitFailed="log">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="Field"
        :x-component-props="{
          label: '输入框',
          placeholder: '请输入',
        }"
        :required="true"
      />
      <SchemaArrayField
        name="multiple"
        x-decorator="Field"
        :x-decorator-props="{
          label: '选择',
        }"
        :enum="[
          { label: '选项1', name: 1 },
          { label: '选项2', name: 2 },
        ]"
        x-component="Checkbox.Group"
        :x-component-props="{
          direction: 'horizontal',
        }"
        :required="true"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block> 提交 </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Field, Checkbox, Select, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({ components: { Field, Checkbox } })

export default {
  components: { Submit, Form, ...fields },
  data() {
    return {
      form,
      pattern: /\d{6}/,
    }
  },

  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
