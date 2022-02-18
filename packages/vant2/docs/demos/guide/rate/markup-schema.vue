<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField name="rate" title="评分" x-component="Rate" />
    </SchemaField>
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Rate, Submit, Form } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Rate,
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
