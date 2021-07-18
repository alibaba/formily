---
order: 3
---

# VoidField

## Description

As @formily/core's [createVoidField](https://core.formilyjs.org/api/models/form#createvoidfield) React implementation, it is a bridge component specifically used to bind ViewModel and virtual layout controls. Used to control the display and hide of data type fields, interactive mode, etc., VoidField component properties refer to [IVoidFieldFactoryProps](https://core.formilyjs.org/api/models/form#ivoidfieldfactoryprops)

<Alert>
When we use the VoidField component, we must remember to pass the name attribute.
</Alert>

## Signature

```ts
type VoidField = React.FC<IVoidFieldFactoryProps>
```

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field, VoidField } from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Space>
      <VoidField name="layout">
        <Field name="input" component={[Input]} />
      </VoidField>
      <FormConsumer>
        {() => (
          <Space>
            <Button
              onClick={() => {
                form
                  .query('layout')
                  .take()
                  .setState((state) => {
                    state.visible = !state.visible
                  })
              }}
            >
              {form.query('layout').get('visible') ? 'Hide' : 'Show'}
            </Button>
            <div>{JSON.stringify(form.values, null, 2)}</div>
          </Space>
        )}
      </FormConsumer>
    </Space>
  </FormProvider>
)
```

This example demonstrates how to use VoidField to control the display and hiding of child nodes. Observe that when the VoidField is hidden, the data of the child nodes will be cleared at the same time, because visible is false, which means display is none. This kind of hiding does not retain the field value.

But when it is displayed again, the scene will be restored again. This is the internal feature of Formily Core, which supports the ability to completely restore the scene.
