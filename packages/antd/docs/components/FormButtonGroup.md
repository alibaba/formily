# FormButtonGroup

> 表单按钮组布局组件

## 普通案例

```tsx
import React from 'react'
import { FormButtonGroup, Submit, Reset, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm, createSchemaField } from '@formily/react'
import { Button, Form } from 'antd'

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
import { FormProvider, createForm, createSchemaField } from '@formily/react'
import { Button, Form } from 'antd'

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
import { FormProvider, createForm, createSchemaField } from '@formily/react'
import { Button, Form } from 'antd'

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

> 该组件主要用来处理按钮组间隙

| 属性名 | 类型                        | 描述     | 默认值   |
| ------ | --------------------------- | -------- | -------- |
| gutter | number                      | 间隙大小 | 8px      |
| align  | `'left'\|'center'\|'right'` | 对齐方式 | `'left'` |

### FormButtonGroup.FormItem

> 该组件主要用来处理按钮组与主表单 FormItem 对齐问题

参考 https://ant.design/components/form-cn/ 中的 FormItem 属性

### FormButtonGroup.Sticky

> 该组件主要用来处理按钮组浮动定位问题

| 属性名 | 类型                        | 描述     | 默认值   |
| ------ | --------------------------- | -------- | -------- |
| align  | `'left'\|'center'\|'right'` | 对齐方式 | `'left'` |
