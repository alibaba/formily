# Select

> 下拉框组件

## Markup Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { LoadingOutlined } from '@ant-design/icons'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]}
        x-component-props={{
          style: {
            width: 120,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Markup Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const useAsyncDataSource = (
  pattern: Formily.Core.Types.FormPathPattern,
  service: (
    field: Formily.Core.Models.Field
  ) => Promise<{ label: string; value: any }[]>
) => {
  onFieldReact(pattern, (field) => {
    field.setComponentProps({
      suffixIcon: <LoadingOutlined />,
    })
    service(field).then(
      action((data) => {
        field.setDataSource(data)
        field.setComponentProps({
          suffixIcon: undefined,
        })
      })
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async (field) => {
      const linkage = field.query('linkage').get('value')
      if (!linkage) return []
      return new Promise((resolve) => {
        setTimeout(() => {
          if (linkage === 1) {
            resolve([
              {
                label: 'AAA',
                value: 'aaa',
              },
              {
                label: 'BBB',
                value: 'ccc',
              },
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
              },
              {
                label: 'DDD',
                value: 'ddd',
              },
            ])
          }
        }, 1500)
      })
    })
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="linkage"
        title="联动选择框"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: '发请求1', value: 1 },
          { label: '发请求2', value: 2 },
        ]}
        x-component-props={{
          style: {
            width: 120,
          },
        }}
      />
      <SchemaField.String
        name="select"
        title="异步选择框"
        x-decorator="FormItem"
        x-component="Select"
        x-component-props={{
          style: {
            width: 120,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```
