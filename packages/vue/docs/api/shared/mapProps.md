# mapProps

## 描述

将[Field](https://core.formilyjs.org/api/models/field)属性与组件属性映射的适配器函数，主要与 connect 函数搭配使用

## 签名

```ts
type IStateMapper<Props> =
  | {
      [key in keyof Formily.Core.Models.Field]?: keyof Props | boolean
    }
  | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)

interface mapProps<T extends Vue.Component> {
  (...args: IStateMapper<VueComponentProps<T>>[]): Vue.Component
}
```

- 参数可以传对象(key 是 field 的属性，value 是组件的属性，如果 value 为 true，代表映射的属性名相同)
- 参数可以传函数，函数可以直接对属性做更复杂的映射

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
