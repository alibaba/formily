# useFormEffects

## 描述

主要在自定义组件中往当前[Form](https://core.formilyjs.org/zh-CN/api/models/form)实例注入副作用逻辑，用于实现一些较为复杂的场景化组件

<Alert>
注意：在effects函数内监听onFormInit是无效的，因为渲染到当前组件，Form早已初始化，同时effects函数是只会执行一次，所以想要依赖useState的数据，请使用useRef的引用数据
</Alert>

## 签名

```ts
interface useFormEffects {
  (form: Form): void
}
```

## 用例

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { FormProvider, Field, useFormEffects } from '@formily/react'
import { Input, Form } from 'antd'

const form = createForm({
  effects() {
    onFieldReact('custom.aa', (field) => {
      field.value = field.query('input').get('value')
    })
  },
})

const Custom = () => {
  useFormEffects(() => {
    onFieldReact('custom.bb', (field) => {
      field.value = field.query('.aa').get('value')
    })
  })
  return (
    <div>
      <Field name="aa" decorator={[Form.Item]} component={[Input]} />
      <Field name="bb" decorator={[Form.Item]} component={[Input]} />
    </div>
  )
}

export default () => (
  <FormProvider form={form}>
    <Field name="input" decorator={[Form.Item]} component={[Input]} />
    <Field name="custom" decorator={[Form.Item]} component={[Custom]} />
  </FormProvider>
)
```
