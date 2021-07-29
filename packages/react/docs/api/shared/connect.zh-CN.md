# connect

## 描述

主要用于对第三方组件库的无侵入接入 Formily

## 签名

```ts
interface IComponentMapper<T extends React.FC> {
  (target: T): React.FC
}
interface connect<T extends React.FC> {
  (target: T, ...args: IComponentMapper<T>[]): React.FC
}
```

入参传入第一个参数是要接入的组件，后面的参数都是组件映射器，每个映射器都是一个函数，通常我们会使用内置的[mapProps](/api/shared/map-props)和[mapReadPretty](/api/shared/map-read-pretty)映射器

## 用例

```tsx
import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@formily/react'
import { Input, Form, Button } from 'antd'

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
        help: field.errors?.length ? field.errors : undefined,
      }
    }
  )
)

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
