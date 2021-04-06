# Password

> 密码输入框

## Markup Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Form } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    Password,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Password"
          required
          x-component-props={{
            checkStrength: true,
          }}
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Form } from '@alifd/next'
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
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import { Password, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Form } from '@alifd/next'
const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
      <Field
        name="input"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[
          Password,
          {
            checkStrength: true,
          },
        ]}
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  </FormProvider>
)
```

## API

参考 https://fusion.design/pc/component/basic/input
