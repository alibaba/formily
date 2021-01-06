# Input

> 文本输入框

## Markup Schema 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
        x-component-props={{
          style: {
            width: 240,
          },
        }}
      />
      <SchemaField.String
        name="textarea"
        title="文本框"
        x-decorator="FormItem"
        required
        x-component="Input.TextArea"
        x-component-props={{
          style: {
            width: 400,
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

## JOSN Schema 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
    },
    textarea: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
  </FormProvider>
)
```

## 纯 JSX 案例

## API

参考 https://ant.design/components/input-cn/
