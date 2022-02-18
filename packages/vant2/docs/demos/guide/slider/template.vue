<template>
  <Form :form="form">
    <Field name="slider" title="滑块" :component="[Slider]" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Slider, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Slider,
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
