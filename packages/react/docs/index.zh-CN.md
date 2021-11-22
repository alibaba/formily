---
title: Formily - 阿里巴巴统一前端表单解决方案
order: 10
hero:
  title: React Library
  desc: 阿里巴巴统一前端表单解决方案
  actions:
    - text: 主站文档
      link: //formilyjs.org
    - text: 开发指南
      link: /zh-CN/guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: 超高性能
    desc: 依赖追踪，高效更新，按需渲染
  - icon: https://img.alicdn.com/imgextra/i2/O1CN016i72sH1c5wh1kyy9U_!!6000000003550-55-tps-800-800.svg
    title: 开箱即用
    desc: 组件状态自动绑定，接入成本极低
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01JHzg8U1FZV5Mvt012_!!6000000000501-55-tps-800-800.svg
    title: 协议驱动
    desc: 标准JSON-Schema
  - icon: https://img.alicdn.com/imgextra/i3/O1CN0194OqFF1ui6mMT4g7O_!!6000000006070-55-tps-800-800.svg
    title: 场景复用
    desc: 基于协议驱动，抽象场景组件
  - icon: https://img.alicdn.com/imgextra/i4/O1CN018vDmpl2186xdLu6KI_!!6000000006939-55-tps-800-800.svg
    title: 调试友好
    desc: 天然对接Formily DevTools
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: 智能提示
    desc: 拥抱Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## 安装

```bash
$ npm install --save @formily/core @formily/react

```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React, { useMemo } from 'react'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer,
} from '@formily/react'
import { Input, Form } from 'antd'

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field = useField()
  return (
    <Form.Item
      label={field.title}
      help={field.selfErrors?.length ? field.selfErrors : undefined}
      extra={field.description}
      validateStatus={field.validateStatus}
    >
      {children}
    </Form.Item>
  )
})

/*
 * 以上逻辑都已经在 @formily/antd 中实现，实际使用无需重复编写
 */

//切换内置校验国际化文案为英文
setValidateLanguage('en')

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))

  const createPasswordEqualValidate = (equalName) => (field) => {
    if (
      form.values.confirm_password &&
      field.value &&
      form.values[equalName] !== field.value
    ) {
      field.selfErrors = ['Password does not match Confirm Password.']
    } else {
      field.selfErrors = []
    }
  }

  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
        <Field
          name="password"
          title="Password"
          required
          decorator={[FormItem]}
          component={[Input, { type: 'password', placeholder: 'Please Input' }]}
          reactions={createPasswordEqualValidate('confirm_password')}
        />
        <Field
          name="confirm_password"
          title="Confirm Password"
          required
          decorator={[FormItem]}
          component={[Input, { type: 'password', placeholder: 'Please Input' }]}
          reactions={createPasswordEqualValidate('password')}
        />
        <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
      </Form>
    </FormProvider>
  )
}
```
