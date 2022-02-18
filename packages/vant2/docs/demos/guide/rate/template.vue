<template>
  <Form :form="form">
    <Field name="rate" title="评分" :component="[Rate]" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Rate, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Rate,
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
