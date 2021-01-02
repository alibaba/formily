```tsx
import React from 'react'
import { FormTab, FormItem, Input, ArrayTabs } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
    ArrayTabs,
  },
})

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key,
  }))

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.String
            x-decorator="FormItem"
            required
            name="aaa"
            x-component="Input"
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
```
