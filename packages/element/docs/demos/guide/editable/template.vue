<template>
  <FormProvider :form="form">
    <Field
      name="date"
      title="日期"
      :decorator="[Editable]"
      :component="[DatePicker]"
    />
    <Field
      name="input"
      title="输入框"
      :decorator="[Editable]"
      :component="[Input]"
    />
    <VoidField
      name="void"
      title="虚拟节点容器"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          field.title = field.query('.void.date2').get('value') || field.title
        }
      "
    >
      <Field
        name="date2"
        title="日期"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input2"
        title="输入框"
        :decorator="[FormItem]"
        :component="[Input]"
      />
    </VoidField>
    <ObjectField
      name="iobject"
      title="对象节点容器"
      :component="[Editable.Popover]"
      :reactions="
        (field) => {
          field.title = (field.value && field.value.date) || field.title
        }
      "
    >
      <Field
        name="date"
        title="日期"
        :decorator="[FormItem]"
        :component="[DatePicker]"
      />
      <Field
        name="input"
        title="输入框"
        :decorator="[FormItem]"
        :component="[Input]"
      />
    </ObjectField>

    <FormButtonGroup>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField, ObjectField } from '@formily/vue'
import {
  FormButtonGroup,
  FormItem,
  Submit,
  Input,
  DatePicker,
  Editable,
} from '@formily/element'

export default {
  components: {
    FormButtonGroup,
    FormProvider,
    Submit,
    Field,
    VoidField,
    ObjectField,
  },

  data() {
    const form = createForm()

    return {
      FormItem,
      Input,
      DatePicker,
      Editable,
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
