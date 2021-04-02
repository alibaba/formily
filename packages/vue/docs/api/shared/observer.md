# observer

## 描述

observer 是从 [@formily/reactive-vue](https://reactive.formilyjs.org/api/vue/observer) 中导出的，API 完全一致，使用 observer 主要是将组件支持响应式更新能力。

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Space>
      <Field
        name="name"
        title="Name"
        required
        :component="[Input, { placeholder: 'Please Input' }]"
      />
      <FormPreviewer />
    </Space>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm, observer } from '@formily/vue'
import { Input, Space } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const FormPreviewer = observer(defineComponent({
  name: 'FormPreviewer',
  setup() {
    const formRef = useForm()
    return () => {
      const form = formRef.value
      return h('div', [JSON.stringify(form.values)])
    }
  }
}))

export default {
  components: {
    FormProvider,
    Field,
    FormPreviewer,
    Space
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      Input,
      form
    }
  }
}
</script>
:::
