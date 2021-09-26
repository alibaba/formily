<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        :decorator="[FormItem]"
        :component="[Input, { placeholder: 'Please Input' }]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <div style="white-space: pre; margin-bottom: 16px">
            {{ JSON.stringify(form.values, null, 2) }}
          </div>
          <Button
            type="primary"
            @click="
              () => {
                form.submit(log)
              }
            "
          >
            Submit
          </Button>
        </template>
      </FormConsumer>
    </Form>
  </FormProvider>
</template>

<script>
import { Form, Input, Button } from 'ant-design-vue'
import { createForm, setValidateLanguage } from '@formily/core'
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
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
    Form,
    Button,
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      FormItem,
      Input,
      form,
    }
  },
  methods: {
    log(...args) {
      console.log(...args)
    },
  },
}
</script>
