# useParentForm

## 描述

用于读取最近的 Form 或者 ObjectField 实例，主要方便于调用子表单的 submit/validate

## 签名

```ts
interface useParentForm {
  (): Form | ObjectField
}
```

## 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  ObjectField,
  VoidField,
  observer,
  useParentForm,
} from '@formily/react'

const form = createForm()

const Custom = observer(() => {
  const form = useParentForm()
  return <div>{form.displayName}</div>
})

export default () => (
  <FormProvider form={form}>
    <ObjectField name="object">
      <Custom />
    </ObjectField>
    <Custom />
    <VoidField name="void">
      <Custom />
    </VoidField>
  </FormProvider>
)
```
