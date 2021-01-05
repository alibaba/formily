# Checkbox

> 复选框

### Markup Schema 案例

```tsx
import React from 'react'
import { Checkbox, FormItem } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Boolean
        name="single"
        title="是否确认"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaField.String
        name="multiple"
        title="复选"
        enum={[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]}
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
    </SchemaField>
  </FormProvider>
)
```

### JSON Schema 案例

```tsx
import React from 'react'
import { Checkbox, FormItem } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    single: {
      type: 'boolean',
      title: '是否确认',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
    },
    multiple: {
      type: 'array',
      title: '复选',
      enum: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
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

参考 https://ant.design/components/checkbox-cn/
