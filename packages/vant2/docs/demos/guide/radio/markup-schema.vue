<template>
  <Form class="radio" :form="form">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="单选"
        x-component="Radio.Group"
        :enum="[
          {
            label: '选项1',
            name: 1,
          },
          {
            label: '选项2',
            name: 2,
          },
        ]"
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
import { Radio, Submit, Form } from '@formily/vant2'

const form = createForm()
const fields = createSchemaField({
  components: {
    Radio,
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

<style lang="scss" scoped>
.radio {
  ::v-deep {
    .van-radio {
      margin: 0 0 8px;
    }
  }
}
</style>
