---
order: 5
---

# RecursionField

## 描述

递归渲染组件，主要基于[JSON-Schema](/api/shared/schema)做递归渲染，它是[SchemaField](/api/components/schema-field)组件内部的核心渲染组件，当然，它是可以独立于 SchemaField 单独使用的，我们使用的时候主要是在自定义组件中使用，用于实现具有递归渲染能力的自定义组件

## 签名

```ts
interface IRecursionFieldProps {
  schema: Schema //schema对象
  name?: string //路径名称
  basePath?: FormPathPattern //基础路径
  onlyRenderProperties?: boolean //是否只渲染properties
  onlyRenderSelf?: boolean //是否只渲染自身，不渲染properties
  mapProperties?: (schema: Schema, name: string) => Schema //schema properties映射器，主要用于改写schema
  filterProperties?: (schema: Schema, name: string) => boolean //schema properties过滤器，被过滤掉的schema节点不会被渲染
}

type RecursionField = React.FC<IRecursionFieldProps>
```

## 用例

### 简单递归

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecursionField } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const Custom = (props) => {
  return <RecursionField schema={props.schema} onlyRenderProperties />
}

const SchemaField = createSchemaField({
  components: {
    Custom,
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Object
        name="custom"
        x-component="Custom"
        x-component-props={{
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
              },
            },
          },
        }}
      />
    </SchemaField>
  </FormProvider>
)
```

我们可以从组件属性中读取独立的 schema 对象，传给 RecursionField 渲染

### 自增列表递归

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
  useField,
  useFieldSchema,
  observer,
} from '@formily/react'
import { Input, Space, Button } from 'antd'

const form = createForm()

const ArrayItems = observer((props) => {
  const field = useField()
  const schema = useFieldSchema()
  return (
    <div>
      {props.value?.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: 10 }}>
            <Space>
              <RecursionField schema={schema.items} name={index} />
              <Button
                onClick={() => {
                  field.remove(index)
                }}
              >
                Remove
              </Button>
            </Space>
          </div>
        )
      })}
      <Button
        onClick={() => {
          field.push({})
        }}
      >
        Add
      </Button>
    </div>
  )
})

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array name="custom" x-component="ArrayItems">
        <SchemaField.Object>
          <SchemaField.String name="input" x-component="Input" />
        </SchemaField.Object>
      </SchemaField.Array>
    </SchemaField>
  </FormProvider>
)
```

使用[useField](/api/hooks/useField)和[useFieldSchema](/api/shared/use-field-schema)来获取当前字段上下文中的字段实例和字段 schema
