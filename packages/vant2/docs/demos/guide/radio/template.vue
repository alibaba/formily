<template>
  <Form class="radio" :form="form">
    <Field
      name="input"
      title="单选"
      :component="[Radio.Group]"
      :dataSource="[
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
    <Submit :style="{ 'margin-top': '16px' }" round block @submit="log">
      提交
    </Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Radio, Submit, Form } from '@formily/vant2'

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      Radio,
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
