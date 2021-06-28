# Submit

> 提交按钮

## 普通提交

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

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 防重复提交(Loading)

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

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit
        onSubmit={(values) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log(values)
              resolve()
            }, 2000)
          })
        }}
        onSubmitFailed={console.log}
      >
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

按钮相关的 API 属性，我们参考 https://ant.design/components/button-cn/ 即可，剩下是 Submit 组件独有的 API 属性

| 属性名          | 类型                                                                                             | 描述                                  | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ |
| onClick         | `(event: MouseEvent) => void \| boolean`                                                         | 点击事件，如果返回 false 可以阻塞提交 | -      |
| onSubmit        | `(values: any) => Promise<any> \| any`                                                           | 提交事件回调                          | -      |
| onSubmitSuccess | (payload: any) => void                                                                           | 提交成功响应事件                      | -      |
| onSubmitFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | 提交校验失败事件回调                  | -      |
