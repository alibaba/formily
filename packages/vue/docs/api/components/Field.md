---
order: 0
---

# Field

## 描述

作为@formily/core 的 [createField](https://core.formilyjs.org/api/models/form#createfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，Field 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

::: warning
我们在使用 Field 组件的时候，一定要记得传 name 属性。
:::

## 签名

```ts
type Field = Vue.Component<any, any, any, IFieldFactoryProps>
```

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Field name="input" :component="[Input, { placeholder:'请输入' }]" />
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, Field },
  data() {
    return {
      Input,
      form: createForm()
    }
  }
}
</script>
:::
