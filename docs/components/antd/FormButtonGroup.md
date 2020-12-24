```tsx
import React from 'react'
import { FormButtonGroup, Submit, Reset, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Form, Space } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <SchemaField>
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup>
          <Space>
            <Submit onSubmit={console.log}>提交</Submit>
            <Reset>重置</Reset>
          </Space>
        </FormButtonGroup>
      </Form>
    </FormProvider>
  )
}
```
