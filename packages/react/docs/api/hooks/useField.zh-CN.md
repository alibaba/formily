# useField

## 描述

主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 Field 组件的子树内都能使用，注意，拿到的是[GeneralField](https://core.formilyjs.org/zh-CN/api/models/field#generalfield)，如果需要对不同类型的字段做处理，请使用[Type Checker](https://core.formilyjs.org/zh-CN/api/entry/form-checker)

<Alert>
注意：如果要在自定义组件内使用useField，并响应字段模型变化，那需要给自定义组件包装observer
</Alert>

## 签名

```ts
interface useField {
  (): Field
}
```

## 用例

```tsx
import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer,
} from '@formily/react'
import { Input, Form, Button } from 'antd'

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

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))
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
        <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
        <Button
          type="primary"
          onClick={() => {
            form.submit(console.log)
          }}
        >
          Submit
        </Button>
      </Form>
    </FormProvider>
  )
}
```
