<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="calendar"
        x-component="Calendar"
        :x-component-props="{
          fieldProps: {
            label: '日历',
            placeholder: '选择日历',
            format: (date) =>
              date && `${date.getMonth() + 1}/${date.getDate()}`,
          },
          calendarProps: {},
          fieldListeners: {},
          calendarListeners: {},
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
import { Calendar, Submit, Form } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Calendar,
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
