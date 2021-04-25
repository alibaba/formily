# connect

## 描述

主要用于对第三方组件库的无侵入接入 Formily

## 签名

```ts
interface IComponentMapper<T extends Vue.Component> {
  (target: T):  Vue.Component
}
interface connect<T extends Vue.Component> {
  (target: T, ...args: IComponentMapper<T>[]): Vue.Component
}
```

入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的[mapProps](/api/shared/map-props)和[mapReadPretty](/api/shared/map-read-pretty)映射器

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        :decorator="[FormItem]"
        :component="[Input, { placeholder: 'Please Input' }]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <div style="white-space: pre; margin-bottom: 16px;">{{JSON.stringify(form.values, null, 2)}}</div>
          <Button
            type="primary"
            @click="() => {
              form.submit(log)
            }"
          >
            Submit
          </Button>
        </template>
      </FormConsumer>
    </Form>
  </FormProvider>
</template>

<script>
import { Form, Input, Button } from 'ant-design-vue'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
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

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
    Form,
    Button
  },
  data() {
    const form = createForm({ validateFirst: true })
    return {
      FormItem,
      Input,
      form
    }
  },
  methods: {
    log (...args) {
      console.log(...args)
    }
  }
}
</script>
:::
