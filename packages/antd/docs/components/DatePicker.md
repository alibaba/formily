# DatePicker

> 日期选择器

### Markup Schema 案例

```tsx
import React from 'react'
import { DatePicker, FormItem } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Schema } from '@formily/json-schema'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="date"
        title="普通日期"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="week"
        title="周选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.String
        name="month"
        title="月选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.String
        name="quarter"
        title="财年选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.String
        name="year"
        title="年选择"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
      <SchemaField.String
        name="[startDate,endDate]"
        title="日期范围"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          showTime: true,
        }}
      />
      <SchemaField.String
        name="range_week"
        title="周选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.String
        name="range_month"
        title="月选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.String
        name="range_quarter"
        title="财年选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.String
        name="range_year"
        title="年选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

### JSON Schema 案例

```tsx
import React from 'react'
import { DatePicker, FormItem } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    date: {
      title: '普通日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      type: 'string',
    },
    week: {
      title: '周选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'string',
    },
    month: {
      title: '月选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'string',
    },
    quarter: {
      title: '财年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'string',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: '日期范围',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
    range_week: {
      title: '周选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'string',
    },
    range_month: {
      title: '月选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'string',
    },
    range_quarter: {
      title: '财年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'string',
    },
    range_year: {
      name: 'range_year',
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
  </FormProvider>
)
```

### JOSN Schema 案例

### API

参考 https://ant.design/components/date-picker-cn/
