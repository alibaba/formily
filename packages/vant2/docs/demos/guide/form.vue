<template>
  <Form :form="form" @failed="onFailed" @submit="onSubmit">
    <SchemaField>
      <SchemaStringField
        name="input"
        x-component="Input"
        :x-component-props="{
          name: 'input',
          label: '输入框',
          placeholder: '请输入',
          rules: [{ pattern, message: '请输入正确内容' }],
        }"
        :required="true"
      />
      <SchemaArrayField
        name="multiple"
        x-decorator="Field"
        :x-decorator-props="{
          name: 'multiple',
          label: '选择',
          rules: [{ validator, message: '请输入正确内容' }],
        }"
        :enum="[
          { label: '选项1', name: 1 },
          { label: '选项2', name: 2 },
        ]"
        x-component="Checkbox.Group"
        :x-component-props="{
          direction: 'horizontal',
        }"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block> 提交 </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Field, Checkbox, Input, Select, Submit } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({ components: { Input, Field, Checkbox } })

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
    validator(val) {
      return !!val.length
    },
    onFailed(value) {
      console.log('onFailed', value)
    },
    onSubmit(value) {
      console.log('onSubmit: ', value)
    },
  },
}
</script>
