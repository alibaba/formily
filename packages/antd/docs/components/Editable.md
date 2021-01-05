# Editable

> 局部编辑器，对于一些空间要求较高的表单区域可以使用该组件
>
> Editable 组件相当于是 FormItem 组件的变体，所以通常放在 decorator 中

## Markup Schema 案例

```tsx
import React from 'react'
import { Input, DatePicker, Editable, FormItem } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Schema } from '@formily/json-schema'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    Editable,
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="date"
        title="日期"
        x-decorator="Editable"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="input"
        title="输入框"
        x-decorator="Editable"
        x-component="Input"
      />
      <SchemaField.Void title="局部区块" x-component="Editable.Popover">
        <SchemaField.String
          name="date2"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaField.String
          name="input2"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Void>
    </SchemaField>
  </FormProvider>
)
```

## JSON Schema 案例

## API

### Editable

### Editable.Popover
