<template>
  <Form class="radio" :form="form">
    <SchemaField :schema="schema" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Radio, Submit } from '@formily/vant2'

const { SchemaField } = createSchemaField({
  components: {
    Radio,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
    const schema = {
      type: 'object',
      properties: {
        radio: {
          type: 'boolean',
          title: '单选',
          enum: [
            {
              label: '选项1',
              name: 1,
            },
            {
              label: '选项2',
              name: 2,
            },
          ],
          'x-component': 'Radio.Group',
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

<style lang="scss" scoped>
.radio {
  ::v-deep {
    .van-radio {
      margin: 0 0 8px;
    }
  }
}
</style>
