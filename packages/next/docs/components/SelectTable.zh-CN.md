# SelectTable

> 表格选择组件

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

import SelectTable from '../../src/select-table/index'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    SelectTable,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            dataSource: [
              { key: '1', name: '标题1', description: '描述1' },
              { key: '2', name: '标题2', description: '描述2' },
            ],
          }}
        >
          <SchemaField.String
            name="name"
            title="标题"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="描述"
            x-component="SelectTable.Column"
          />
        </SchemaField.String>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

import SelectTable from '../../src/select-table/index'

const SchemaField = createSchemaField({
  components: {
    SelectTable,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    selectTable: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'SelectTable',
      'x-component-props': {
        showSearch: true,
        onSearch: (value) => {
          console.log(value)
        },
        // filterOption: (input, option) =>
        //   option.description.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        filterSort: (optionA, optionB) =>
          optionA.description
            .toLowerCase()
            .localeCompare(optionB.description.toLowerCase()),
        optionFilterProp: 'name',
        optionAsValue: true,
        mode: 'single',
        isTree: true,
        primaryKey: 'key',
        hasBorder: false,
        dataSource: [
          { key: '1', name: '标题1', description: 'A-描述' },
          {
            key: '2',
            name: '标题2',
            description: 'X-描述',
            children: [
              {
                key: '2-1',
                name: '标题2-1',
                description: 'Y-描述',
                children: [
                  { key: '2-1-1', name: '标题2-1-1', description: 'Z-描述' },
                ],
              },
            ],
          },
          { key: '3', name: '标题3', description: 'C-描述' },
        ],
      },
      default: ['1-1'],
      properties: {
        name: {
          title: '任务名称',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            title: '任务描述',
            width: '60%',
          },
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
