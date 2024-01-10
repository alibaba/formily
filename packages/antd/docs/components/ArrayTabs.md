# ArrayTabs

> Self-increasing tab, you can consider using this component for scenarios with high vertical space requirements
>
> Note: This component is only applicable to Schema scenarios, please avoid cross-tab linkage in interaction

## Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTabs,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTabs,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          x-decorator="FormItem"
          title="string array"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.String
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          title="Object array"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.Object>
            <SchemaField.String
              x-decorator="FormItem"
              title="AAA"
              name="aaa"
              required
              x-component="Input"
            />
            <SchemaField.String
              x-decorator="FormItem"
              title="BBB"
              name="bbb"
              required
              x-component="Input"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTabs,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTabs,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      title: 'String array',
      'x-decorator': 'FormItem',
      maxItems: 3,
      'x-component': 'ArrayTabs',
      items: {
        type: 'string',
        'x-decorator': 'FormItem',
        required: true,
        'x-component': 'Input',
      },
    },
    array: {
      type: 'array',
      title: 'Object array',
      'x-decorator': 'FormItem',
      maxItems: 3,
      'x-component': 'ArrayTabs',
      items: {
        type: 'object',
        properties: {
          aaa: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'AAA',
            required: true,
            'x-component': 'Input',
          },
          bbb: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'BBB',
            required: true,
            'x-component': 'Input',
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayTabs

Reference https://ant.design/components/tabs-cn/
