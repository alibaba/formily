```tsx
import React from 'react'
import {
  FormTab,
  FormItem,
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
} from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    FormTab,
    Input,
    Select,
    ArrayItems,
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
          title="数组项"
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-component-props={{ style: { width: 200 } }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayItems.Card">
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.SortHandle"
              />
              <SchemaField.Object
                x-decorator="Editable.Popover"
                required
                title="配置复杂数据"
              >
                <SchemaField.String
                  x-decorator="FormItem"
                  required
                  title="日期"
                  x-component="DatePicker.RangePicker"
                />
                <SchemaField.String
                  x-decorator="FormItem"
                  required
                  title="输入框"
                  x-component="Input"
                />
              </SchemaField.Object>
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.Remove"
              />
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayItems.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
```
