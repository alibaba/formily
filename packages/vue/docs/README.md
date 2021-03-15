---
home: true
heroText: FORMILY VUE
tagline: 阿里巴巴统一前端表单解决方案
actionText: 开发指南
actionLink: /guide/
features:
  - title: 超高性能
    details: 依赖追踪，高效更新，按需渲染
  - title: 开箱即用
    details: 组件状态自动绑定，接入成本极低
  - title: 协议驱动
    details: 标准JSON-Schema
  - title: 场景复用
    details: 基于协议驱动，抽象场景组件
  - title: 调试友好
    details: 天然对接Formily DevTools
  - title: 智能提示
    details: 拥抱Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present
---

## 安装

```bash
$ npm install --save mobx
$ npm install --save @formily/core @formily/vue
```

## 快速开始

::: demo
<template>
  <FormProvider :form="form">
    <Field
      name="name"
      title="Name"
      required
      :decorator="[FormItem]"
      :component="[Input, { placeholder:'Please Input' }]"
    />
    <Field
      name="password"
      title="Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder:'Please Input' }]"
      :reactions="createPasswordEqualValidate('confirm_password')"
    />
    <Field
      name="confirm_password"
      title="Confirm Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder:'Please Input' }]"
      :reactions="createPasswordEqualValidate('password')"
    />
    <FormConsumer style="white-space: pre;">
      <template #default="{ form }">{{ JSON.stringify(form.values, null, 2) }}</template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { Form, Input } from 'ant-design-vue';
import { createForm, isVoidField, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@formily/vue'
import 'ant-design-vue/dist/antd.css';

setValidateLanguage('en')

const FormItem = connect(
  Form.Item,
  mapProps(
    { validateStatus: true, title: 'label' },
    (props, field) => ({
      help: !isVoidField(field) ? (field.errors.length ? field.errors : undefined) : undefined,
      extra: field.description
    })
  )
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field
  },
  data() {
    const form = createForm({ validateFirst: true })
    const createPasswordEqualValidate = (equalName) => (field) => {
      if (
        form.values.confirm_password &&
        field.value &&
        form.values[equalName] !== field.value
      ) {
        field.errors = ['Password does not match Confirm Password.']
      } else {
        field.errors = []
      }
    }
    return {
      FormItem,
      Input,
      form,
      createPasswordEqualValidate
    }
  }
}
</script>
:::
