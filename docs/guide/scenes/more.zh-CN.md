# 更多场景

因为 Formily 在表单层面上是一个非常完备的方案，而且还很灵活，支持的场景非常多，但是场景案例，我们无法一一列举。

所以，还是希望社区能帮助 Formily 完善更多场景案例！我们会不胜感激！😀

```tsx
import React from 'react'
import {
  FormItem,
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    Input,
    Select,
    ArrayItems,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: 'String array',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              input: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```
