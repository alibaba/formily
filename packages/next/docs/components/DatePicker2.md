# DatePicker2

> Date Picker

## Markup Schema example

```tsx
import React from 'react'
import { DatePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker2,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="date"
        title="normal date"
        x-decorator="FormItem"
        x-component="DatePicker2"
      />
      <SchemaField.String
        name="week"
        title="Week Selection"
        x-decorator="FormItem"
        x-component="DatePicker2.WeekPicker"
      />
      <SchemaField.String
        name="month"
        title="Month Selection"
        x-decorator="FormItem"
        x-component="DatePicker2.MonthPicker"
      />
      <SchemaField.String
        name="year"
        title="Year selection"
        x-decorator="FormItem"
        x-component="DatePicker2.YearPicker"
      />
      <SchemaField.String
        name="[startDate,endDate]"
        title="Date Range"
        x-decorator="FormItem"
        x-component="DatePicker2.RangePicker"
        x-component-props={{
          showTime: true,
        }}
      />
      <SchemaField.String
        name="range_month"
        title="Month Range Selection"
        x-decorator="FormItem"
        x-component="DatePicker2.RangePicker"
        x-component-props={{
          mode: 'month',
        }}
      />
      <SchemaField.String
        name="range_year"
        title="Year range selection"
        x-decorator="FormItem"
        x-component="DatePicker2.RangePicker"
        x-component-props={{
          mode: 'year',
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
import { DatePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker2,
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
      'x-component': 'DatePicker2',
      type: 'string',
    },
    week: {
      title: 'Week Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.WeekPicker',
      type: 'string',
    },
    month: {
      title: 'Month Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.MonthPicker',
      type: 'string',
    },
    year: {
      title: 'Year selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.YearPicker',
      type: 'string',
    },
    '[startDate,endDate]': {
      title: 'Date range',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.RangePicker',
      'x-component-props': {
        showTime: true,
      },
      type: 'string',
    },
    range_month: {
      title: 'Month Range Selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.RangePicker',
      'x-component-props': {
        mode: 'month',
      },
      type: 'string',
    },
    range_year: {
      name: 'range_year',
      title: 'Year range selection',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker2.RangePicker',
      'x-component-props': {
        mode: 'year',
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
import { DatePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="date"
      title="date selection"
      decorator={[FormItem]}
      component={[DatePicker2]}
    />
    <Field
      name="week"
      title="Week Selection"
      decorator={[FormItem]}
      component={[DatePicker2.WeekPicker]}
    />
    <Field
      name="quarter"
      title="Financial Year Selection"
      decorator={[FormItem]}
      component={[DatePicker2.MonthPicker]}
    />
    <Field
      name="year"
      title="Year selection"
      decorator={[FormItem]}
      component={[DatePicker2.YearPicker]}
    />
    <Field
      name="[startDate,endDate]"
      title="Date range selection"
      decorator={[FormItem]}
      component={[DatePicker2.RangePicker]}
    />
    <Field
      name="range_month"
      title="Month Range Selection"
      decorator={[FormItem]}
      component={[
        DatePicker2.RangePicker,
        {
          mode: 'month',
        },
      ]}
    />
    <Field
      name="range_year"
      title="Year range selection"
      decorator={[FormItem]}
      component={[
        DatePicker2.RangePicker,
        {
          mode: 'year',
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

Reference https://fusion.design/pc/component/basic/date-picker2
