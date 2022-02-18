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
import { Form, Slider, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Slider,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        slider: {
          type: 'number',
          title: '滑块',
          'x-component': 'Slider',
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
