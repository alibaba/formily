# FormButtonGroup

> 表单按钮组布局组件

## 普通案例

```tsx
import React from 'react'
import { FormButtonGroup, Submit, Reset, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Form, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <SchemaField>
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Submit onSubmit={console.log}>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup.FormItem>
      </Form>
    </FormProvider>
  )
}
```

## 吸底案例

```tsx
import React from 'react'
import { FormButtonGroup, Submit, Reset, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Form, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <SchemaField>
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.Sticky>
          <FormButtonGroup.FormItem>
            <Submit onSubmit={console.log}>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup.FormItem>
        </FormButtonGroup.Sticky>
      </Form>
    </FormProvider>
  )
}
```

## 吸底居中案例

```tsx
import React from 'react'
import { FormButtonGroup, Submit, Reset, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Form, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <SchemaField>
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="输入框"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.Sticky align="center">
          <FormButtonGroup>
            <Submit onSubmit={console.log}>提交</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </Form>
    </FormProvider>
  )
}
```

## API

### FormButtonGroup

### FormButtonGroup.Sticky
