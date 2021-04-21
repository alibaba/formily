# mapReadPretty

## 描述

因为大多数第三方组件都不支持阅读态，如果想要快速支持阅读态的话，即可使用 mapReadPretty 函数来映射一个阅读态组件

## 签名

```ts
interface mapReadPretty {
  (component: Vue.Component): Vue.Component
}
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        initialValue="Hello world"
        :decorator="[FormItem]"
        :component="[Input, { placeholder: 'Please Input' }]"
      />
    </Form>
  </FormProvider>
</template>

<script>
import { Form, Input as AntdInput } from 'ant-design-vue'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  Field,
  connect,
  mapProps,
  mapReadPretty
} from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

setValidateLanguage('en')

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      return {
        ...props,
        help: field.errors?.length ? field.errors : undefined,
      }
    }
  )
)

const Input = connect(
  AntdInput,
  mapReadPretty({
    props: ['value'],
    // you need import "h" from "vue" in vue3
    render (h) {
      return h('div', [this.value])
    }
  })
)

export default {
  components: {
    FormProvider,
    Field,
    Form
  },
  data() {
    const form = createForm({ validateFirst: true, readPretty: true })
    return {
      FormItem,
      Input,
      form
    }
  }
}
</script>
:::
