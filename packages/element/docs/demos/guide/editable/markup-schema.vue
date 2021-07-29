<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="date"
        title="日期"
        x-decorator="Editable"
        x-component="DatePicker"
      />
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="Editable"
        x-component="Input"
      />
      <SchemaVoidField
        name="void"
        title="虚拟节点容器"
        x-component="Editable.Popover"
        :x-reactions="
          (field) => {
            field.title = field.query('.void.date2').get('value') || field.title
          }
        "
      >
        <SchemaStringField
          name="date2"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaStringField
          name="input2"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaVoidField>
      <SchemaObjectField
        name="object"
        title="对象节点容器"
        x-component="Editable.Popover"
        :x-reactions="
          (field) => {
            field.title = (field.value && field.value.date) || field.title
          }
        "
      >
        <SchemaStringField
          name="date"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaStringField
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaObjectField>
    </SchemaField>
    <FormButtonGroup>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormButtonGroup,
  FormItem,
  Submit,
  Input,
  DatePicker,
  Editable,
} from '@formily/element'
import { Button } from 'element-ui'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    DatePicker,
    Editable,
  },
})

export default {
  components: {
    FormButtonGroup,
    FormProvider,
    Button,
    Submit,
    ...SchemaField,
  },

  data() {
    const form = createForm()

    return {
      form,
    }
  },
  methods: {
    log(values) {
      console.log(values)
    },
  },
}
</script>

<style lang="scss" scoped></style>
