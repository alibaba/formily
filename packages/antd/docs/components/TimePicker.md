# TimePicker

> Time Picker

## Markup Schema example

```tsx
import React from 'react'
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TimePicker,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="time"
        title="time"
        required
        x-decorator="FormItem"
        x-component="TimePicker"
      />
      <SchemaField.String
        name="[startTime,endTime]"
        title="time range"
        x-decorator="FormItem"
        x-component="TimePicker.RangePicker"
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
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TimePicker,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    time: {
      title: 'Time',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      type: 'string',
    },
    '[startTime,endTime]': {
      title: 'Time Range',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker.RangePicker',
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
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="time"
      title="time"
      decorator={[FormItem]}
      component={[TimePicker]}
    />
    <Field
      name="[startTime,endTime]"
      title="time range"
      decorator={[FormItem]}
      component={[TimePicker.RangePicker]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://ant.design/components/time-picker-cn/
