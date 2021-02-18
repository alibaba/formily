# useField

## 描述

主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 Field 组件的子树内都能使用，注意，拿到的是[GeneralField](https://core.formilyjs.org/api/models/field#generalfield)，如果需要对不同类型的字段做处理，请使用[Type Checker](https://core.formilyjs.org/api/entry/form-checker)

## 签名

```ts
interface useField {
  (): Field
}
```

## 用例

```tsx
import React, { createContext, useMemo, useContext, useEffect } from 'react'
import { createForm, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer,
} from '@formily/react'
import { Input, Form, Button } from 'antd'
import 'antd/lib/input/style'
import 'antd/lib/form/style'

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field = useField()
  return (
    <Form.Item
      label={field.title}
      help={field.errors?.length ? field.errors : undefined}
      extra={field.description}
      validateStatus={field.validateStatus}
    >
      {children}
    </Form.Item>
  )
})

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))

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
