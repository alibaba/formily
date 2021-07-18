# mapProps

## Description

Adapter function that maps [Field](https://core.formilyjs.org/api/models/field) attributes and component attributes, mainly used in conjunction with the connect function

## Signature

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

- Parameters can be passed objects (key is the attribute of the field, value is the attribute of the component, if the value is true, the mapped attribute name is the same)
- Parameters can be passed to functions, and functions can directly do more complex mappings to attributes

## Example

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

// FormItem UI component
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
