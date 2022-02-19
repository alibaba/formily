<template>
  <Form :form="form">
    <Field
      name="cascader"
      :component="[
        Cascader,
        {
          fieldProps: {
            label: '地区',
            placeholder: '请选择所在地区',
            format: (data) => {
              const { selectedOptions = [] } = data || {}
              return selectedOptions.map((option) => option.text).join('/')
            },
          },
          popupProps: {},
          cascaderProps: {
            options: [
              {
                text: '浙江省',
                value: '330000',
                children: [{ text: '杭州市', value: '330100' }],
              },
              {
                text: '江苏省',
                value: '320000',
                children: [{ text: '南京市', value: '320100' }],
              },
            ],
          },
          fieldListeners: {},
          popupListeners: {},
          cascaderListeners: {
            change: cascaderChange,
          },
        },
      ]"
    />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Cascader, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Cascader,
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
    cascaderChange(...args) {
      console.log('onChange args: ', args)
    },
  },
}
</script>
