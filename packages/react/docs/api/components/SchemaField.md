---
order: 4
---

# SchemaField

## Description

The SchemaField component is a component specially used to parse [JSON-Schema](/api/shared/schema) dynamically rendering forms.
When using the SchemaField component, you need to create a SchemaField component through the createSchemaField factory function.

## Signature

```ts
//SchemaField component and its static properties
type ComposeSchemaField = React.FC<ISchemaFieldProps> & {
  Markup: React.FC<ISchema>
  String: React.FC<Omit<ISchema, 'type'>>
  Object: React.FC<Omit<ISchema, 'type'>>
  Array: React.FC<Omit<ISchema, 'type'>>
  Date: React.FC<Omit<ISchema, 'type'>>
  DateTime: React.FC<Omit<ISchema, 'type'>>
  Boolean: React.FC<Omit<ISchema, 'type'>>
  Number: React.FC<Omit<ISchema, 'type'>>
  Void: React.FC<Omit<ISchema, 'type'>>
}

//Factory function parameter attributes
interface ISchemaFieldFactoryProps {
  components?: {
    [key: string]: React.FC //Component list
  }
  scope?: any //Global scope, used to implement protocol expression variable injection
}

//SchemaField attribute
interface ISchemaFieldProps extends IFieldFactoryProps {
  schema?: ISchema //Field schema
  scope?: any //Protocol expression scope
  name?: string //Field name
  components?: {
    [key: string]: React.FC //Partial component list, note: the components passed here cannot enjoy smart prompts
  }
}

//Factory function
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): ComposeSchemaField
}
```

IFieldFactoryProps reference [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

ISchema Reference [ISchema](/api/shared/schema#ischema)

## Markup Schema Use Case

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Select } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Select,
      }}
    >
      <SchemaField.String name="input" x-component="Input" />
      <SchemaField.String
        name="select"
        x-component="Select"
        x-component-props={{
          style: {
            width: 200,
            marginTop: 20,
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

## JSON Schema Use Case

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Select } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Select,
      }}
      schema={{
        type: 'object',
        properties: {
          input: {
            type: 'string',
            'x-component': 'Input',
          },
          select: {
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              style: {
                width: 200,
                marginTop: 20,
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
