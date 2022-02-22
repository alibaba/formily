<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Cascader, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Cascader,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        cascader: {
          type: 'string',
          'x-component': 'Cascader',
          'x-component-props': {
            formItemProps: {
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
              change: (...args) => {
                console.log('onChange args: ', args)
              },
            },
          },
        },
      },
    }

    const form = createForm()

    return {
      form,
      schema,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
