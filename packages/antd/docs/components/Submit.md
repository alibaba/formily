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
      >
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://ant.design/components/button-cn/
