# connect

## Description

Mainly used for non-intrusive access to third-party component libraries Formily

## Signature

```ts
interface IComponentMapper<T extends React.FC> {
  (target: T): React.FC
}
interface connect<T extends React.FC> {
  (target: T, ...args: IComponentMapper<T>[]): React.FC
}
```

The first parameter passed in is the component to be connected, the following parameters are component mappers, each mapper is a function, usually we will use the built-in [mapProps](/api/shared/map- props) and [mapReadPretty](/api/shared/map-read-pretty) mapper

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
        help: field.selfErrors?.length ? field.selfErrors : undefined,
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
