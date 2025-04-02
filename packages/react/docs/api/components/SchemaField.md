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
type ComposeSchemaField = React.FC<
  React.PropsWithChildren<ISchemaFieldProps>
> & {
  Markup: React.FC<React.PropsWithChildren<ISchema>>
  String: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Object: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Array: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Date: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  DateTime: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Boolean: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Number: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
  Void: React.FC<React.PropsWithChildren<Omit<ISchema, 'type'>>>
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

## JSON Schema ReactNode Prop Use Case （x-slot-node）

Reference [Slot](https://react.formilyjs.org/api/shared/schema#slot)

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input, Tag } from 'antd'
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    CheckCircleTwoTone,
    CloseCircleOutlined,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Tag,
      }}
      schema={{
        type: 'object',
        properties: {
          tag: {
            'x-slot-node': {
              target: 'input.x-component-props.prefix',
            },
            'x-component': 'Tag',
            'x-component-props': {
              children: 'www.',
            },
          },
          tag2: {
            'x-slot-node': {
              target: 'input.x-component-props.suffix',
            },
            'x-component': 'Tag',
            'x-component-props': {
              children: '.com',
            },
          },
          icon: {
            'x-slot-node': {
              target: 'input.x-component-props.addonAfter',
            },
            'x-component':
              '{{$form.values.input?.length > 5 ? "CheckCircleTwoTone" : "CloseCircleOutlined"}}',
          },
          input: {
            type: 'string',
            'x-component': 'Input',
            'x-component-props': {},
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```

## JSON Schema Render Prop Use Case （x-slot-node & isRenderProp）

Reference [Slot](https://react.formilyjs.org/api/shared/schema#slot)

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Rate } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    DollarOutlined,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      components={{
        Rate,
      }}
      schema={{
        type: 'object',
        properties: {
          icon: {
            'x-slot-node': {
              target: 'rate.x-component-props.character',
              isRenderProp: true,
            },
            'x-component': 'DollarOutlined',
            'x-component-props': {
              rotate: '{{ $slotArgs[0].value * 45 }}',
              style: {
                fontSize: '50px',
              },
            },
          },
          rate: {
            'x-component': 'Rate',
            'x-component-props': {
              defaultValue: 3,
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
