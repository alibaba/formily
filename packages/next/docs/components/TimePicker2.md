# TimePicker2

> Time 选择器

## Markup Schema Example

```tsx
import React from 'react'
import { TimePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TimePicker2,
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
        x-decorator="FormItem"
        x-component="TimePicker2"
      />
      <SchemaField.String
        name="[startTime,endTime]"
        title="Time Range"
        x-decorator="FormItem"
        x-component="TimePicker2.RangePicker"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema Case

```tsx
import React from 'react'
import { TimePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TimePicker2,
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
      'x-component': 'TimePicker2',
      type: 'string',
    },
    '[startTime,endTime]': {
      title: 'Time Range',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker2.RangePicker',
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
import { TimePicker2, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="time"
      title="Time"
      decorator={[FormItem]}
      component={[TimePicker2]}
    />
    <Field
      name="[startTime,endTime]"
      title="Time Range"
      decorator={[FormItem]}
      component={[TimePicker2.RangePicker]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

Reference https://fusion.design/pc/component/basic/time-picker2
