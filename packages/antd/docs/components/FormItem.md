# FormItem

> 表单字段组件，用于展示布局。

## Markup Schema 案例

```tsx
import React from 'react'
import { Form, Input as NextInput, Select } from 'antd';
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框输入框输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
        // description="description"
        x-decorator-props={{
            // help: 'help',
            extra: 'extra',
            labelWidth: 100,
            addonBefore: 'addonBefore',
            addonAfter: 'addonAfter',
        }}
      />
      <SchemaField.String
        name="select"
        title="下拉框"
        x-decorator="FormItem"
        x-component="Select"
        required
        // description="description"
        x-decorator-props={{
            // help: 'help',
            fullness: true,
            extra: 'extra',
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
    <Form.Item labelCol={4} validateStatus="error" label="hello" help="help" extra="extra">
        <NextInput />
    </Form.Item>
  </FormProvider>
)
```

## JOSN Schema 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="input"
      title="输入框"
      required
      decorator={[FormItem]}
      component={[
        Input,
        {
          style: {
            width: 240,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### FormItem

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| colon  | boolean | 冒号 | true    |
| tooltip  | ReactNode | 问号提示 | -    |
| labelAlign  | `"left"` \| `"right"` | 标签文本对齐方式 | `"right"`    |
| labelWrap  | boolean | 标签换⾏，否则出现省略号，hover有tooltip | false    |
| labelWidth  | number | 标签固定宽度 | -    |
| wrapperWidth  | number | 内容固定宽度 | -    |
| labelCol  | number | 标签⽹格所占列数，和内容列数加起来总和为24 | -    |
| wrapperCol  | number | 内容⽹格所占列数，和标签列数加起来总和为24 | -    |
| wrapperAlign  | `"left"` \| `"right"` | 内容文本对齐方式⻬ | `"left"`    |
| wrapperWrap  | boolean | 内容换⾏，否则出现省略号，hover有tooltip | false    |
| fullness  | boolean | 内容撑满 | false    |
| addonBefore  | ReactNode | 前缀内容 | -    |
| addonAfter  | ReactNode | 后缀内容 | -    |
| size  | `"small"` \| `"default"` \| `"large"` | 尺⼨ | -    |
| inset  | boolean | 是否是内嵌布局 | false    |
| extra  | ReactNode | 扩展描述⽂案 | -    |
| feedbackText  | ReactNode | 反馈⽂案 | -    |
| feedbackLayout  | `"loose"` \| `"terse"` \| `"popover"` | 反馈布局 | -    |
| feedbackStatus  | `"error"` \| `"warning"` \| `"success"` \| `"pending"` | 反馈布局 | -    |
| feedbackIcon  | ReactNode | 反馈图标 | -    |
| asterisk  | boolean | 星号提醒 | -    |
| gridSpan  | number | ⽹格布局占宽 | -    |
| bordered  | boolean | 是否有边框 | -    |

