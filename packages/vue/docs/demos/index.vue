<template>
  <FormProvider :form="form">
    <Field
      name="name"
      title="Name"
      required
      :decorator="[FormItem]"
      :component="[Input, { placeholder: 'Please Input' }]"
    />
    <Field
      name="password"
      title="Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder: 'Please Input' }]"
      :reactions="createPasswordEqualValidate('confirm_password')"
    />
    <Field
      name="confirm_password"
      title="Confirm Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder: 'Please Input' }]"
      :reactions="createPasswordEqualValidate('password')"
    />
    <FormConsumer>
      <template #default="{ form }">
        <div style="white-space: pre">
          {{ JSON.stringify(form.values, null, 2) }}
        </div>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { Form, Input } from 'ant-design-vue'
import { createForm, isVoidField, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

setValidateLanguage('en')

const FormItem = connect(
  Form.Item,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      return {
        help: !isVoidField(field)
          ? field.errors.length
            ? field.errors
            : undefined
          : undefined,
        extra: field.description,
      }
    }
  )
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
  },
  data() {
    const form = createForm({ validateFirst: true })
    const createPasswordEqualValidate = (equalName) => (field) => {
      if (
        form.values.confirm_password &&
        field.value &&
        form.values[equalName] !== field.value
      ) {
        field.errors = ['Password does not match Confirm Password.']
      } else {
        field.errors = []
      }
    }
    return {
      FormItem,
      Input,
      form,
      createPasswordEqualValidate,
    }
  },
}
</script>
