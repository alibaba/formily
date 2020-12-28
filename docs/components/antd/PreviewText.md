```tsx
import React from 'react'
import { PreviewText, FormItem } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Form } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Markup
            type="string"
            x-decorator="FormItem"
            title="文本预览"
            x-component="PreviewText.Input"
            default={'Hello world'}
          />
          <SchemaField.Markup
            type="string"
            x-decorator="FormItem"
            title="选择项预览"
            x-component="PreviewText.Select"
            x-component-props={{
              mode: 'multiple',
            }}
            default={['123', '222']}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.Markup
            type="string"
            x-decorator="FormItem"
            title="日期预览"
            x-component="PreviewText.DatePicker"
            default={'2020-11-23 22:15:20'}
          />
          <SchemaField.Markup
            type="string"
            x-decorator="FormItem"
            title="Cascader预览"
            x-component="PreviewText.Cascader"
            default={['hangzhou', 'yuhang']}
            enum={[
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '余杭',
                value: 'yuhang',
              },
            ]}
          />
        </SchemaField>
      </FormProvider>
    </Form>
  )
}
```
