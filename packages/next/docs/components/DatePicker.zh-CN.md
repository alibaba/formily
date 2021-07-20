# DatePicker

> 日期选择器

## Markup Schema 案例

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
        x-component="DatePicker.WeekPicker"
      />
      <SchemaField.String
        name="month"
        title="月选择"
        x-decorator="FormItem"
        x-component="DatePicker.MonthPicker"
      />
      <SchemaField.String
        name="year"
        title="年选择"
        x-decorator="FormItem"
        x-component="DatePicker.YearPicker"
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
        name="range_month"
        title="月范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          type: 'month',
        }}
      />
      <SchemaField.String
        name="range_year"
        title="年范围选择"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          type: 'year',
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
      'x-component': 'DatePicker.WeekPicker',
      type: 'string',
    },
    month: {
      title: '月选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.MonthPicker',
      type: 'string',
    },
    year: {
      title: '年选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.YearPicker',
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
    range_month: {
      title: '月范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        type: 'month',
      },
      type: 'string',
    },
    range_year: {
      name: 'range_year',
      title: '年范围选择',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        type: 'year',
      },
      type: 'string',
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="date"
      title="日期选择"
      decorator={[FormItem]}
      component={[DatePicker]}
    />
    <Field
      name="week"
      title="周选择"
      decorator={[FormItem]}
      component={[DatePicker.WeekPicker]}
    />
    <Field
      name="quarter"
      title="财年选择"
      decorator={[FormItem]}
      component={[DatePicker.MonthPicker]}
    />
    <Field
      name="year"
      title="年选择"
      decorator={[FormItem]}
      component={[DatePicker.YearPicker]}
    />
    <Field
      name="[startDate,endDate]"
      title="日期范围选择"
      decorator={[FormItem]}
      component={[DatePicker.RangePicker]}
    />
    <Field
      name="range_month"
      title="月范围选择"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          type: 'month',
        },
      ]}
    />
    <Field
      name="range_year"
      title="年范围选择"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          type: 'year',
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://fusion.design/pc/component/basic/date-picker
