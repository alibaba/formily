---
order: 1
---

# ArrayField

## Description

As @formily/core's [createArrayField](https://core.formilyjs.org/api/models/form#createarrayfield) React implementation, it is a bridge component specifically used to bind ViewModel and input controls, ArrayField component Property reference [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

<Alert>
When we use the ArrayField component, we must remember to pass the name attribute. At the same time, use render props to organize sub-components
</Alert>

## Signature

```ts
type ArrayField = React.FC<IFieldFactoryProps>
```

## Custom component use case

```tsx
import React from 'react'
import { createForm, ArrayField as ArrayFieldType } from '@formily/core'
import {
  FormProvider,
  Field,
  ArrayField,
  useField,
  observer,
} from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

const ArrayComponent = observer(() => {
  const field = useField<ArrayFieldType>()
  return (
    <>
      <div>
        {field.value?.map((item, index) => (
          <div key={index} style={{ display: 'flex-block', marginBottom: 10 }}>
            <Space>
              <Field name={index} component={[Input]} />
              <Button
                onClick={() => {
                  field.remove(index)
                }}
              >
                Remove
              </Button>
              <Button
                onClick={() => {
                  field.moveUp(index)
                }}
              >
                Move Up
              </Button>
              <Button
                onClick={() => {
                  field.moveDown(index)
                }}
              >
                Move Down
              </Button>
            </Space>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          field.push('')
        }}
      >
        Add
      </Button>
    </>
  )
})

export default () => (
  <FormProvider form={form}>
    <ArrayField name="array" component={[ArrayComponent]} />
  </FormProvider>
)
```

## RenderProps use cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, ArrayField } from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <ArrayField name="array">
      {(field) => {
        return (
          <>
            <div>
              {field.value?.map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex-block', marginBottom: 10 }}
                >
                  <Space>
                    <Field name={index} component={[Input]} />
                    <Button
                      onClick={() => {
                        field.remove(index)
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => {
                        field.moveUp(index)
                      }}
                    >
                      Move Up
                    </Button>
                    <Button
                      onClick={() => {
                        field.moveDown(index)
                      }}
                    >
                      Move Down
                    </Button>
                  </Space>
                </div>
              ))}
            </div>
            <Button onClick={() => field.push('')}>Add</Button>
          </>
        )
      }}
    </ArrayField>
  </FormProvider>
)
```
