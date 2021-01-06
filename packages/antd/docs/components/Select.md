# Select

> 下拉框组件

## Markup Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider, onFieldReact } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from 'mobx'

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
import { createForm, FormProvider, onFieldReact } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from 'mobx'

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
      const linkage = field.query('linkage').value
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

## JSON Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      title: '选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
      'x-component-props': {
        style: {
          width: 120,
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

## JOSN Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider, onFieldReact } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const loadData = async (field) => {
  const linkage = field.query('linkage').value
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
}

const useAsyncDataSource = (service) => (field) => {
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
}

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    linkage: {
      type: 'string',
      title: '联动选择框',
      enum: [
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
    },
    select: {
      type: 'string',
      title: '异步选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 120,
        },
      },
      'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} scope={{ useAsyncDataSource, loadData }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 同步数据源案例

## 纯 JSX 异步联动数据源案例

## API

参考 https://ant.design/components/select-cn/
