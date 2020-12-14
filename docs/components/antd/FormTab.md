```tsx
import React from 'react'
import { FormTab, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input
  }
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Markup type="void" x-component="FormTab">
          <SchemaField.Markup
            type="void"
            x-component="FormTab.TabPane"
            x-component-props={{ key: '1', tab: 'A1' }}
          >
            <SchemaField.Markup
              name="aaa"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="FormTab.TabPane"
            x-component-props={{ key: '2', tab: 'A2' }}
          >
            <SchemaField.Markup
              name="bbb"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="FormTab.TabPane"
            x-component-props={{ key: '3', tab: 'A3' }}
          >
            <SchemaField.Markup
              name="ccc"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
        </SchemaField.Markup>
      </SchemaField>
    </FormProvider>
  )
}
```
