---
title: Formily-Alibaba unified front-end form solution
order: 10
hero:
  title: React Library
  desc: Alibaba Unified Form Solution
  actions:
    - text: Home Site
      link: //formilyjs.org
    - text: Development Guide
      link: /guide
features:
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: Ultra High Performance
    desc: Dependency tracking, efficient update, on-demand rendering
  - icon: https://img.alicdn.com/imgextra/i2/O1CN016i72sH1c5wh1kyy9U_!!6000000003550-55-tps-800-800.svg
    title: Out Of The Box
    desc: The component status is automatically bound, and the access cost is extremely low
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01JHzg8U1FZV5Mvt012_!!6000000000501-55-tps-800-800.svg
    title: JSON Schema Driver
    desc: Standard JSON-Schema
  - icon: https://img.alicdn.com/imgextra/i3/O1CN0194OqFF1ui6mMT4g7O_!!6000000006070-55-tps-800-800.svg
    title: Scene Reuse
    desc: Based on protocol-driven, abstract scene components
  - icon: https://img.alicdn.com/imgextra/i4/O1CN018vDmpl2186xdLu6KI_!!6000000006939-55-tps-800-800.svg
    title: Debugging Friendly
    desc: Natural docking with Formily DevTools
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01u6jHgs1ZMwXpjAYnh_!!6000000003181-55-tps-800-800.svg
    title: Smart Tips
    desc: Embrace Typescript
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## Installation

```bash
$ npm install --save @formily/core @formily/react

```

## Quick start

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

// FormItem UI component
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
 * The above logic has been implemented in @formily/antd, and there is no need to rewrite it in actual use
 */

//Switch the built-in check internationalization copy to English
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
