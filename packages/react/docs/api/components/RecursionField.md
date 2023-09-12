---
order: 5
---

# RecursionField

## Description

The recursive rendering component is mainly based on [JSON-Schema](/api/shared/schema) for recursive rendering. It is the core rendering component inside the [SchemaField](/api/components/schema-field) component. Of course, it can It is used separately from SchemaField. When we use it, it is mainly used in custom components to implement custom components with recursive rendering capabilities.

## Signature

```ts
interface IRecursionFieldProps {
  schema: ISchema //Field schema
  name?: string //Path name
  basePath?: FormPathPattern //base path
  propsRecursion?: boolean //Whether to recursiveliy pass mapProperties and filterProperties
  onlyRenderProperties?: boolean //Whether to only render properties
  onlyRenderSelf?: boolean //Whether to only render itself without rendering properties
  mapProperties?: (schema: Schema, name: string) => Schema //schema properties mapper, mainly used to rewrite the schema
  filterProperties?: (schema: Schema, name: string) => boolean //schema properties filter, the filtered schema nodes will not be rendered
}

type RecursionField = React.FC<React.PropsWithChildren<IRecursionFieldProps>>
```

## Example

### Simple recursion

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecursionField } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const Custom = (props) => {
  return <RecursionField schema={props.schema} onlyRenderProperties />
}

const SchemaField = createSchemaField({
  components: {
    Custom,
    Input,
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
                'x-component': 'Input',
              },
            },
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

We can read independent schema objects from component properties and pass them to RecursionField for rendering

### Incremental list recursion

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
  useField,
  useFieldSchema,
  observer,
} from '@formily/react'
import { Input, Space, Button } from 'antd'

const form = createForm()

const ArrayItems = observer((props) => {
  const field = useField()
  const schema = useFieldSchema()
  return (
    <div>
      {props.value?.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: 10 }}>
            <Space>
              <RecursionField schema={schema.items} name={index} />
              <Button
                onClick={() => {
                  field.remove(index)
                }}
              >
                Remove
              </Button>
            </Space>
          </div>
        )
      })}
      <Button
        onClick={() => {
          field.push({})
        }}
      >
        Add
      </Button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array name="custom" x-component="ArrayItems">
        <SchemaField.Object>
          <SchemaField.String name="input" x-component="Input" />
        </SchemaField.Object>
      </SchemaField.Array>
    </SchemaField>
  </FormProvider>
)
```

Use [useField](/api/hooks/useField) and [useFieldSchema](/api/shared/use-field-schema) to get the field instance and field schema in the current field context
