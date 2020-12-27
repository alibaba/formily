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
          maxItems={3}
          x-component="ArrayItems"
        >
          <SchemaField.Object>
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
                x-decorator="Editable"
                required
                x-component="Input"
              />
              <SchemaField.String
                x-decorator="Editable"
                required
                enum={[
                  {
                    label: '选项1',
                    value: 1,
                  },
                  {
                    label: '选项2',
                    value: 2,
                  },
                  {
                    label: '选项3',
                    value: 3,
                  },
                ]}
                x-component="Radio.Group"
              />
              <SchemaField.String
                x-decorator="Editable"
                required
                x-component="DatePicker.RangePicker"
              />
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
