# DatePicker

> Date Picker

## Markup Schema example

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
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
        required
        title="normal date"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="week"
        title="Week Selection"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.String
        name="month"
        title="Month Selection"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.String
        name="quarter"
        title="Financial Year Selection"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.String
        name="year"
        title="Year selection"
        x-decorator="FormItem"
        x-component="DatePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
      <SchemaField.String
        name="[startDate,endDate]"
        title="Date Range"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          showTime: true,
        }}
      />
      <SchemaField.String
        name="range_week"
        title="Week range selection"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'week',
        }}
      />
      <SchemaField.String
        name="range_month"
        title="Month Range Selection"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'month',
        }}
      />
      <SchemaField.String
        name="range_quarter"
        title="Financial Year Range Selection"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'quarter',
        }}
      />
      <SchemaField.String
        name="range_year"
        title="Year range selection"
        x-decorator="FormItem"
        x-component="DatePicker.RangePicker"
        x-component-props={{
          picker: 'year',
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
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
      title: 'Normal date',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      type: 'string',
    },
    week: {
      title: 'Week Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'string',
    },
    month: {
      title: 'Month Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'string',
    },
    quarter: {
      title: 'Fiscal Year Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'string',
    },
    year: {
      title: 'Year selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        picker: 'year',
      },
      type: 'string',
    },
    '[startDate,endDate]': {
      title: 'Date range',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
    range_week: {
      title: 'Week range selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'week',
      },
      type: 'string',
    },
    range_month: {
      title: 'Month Range Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'month',
      },
      type: 'string',
    },
    range_quarter: {
      title: 'Financial year range selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-component-props': {
        picker: 'quarter',
      },
      type: 'string',
    },
    range_year: {
      name: 'range_year',
      title: 'Year range selection',
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
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import { DatePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="date"
      title="date selection"
      decorator={[FormItem]}
      component={[DatePicker]}
    />
    <Field
      name="week"
      title="Week Selection"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'week',
        },
      ]}
    />
    <Field
      name="quarter"
      title="Financial Year Selection"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'month',
        },
      ]}
    />
    <Field
      name="year"
      title="Year selection"
      decorator={[FormItem]}
      component={[
        DatePicker,
        {
          picker: 'year',
        },
      ]}
    />
    <Field
      name="[startDate,endDate]"
      title="Date range selection"
      decorator={[FormItem]}
      component={[DatePicker.RangePicker]}
    />
    <Field
      name="range_week"
      title="Week range selection"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'week',
        },
      ]}
    />
    <Field
      name="range_month"
      title="Month Range Selection"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'month',
        },
      ]}
    />
    <Field
      name="range_quarter"
      title="Financial Year Range Selection"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'quarter',
        },
      ]}
    />
    <Field
      name="range_year"
      title="Year range selection"
      decorator={[FormItem]}
      component={[
        DatePicker.RangePicker,
        {
          picker: 'year',
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://ant.design/components/date-picker-cn/
