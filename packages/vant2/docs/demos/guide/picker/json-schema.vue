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
import { Form, Picker, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Picker,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        picker: {
          type: 'number',
          'x-component': 'Picker',
          'x-component-props': {
            fieldProps: {
              label: '城市',
              placeholder: '选择城市',
            },
            popupProps: {},
            pickerProps: {
              columns: [
                '杭州',
                '宁波',
                '温州',
                '绍兴',
                '湖州',
                '嘉兴',
                '金华',
                '衢州',
              ],
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
