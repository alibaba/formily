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
import { defineComponent, h } from '@vue/composition-api'
import { Form, Input, Button } from 'ant-design-vue'
import { createForm, setValidateLanguage } from '@formily/core'
import { FormProvider, FormConsumer, Field, useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import 'ant-design-vue/dist/antd.css'

setValidateLanguage('en')

const FormItem = observer(
  defineComponent({
    setup(props, { slots }) {
      const fieldRef = useField()
      return () => {
        const field = fieldRef.value
        return h(
          Form.Item,
          {
            props: {
              label: field.title,
              required: field.required,
              help: field.selfErrors?.length ? field.selfErrors : undefined,
              extra: field.description,
              validateStatus: field.validateStatus,
            },
          },
          slots?.default()
        )
      }
    },
  })
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
