---
order: 2
---

# ObjectField

## Description

As @formily/core's [createObjectField](https://core.formilyjs.org/api/models/form#createobjectfield) React implementation, it is a bridge component specifically used to bind ViewModel and input controls, ObjectField component Property reference [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

<Alert>
When we use the ObjectField component, we must remember to pass the name attribute. At the same time, use render props to organize sub-components
</Alert>

## Signature

```ts
type ObjectField = React.FC<IFieldFactoryProps>
```

## Custom component use case

```tsx
import React from 'react'
import { createForm, ObjectField as ObjectFieldType } from '@formily/core'
import {
  FormProvider,
  Field,
  ObjectField,
  useField,
  observer,
} from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

const ObjectComponent = observer(() => {
  const field = useField<ObjectFieldType>()
  return (
    <>
      <div>
        {Object.keys(field.value || {}).map((key) => (
          <div key={key} style={{ display: 'flex-block', marginBottom: 10 }}>
            <Space>
              <Field name={key} component={[Input, { placeholder: key }]} />
              <Button
                onClick={() => {
                  field.removeProperty(key)
                }}
              >
                Remove
              </Button>
            </Space>
          </div>
        ))}
      </div>
      <Space>
        <Field
          name="propertyName"
          basePath={''}
          required
          component={[Input, { placeholder: 'Property Name' }]}
        />
        <Button
          onClick={() => {
            const name = form.values.propertyName
            if (name && !form.existValuesIn(`${field.path}.${name}`)) {
              field.addProperty(name, '')
              form.deleteValuesIn('propertyName')
            }
          }}
        >
          Add
        </Button>
      </Space>
    </>
  )
})

export default () => (
  <FormProvider form={form}>
    <ObjectField name="object" component={[ObjectComponent]} />
  </FormProvider>
)
```

## RenderProps use cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, ObjectField } from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <ObjectField name="object">
      {(field) => {
        return (
          <>
            <div>
              {Object.keys(field.value || {}).map((key) => (
                <div
                  key={key}
                  style={{ display: 'flex-block', marginBottom: 10 }}
                >
                  <Space>
                    <Field
                      name={key}
                      component={[Input, { placeholder: key }]}
                    />
                    <Button
                      onClick={() => {
                        field.removeProperty(key)
                      }}
                    >
                      Remove
                    </Button>
                  </Space>
                </div>
              ))}
            </div>
            <Space>
              <Field
                name="propertyName"
                basePath={''}
                required
                component={[Input, { placeholder: 'Property Name' }]}
              />
              <Button
                onClick={() => {
                  const name = form.values.propertyName
                  if (name && !form.existValuesIn(`${field.path}.${name}`)) {
                    field.addProperty(name, '')
                    form.deleteValuesIn('propertyName')
                  }
                }}
              >
                Add
              </Button>
            </Space>
          </>
        )
      }}
    </ObjectField>
  </FormProvider>
)
```
