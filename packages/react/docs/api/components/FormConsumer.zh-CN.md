---
order: 7
---

# FormConsumer

## 描述

表单响应消费者，专门用于监听表单模型数据变化而实现各种 UI 响应的组件，使用方式为 render props.

当回调函数内依赖的数据发生变化时就会重新渲染回调函数

## 签名

```ts
type FormConsumer = React.FC<{ children: (form: Form) => React.ReactNode }>
```

Form 参考[Form](https://core.formilyjs.org/api/models/form)

## 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input]} />
    <FormConsumer>{(form) => form.values.input}</FormConsumer>
  </FormProvider>
)
```
