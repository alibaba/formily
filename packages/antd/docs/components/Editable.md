# Editable

> 局部编辑器，对于一些空间要求较高的表单区域可以使用该组件
>
> Editable 组件相当于是 FormItem 组件的变体，所以通常放在 decorator 中

## Markup Schema 案例

```tsx
import React from 'react'
import {
  Input,
  DatePicker,
  Editable,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
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
      <SchemaField.Void
        title="虚拟节点容器"
        x-component="Editable.Popover"
        x-component-props={{
          renderPreview: (field) => {
            return field.query('.date2').value
          },
        }}
      >
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
      <SchemaField.Object
        name="iobject"
        title="对象节点容器"
        x-component="Editable.Popover"
        x-component-props={{
          renderPreview: (field) => {
            return field.value?.date
          },
        }}
      >
        <SchemaField.String
          name="date"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
        />
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Object>
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
import {
  Input,
  DatePicker,
  Editable,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
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

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      title: '日期',
      'x-decorator': 'Editable',
      'x-component': 'DatePicker',
    },
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'Editable',
      'x-component': 'Input',
    },
    void: {
      type: 'void',
      title: '虚拟节点容器',
      'x-component': 'Editable.Popover',
      'x-component-props': {
        renderPreview: "{{(field) => field.query('.date2').value}}",
      },
      properties: {
        date2: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input2: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    iobject: {
      type: 'object',
      title: '对象节点容器',
      'x-component': 'Editable.Popover',
      'x-component-props': {
        renderPreview: '{{(field) => field.value && field.value.date}}',
      },
      properties: {
        date: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
        },
        input: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
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

### Editable

### Editable.Popover
