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
import { Form, Area, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Area,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        area: {
          type: 'array',
          'x-component': 'Area',
          'x-component-props': {
            fieldProps: {
              format: (val) =>
                (val || [])
                  .filter((item) => !!item)
                  .map((item) => item && item.name)
                  .join('/'),
              label: '城市',
              placeholder: '选择城市',
            },
            popupProps: {},
            pickerProps: {
              areaList: {
                province_list: {
                  110000: '北京市',
                  120000: '天津市',
                },
                city_list: {
                  110100: '北京市',
                  120100: '天津市',
                },
                county_list: {
                  110101: '东城区',
                  110102: '西城区',
                },
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
