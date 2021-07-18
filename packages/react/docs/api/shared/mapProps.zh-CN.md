# mapProps

## 描述

将[Field](https://core.formilyjs.org/api/models/field)属性与组件属性映射的适配器函数，主要与 connect 函数搭配使用

## 签名

```ts
import { Field, GeneralField } from '@formily/core'
type IStateMapper<Props> =
  | {
      [key in keyof Field]?: keyof Props | boolean
    }
  | ((props: Props, field: GeneralField) => Props)

interface mapProps<T extends React.FC> {
  (...args: IStateMapper<React.ComponentProps<T>>[]): React.FC
}
```

- 参数可以传对象(key 是 field 的属性，value 是组件的属性，如果 value 为 true，代表映射的属性名相同)
- 参数可以传函数，函数可以直接对属性做更复杂的映射

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
