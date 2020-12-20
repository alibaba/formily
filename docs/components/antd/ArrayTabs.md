```tsx
import React from 'react'
import { FormTab, FormItem, Input, ArrayTabs } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
    ArrayTabs
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
        <SchemaField.Markup
          name="array"
          x-decorator="FormItem"
          type="array"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.Markup
            x-decorator="FormItem"
            required
            name="aaa"
            type="string"
            x-component="Input"
          />
          <SchemaField.Markup
            x-decorator="FormItem"
            required
            name="bbb"
            type="string"
            x-component="Input"
          />
        </SchemaField.Markup>
      </SchemaField>
    </FormProvider>
  )
}
```
