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

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, useForm, observer } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const Custom = observer(() => {
  const form = useForm()
  return <div>{form.values.input}</div>
})

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input]} />
    <Field name="custom" component={[Custom]} />
  </FormProvider>
)
```
