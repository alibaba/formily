---
order: 0
---

# Field

## 描述

作为@formily/core 的 [createField](https://core.formilyjs.org/zh-CN/api/models/form#createfield) React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，Field 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops)

<Alert>
我们在使用 Field 组件的时候，一定要记得传name属性。
</Alert>

## 签名

```ts
type Field = React.FC<React.PropsWithChildren<IFieldFactoryProps>>
```

## 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input, { placeholder: 'Please Input' }]} />
  </FormProvider>
)
```
