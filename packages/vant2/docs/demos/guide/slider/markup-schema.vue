<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="slider"
        title="滑块"
        x-component="Slider"
        :x-component-props="{ min: '-50', max: '50' }"
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
import { Slider, Submit, Form } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Slider,
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
