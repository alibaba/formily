# useForm

## 描述

主要在自定义组件中读取当前[Form](https://core.formilyjs.org/api/models/form)实例，用于实现一些副作用依赖，比如依赖 Form 的 errors 信息之类的，用于实现一些较为复杂的场景化组件

## 签名

```ts
interface useForm {
  (): Form
}
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Space>
      <Field name="input" :component="[Input]" />
      <Field name="custom" :component="[Custom]" />
    </Space>
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm, observer } from '@formily/vue'
import { Input, Space } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const Custom = observer(defineComponent({
  setup (props, context) {
    const formRef = useForm()
    return () => {
      const form = formRef.value
      return h('div', {}, [form.values.input])
    }
  },
}))

export default {
  components: {
    FormProvider,
    Field,
    Space
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      Input,
      Custom,
      form
    }
  }
}
</script>
:::
