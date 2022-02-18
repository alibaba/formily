<template>
  <Form :form="form">
    <Field
      name="calendar"
      :component="[
        Calendar,
        {
          fieldProps: {
            label: '日历',
            placeholder: '选择日历',
            format: (date) =>
              date && `${date.getMonth() + 1}/${date.getDate()}`,
          },
          popupProps: {},
          calendarProps: {},
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
import { Calendar, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Calendar,
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
