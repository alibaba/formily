```tsx
import React from 'react'
import { FormCollapse, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    Input
  }
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Markup type="void" x-component="FormCollapse">
          <SchemaField.Markup
            type="void"
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ key: '1', header: 'A1' }}
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
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ key: '2', header: 'A2' }}
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
            x-component="FormCollapse.CollapsePanel"
            x-component-props={{ key: '3', header: 'A3' }}
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
