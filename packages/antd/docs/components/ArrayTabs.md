# ArrayTabs

> 自增选项卡，对于纵向空间要求较高的场景可以考虑使用该组件
>
> 注意：该组件只适用于 Schema 场景，交互上请避免跨 Tab 联动

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTabs,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTabs,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          x-decorator="FormItem"
          title="字符串数组"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.String
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          title="对象数组"
          maxItems={3}
          x-component="ArrayTabs"
        >
          <SchemaField.Object>
            <SchemaField.String
              x-decorator="FormItem"
              title="AAA"
              name="aaa"
              required
              x-component="Input"
            />
            <SchemaField.String
              x-decorator="FormItem"
              title="BBB"
              name="bbb"
              required
              x-component="Input"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTabs,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTabs,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      title: '字符串数组',
      'x-decorator': 'FormItem',
      maxItems: 3,
      'x-component': 'ArrayTabs',
      items: {
        type: 'string',
        'x-decorator': 'FormItem',
        required: true,
        'x-component': 'Input',
      },
    },
    array: {
      type: 'array',
      title: '对象数组',
      'x-decorator': 'FormItem',
      maxItems: 3,
      'x-component': 'ArrayTabs',
      items: {
        type: 'object',
        properties: {
          aaa: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'AAA',
            required: true,
            'x-component': 'Input',
          },
          bbb: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'BBB',
            required: true,
            'x-component': 'Input',
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayTabs

参考 https://ant.design/components/tabs-cn/
