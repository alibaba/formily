# mapReadPretty

## 描述

因为大多数第三方组件都不支持阅读态，如果想要快速支持阅读态的话，即可使用 mapReadPretty 函数来映射一个阅读态组件

## 签名

```ts
interface mapReadPretty<Target extends React.FC> {
  (component: Target, readPrettyProps?: React.ComponentProps<Target>): React.FC
}
```

## 用例

```tsx
import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  Field,
  connect,
  mapProps,
  mapReadPretty,
} from '@formily/react'
import { Input as AntdInput, Form } from 'antd'

// FormItem UI组件
const FormItem = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)

const Input = connect(
  AntdInput,
  mapReadPretty(({ value }) => <div>{value}</div>)
)

export default () => {
  const form = useMemo(() =>
    createForm({ validateFirst: true, readPretty: true })
  )
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
      </Form>
    </FormProvider>
  )
}
```
