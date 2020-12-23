```tsx
import React from 'react'
import { FormTab, FormItem, Input, ArrayItems } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Space,
    FormTab,
    Input,
    ArrayItems
  }
})

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key
  }))

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          title="数组项"
          x-decorator="FormItem"
          maxItems={3}
          x-component="ArrayItems"
        >
          <SchemaField.Void x-component="Space">
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.Index"
            />
            <SchemaField.String
              x-decorator="FormItem"
              required
              x-component="Input"
            />
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.Remove"
            />
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.MoveUp"
            />
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.MoveDown"
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayItems.Addition" />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
```
