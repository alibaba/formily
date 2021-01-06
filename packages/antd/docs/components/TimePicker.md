# TimePicker

> 时间选择器

## Markup Schema 案例

```tsx
import React from 'react'
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Schema } from '@formily/json-schema'

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
        title="时间"
        x-decorator="FormItem"
        x-component="TimePicker"
      />
      <SchemaField.String
        name="[startTime,endTime]"
        title="时间范围"
        x-decorator="FormItem"
        x-component="TimePicker.RangePicker"
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
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

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
      title: '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      type: 'string',
    },
    '[startTime,endTime]': {
      title: '时间范围',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 案例

## API

参考 https://ant.design/components/date-picker-cn/
