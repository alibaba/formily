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
import { createForm } from '@formily/core'
import { FormProvider, Field, defineObservableComponent, useForm, h } from '@formily/vue';
import { Input, Space } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const Custom = defineObservableComponent({
  observableSetup (collect, props, context) {
    const form = useForm();
    collect({ form });
    return () => h('div', {}, {
      default: () => [form.values.input]
    });
  },
});

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
