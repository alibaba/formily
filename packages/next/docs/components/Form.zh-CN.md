# Form

> FormProvider + FormLayout + form 标签的组合组件，可以帮助我们快速实现带回车提交的且能批量布局的表单

## 使用案例

```tsx
import React from 'react'
import {
  Input,
  Select,
  Form,
  FormItem,
  FormGrid,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'

const form = createForm()

export default () => (
  <Form
    form={form}
    layout="vertical"
    feedbackLayout="terse"
    onAutoSubmit={console.log}
    onAutoSubmitFailed={console.log}
  >
    <FormGrid maxColumns={4}>
      <Field
        name="aa"
        title="选择框"
        decorator={[FormItem]}
        component={[Select]}
        dataSource={[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]}
      />
      <Field
        name="bb"
        title="输入框"
        required
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="cc"
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="dd"
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
      <Field
        name="ee"
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
      <FormButtonGroup.FormItem>
        <Submit>查询</Submit>
      </FormButtonGroup.FormItem>
    </FormGrid>
  </Form>
)
```

## Fusion 多语言

```tsx
import React from 'react'
import { Input, Form, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { ConfigProvider } from '@alifd/next'
import enUS from '@alifd/next/lib/locale/en-us'

const form = createForm()

export default () => (
  <ConfigProvider locale={enUS}>
    <Form
      form={form}
      layout="vertical"
      feedbackLayout="terse"
      onAutoSubmit={console.log}
    >
      <Field
        name="bb"
        title="User Name"
        required
        decorator={[FormItem]}
        component={[Input]}
      />

      <FormButtonGroup.FormItem>
        <Submit>Submit</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  </ConfigProvider>
)
```

<Alert style="margin-top:20px">
注意：想要实现回车提交，我们在使用Submit组件的时候不能给其传onSubmit事件，否则回车提交会失效，这样做的目的是为了防止用户同时在多处写onSubmit事件监听器，处理逻辑不一致的话，提交时很难定位问题。
</Alert>

## API

布局相关的 API 属性，我们参考 [FormLayout](./form-layout)即可，剩下是 Form 组件独有的 API 属性

| 属性名                 | 类型                                                                                                   | 描述                               | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------ |
| form                   | [Form](https://core.formilyjs.org/zh-CN/api/models/form)                                               | Form 实例                          | -      |
| component              | string                                                                                                 | 渲染组件，可以指定为自定义组件渲染 | `form` |
| previewTextPlaceholder | ReactNode                                                                                              | 预览态占位符                       | `N/A`  |
| onAutoSubmit           | `(values:any)=>any`                                                                                    | 回车提交事件回调                   | -      |
| onAutoSubmitFailed     | (feedbacks: [IFormFeedback](https://core.formilyjs.org/zh-CN/api/models/form#iformfeedback)[]) => void | 回车提交校验失败事件回调           | -      |
