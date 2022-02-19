<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="datetimePicker"
        x-component="DatetimePicker"
        :x-component-props="{
          fieldProps: {
            label: '时间选择器',
            placeholder: '请选择时间',
          },
          popupProps: {},
          datetimePickerProps: {
            type: 'time',
          },
          fieldListeners: {},
          popupListeners: {},
          datetimePickerListeners: {},
        }"
      />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { DatetimePicker, Submit, Form } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    DatetimePicker,
  },
})

export default {
  components: { ...fields, Submit, Form },
  data() {
    return {
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
