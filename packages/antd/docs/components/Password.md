# Password

> 密码输入框

## Markup Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

const SchemaField = createSchemaField({
  components: {
    Password,
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
        x-decorator-props={{
          labelCol: { span: 6 },
          wrapperCol: { span: 10 },
        }}
        x-component="Password"
        required
        x-component-props={{
          checkStrength: true,
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JOSN Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

const SchemaField = createSchemaField({
  components: {
    Password,
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
      'x-decorator-props': {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
      },
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
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

参考 https://ant.design/components/input-cn/
