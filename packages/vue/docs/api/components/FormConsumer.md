---
order: 7
---

# FormConsumer

## 描述

表单响应消费者，专门用于监听表单模型数据变化而实现各种 UI 响应的组件，使用方式为 scoped slot.

当回调函数内依赖的数据发生变化时就会重新渲染回调函数

Form 参考[Form](https://core.formilyjs.org/api/models/form)

## 用例

::: demo
<template>
  <FormProvider :form="form">
    <Field name="input" :component="[Input]" />
    <FormConsumer>
      <template #default="{ form }">
        {{ form.values.input }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { Input } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { FormProvider, Field, FormConsumer },
  data() {
    return {
      Input,
      form: createForm()
    }
  }
}
</script>

:::
