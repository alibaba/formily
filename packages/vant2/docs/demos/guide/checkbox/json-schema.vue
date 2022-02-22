<template>
  <Form class="checkbox" :form="form">
    <SchemaField :schema="schema" />
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Form, Checkbox, Submit } from '@formily/vant2'

const schema = {
  type: 'object',
  properties: {
    single: {
      type: 'boolean',
      'x-component': 'Checkbox',
      'x-component-props': { label: '选项' },
    },
    multiple: {
      type: 'array',
      'x-component': 'Checkbox.Group',
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
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    Checkbox,
  },
})

export default {
  components: { Form, SchemaField, Submit },
  data() {
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
.checkbox {
  ::v-deep {
    .van-checkbox {
      margin: 0 0 8px;
    }
  }
}
</style>
