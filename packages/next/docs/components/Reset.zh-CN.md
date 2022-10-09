# Reset

> 重置按钮

## 普通重置

> 有默认值的控件无法被清空

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/next'
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
      <Reset>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 强制清空重置

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/next'
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
      <Reset forceClear>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 重置并校验

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/next'
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
      <Reset validate>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 强制清空重置并校验

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/next'
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
      <Reset forceClear validate>
        重置
      </Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### Reset

其余 API 参考 https://fusion.design/pc/component/basic/button

| 属性名                 | 类型                                                                                                   | 描述                                  | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ |
| onClick                | `(event: MouseEvent) => void \| boolean`                                                               | 点击事件，如果返回 false 可以阻塞重置 | -      |
| onResetValidateSuccess | (payload: any) => void                                                                                 | 重置校验成功事件                      | -      |
| onResetValidateFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/zh-CN/api/models/form#iformfeedback)[]) => void | 重置校验失败事件                      | -      |
