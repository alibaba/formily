<template>
  <FormProvider :form="form">
    <Field
      name="input"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: 'input' }]"
    />
    <Field name="custom" :decorator="[FormItem]" :component="[Custom]" />
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm, onFieldReact } from '@formily/core'
import { FormProvider, Field, useFormEffects } from '@formily/vue'
import { Form, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const Custom = defineComponent({
  setup() {
    useFormEffects(() => {
      onFieldReact('custom.bb', (field) => {
        field.value = field.query('.aa').get('value')
      })
    })
    return () =>
      h('div', {}, [
        h(
          Field,
          {
            props: {
              name: 'aa',
              decorator: [Form.Item],
              component: [Input, { placeholder: 'aa' }],
            },
          },
          {}
        ),
        h(
          Field,
          {
            props: {
              name: 'bb',
              decorator: [Form.Item],
              component: [Input, { placeholder: 'bb' }],
            },
          },
          {}
        ),
      ])
  },
})

export default {
  components: {
    FormProvider,
    Field,
  },
  data() {
    const form = createForm({
      effects() {
        onFieldReact('custom.aa', (field) => {
          field.value = field.query('input').get('value')
        })
      },
    })
    return {
      FormItem: Form.Item,
      Input,
      Custom,
      form,
    }
  },
}
</script>
