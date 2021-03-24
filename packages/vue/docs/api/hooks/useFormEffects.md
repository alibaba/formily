# useFormEffects

## 描述

主要在自定义组件中往当前[Form](https://core.formilyjs.org/api/models/form)实例注入副作用逻辑，用于实现一些较为复杂的场景化组件

## 签名

```ts
interface useFormEffects {
  (form: Form): void
}
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Field name="input" :decorator="[FormItem]" :component="[Input, { placeholder: 'input' }]" />
    <Field name="custom" :decorator="[FormItem]" :component="[Custom]" />
  </FormProvider>
</template>

<script>
import { defineComponent, h } from '@vue/composition-api'
import { createForm, onFieldReact } from '@formily/core'
import { FormProvider, Field, useFormEffects, observer } from '@formily/vue'
import { Form, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const Custom = defineComponent({
  setup (props, context) {
    useFormEffects(() => {
      onFieldReact('custom.bb', (field) => {
        field.value = field.query('.aa').get('value')
      })
    })
    return () => h('div', {}, [
      h(Field, { props: { name: 'aa', decorator: [Form.Item], component: [Input, { placeholder: 'aa' }] } }, {}),
      h(Field, { props: { name: 'bb', decorator: [Form.Item], component: [Input, { placeholder: 'bb' }] } }, {}),
    ])
  },
})

export default {
  components: {
    FormProvider,
    Field
  },
  data() {
    const form = createForm({
      effects() {
        onFieldReact('custom.aa', (field) => {
          field.value = field.query('input').get('value')
        })
      },
    })
    return {
      FormItem: Form.Item,
      Input,
      Custom,
      form
    }
  }
}
</script>
:::
