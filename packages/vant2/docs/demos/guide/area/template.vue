<template>
  <Form :form="form">
    <Field
      name="area"
      :component="[
        Area,
        {
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
          areaProps: {
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
import { Area, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Area,
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
