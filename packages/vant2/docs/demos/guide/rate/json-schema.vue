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
import { Form, Rate, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Rate,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        rate: {
          type: 'number',
          title: '评分',
          'x-component': 'Rate',
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
