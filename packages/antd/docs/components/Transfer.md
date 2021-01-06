# Transfer

> 穿梭框

## Markup Schema 案例

```tsx
import React from 'react'
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider, onFieldReact } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    Transfer,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Array
        name="transfer"
        title="穿梭框"
        x-decorator="FormItem"
        x-component="Transfer"
        enum={[
          { title: '选项1', key: 1 },
          { title: '选项2', key: 2 },
        ]}
        x-component-props={{
          render: (item) => item.title,
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm, FormProvider, onFieldReact } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { LoadingOutlined } from '@ant-design/icons'
import { action } from 'mobx'

const SchemaField = createSchemaField({
  components: {
    Transfer,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: '穿梭框',
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
      enum: [
        { title: '选项1', key: 1 },
        { title: '选项2', key: 2 },
      ],
      'x-component-props': {
        render: '{{renderTitle}}',
      },
    },
  },
}

const renderTitle = (item) => item.title

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} scope={{ renderTitle }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://ant.design/components/transfer-cn/
