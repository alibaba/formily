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
} from '@formily/next'
import {
  FormProvider,
  createForm,
  onFieldReact,
  onFieldChange,
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
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

const merge = () => {}

const form = createForm({
  effects: (form) => {
    onFieldChange('input', ['value'], (field) => {
      form.setFieldState('date', (target) => {
        target.disabled = field.value == '123'
      })
    })
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          default="123"
          x-component="Input"
        />
        <SchemaField.String
          name="date"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
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
                name="config"
                x-component="Editable.Popover"
                required
                title="配置复杂数据"
                x-component-props={{ dataIndex: 'input' }}
              >
                <SchemaField.String
                  x-decorator="FormItem"
                  required
                  title="日期"
                  name="date"
                  x-component="DatePicker.RangePicker"
                  x-component-props={{ style: { width: '100%' } }}
                />
                <SchemaField.String
                  x-decorator="FormItem"
                  required
                  title="输入框"
                  name="input"
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
