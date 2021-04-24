# useField

## 描述

主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 Field 组件的子树内都能使用，注意，拿到的是[GeneralField](https://core.formilyjs.org/api/models/field#generalfield)，如果需要对不同类型的字段做处理，请使用[Type Checker](https://core.formilyjs.org/api/entry/form-checker)

::: warning
注意：如果要在自定义组件内使用useField，并响应字段模型变化，需要使用 [observer](/api/shared/observer) 包裹自定义组件
:::

## 签名

```ts
interface useField {
  (): Ref<Field>
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
import { defineComponent, h } from '@vue/composition-api'
import { Form, Input, Button } from 'ant-design-vue'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer
} from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

setValidateLanguage('en')

const FormItem = observer(defineComponent({
  setup (props, { slots }) {
    const fieldRef = useField()
    return () => {
      const field = fieldRef.value
      return h(Form.Item, {
        props: {
          label: field.title,
          required: field.required,
          help: field.errors?.length ? field.errors : undefined,
          extra: field.description,
          validateStatus: field.validateStatus,
        }
      }, slots?.default())
    }
  }
}))

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
