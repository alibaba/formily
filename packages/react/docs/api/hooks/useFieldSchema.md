# useFieldSchema

## Description

Mainly read the Schema information of the current field in the custom component, this hook can only be used in the subtree of SchemaField or RecursionField

## Signature

```ts
interface useFieldSchema {
  (): Schema
}
```

Schema Reference [Schema](/api/shared/schema)

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, useFieldSchema } from '@formily/react'

const form = createForm()

const Custom = () => {
  const schema = useFieldSchema()
  return (
    <code>
      <pre>{JSON.stringify(schema.toJSON(), null, 2)}</pre>
    </code>
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Object
        name="custom"
        x-component="Custom"
        x-component-props={{
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Custom',
              },
            },
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```
