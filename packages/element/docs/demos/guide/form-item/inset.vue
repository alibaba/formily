<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="Input"
        x-decorator="FormItem"
        x-component="Input"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
      <SchemaStringField
        name="Select"
        title="Select"
        x-decorator="FormItem"
        x-component="Select"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
      <SchemaStringField
        name="Cascader"
        title="Cascader"
        x-decorator="FormItem"
        x-component="Cascader"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
      <SchemaStringField
        name="DatePicker"
        title="DatePicker"
        x-decorator="FormItem"
        x-component="DatePicker"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
      <SchemaStringField
        name="InputNumber"
        title="InputNumber"
        x-decorator="FormItem"
        x-component="InputNumber"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
      <SchemaStringField
        name="Switch"
        title="Switch"
        x-decorator="FormItem"
        x-component="Switch"
        required
        :x-decorator-props="{
          inset: true,
        }"
      />
    </SchemaField>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
  Form,
  FormItem,
  Input,
  Select,
  Cascader,
  DatePicker,
  Switch,
  InputNumber,
} from '@formily/element'

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Cascader,
    DatePicker,
    Switch,
    InputNumber,
  },
})

export default {
  components: { Form, ...fields },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
