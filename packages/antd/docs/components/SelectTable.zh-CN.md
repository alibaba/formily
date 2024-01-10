# SelectTable

> 表格选择组件

## Markup Schema 单选案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
        <SchemaField.Object
          type="string"
          name="selectTable"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            bordered: false,
            mode: 'single',
          }}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
          ]}
        >
          <SchemaField.Void
            name="name"
            title="标题"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="描述"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema 筛选案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
        <SchemaField.Array
          type="array"
          name="selectTable"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            bordered: false,
            showSearch: true,
            optionAsValue: true,
          }}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
          ]}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="标题"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="描述"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema 异步数据源案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    SelectTable,
  },
})

const form = createForm()

export default () => {
  const onSearch = (value) => {
    const field = form.query('selectTable').take()
    field.loading = true
    setTimeout(() => {
      field.setState({
        dataSource: [
          {
            key: '3',
            name: 'AAA' + value,
            description: 'aaa',
          },
          {
            key: '4',
            name: 'BBB' + value,
            description: 'bbb',
          },
        ],
        loading: false,
      })
    }, 1500)
  }

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object
          type="object"
          name="selectTable"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            showSearch: true,
            filterOption: false,
            onSearch,
          }}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
          ]}
        >
          <SchemaField.Void
            name="name"
            title="标题"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="描述"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema 阅读态案例

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  SelectTable,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    SelectTable,
  },
})

const form = createForm()

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField>
        <SchemaField.Object
          title="单选"
          type="string"
          name="selectTable1"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            mode: 'single',
          }}
          default="1"
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Void
            name="name"
            title="标题"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="描述"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
        <SchemaField.Object
          title="单选 + optionAsValue"
          type="string"
          name="selectTable2"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            mode: 'single',
            optionAsValue: true,
          }}
          default={{ key: '1', name: '标题1', description: '描述1' }}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Void
            name="name"
            title="标题"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="描述"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
        <SchemaField.Array
          title="多选"
          type="array"
          name="selectTable3"
          x-decorator="FormItem"
          x-component="SelectTable"
          default={['1', '3']}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
            { key: '3', name: '标题3', description: '描述3' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="标题"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="描述"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
        <SchemaField.Array
          title="多选 + optionAsValue"
          type="array"
          name="selectTable4"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            optionAsValue: true,
          }}
          default={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '3', name: '标题3', description: '描述3' },
          ]}
          enum={[
            { key: '1', name: '标题1', description: '描述1' },
            { key: '2', name: '标题2', description: '描述2' },
            { key: '3', name: '标题3', description: '描述3' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="标题"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="描述"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
```

## JSON Schema 多选案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
        bordered: false,
        mode: 'multiple',
      },
      enum: [
        { key: '1', name: '标题1', description: '描述1' },
        { key: '2', name: '标题2', description: '描述2' },
      ],
      properties: {
        name: {
          title: '标题',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: '描述',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
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

## JSON Schema 自定义筛选案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
        bordered: false,
        showSearch: true,
        primaryKey: 'key',
        isTree: true,
        filterOption: (input, option) =>
          option.description.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        filterSort: (optionA, optionB) =>
          optionA.description
            .toLowerCase()
            .localeCompare(optionB.description.toLowerCase()),
        optionAsValue: true,
        rowSelection: {
          checkStrictly: false,
        },
      },
      enum: [
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
            {
              key: '2-2',
              name: '标题2-2',
              description: 'YY-描述',
            },
          ],
        },
        { key: '3', name: '标题3', description: 'C-描述' },
      ],
      properties: {
        name: {
          title: '标题',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: '描述',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
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

## JSON Schema 异步数据源案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    SelectTable,
    FormItem,
  },
})

const loadData = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { key: '3', name: 'AAA' + value, description: 'aaa' },
        { key: '4', name: 'BBB' + value, description: 'bbb' },
      ])
    }, 1500)
  })
}

const useAsyncDataSource = (service, field) => (value) => {
  field.loading = true
  service(value).then((data) => {
    field.setState({
      dataSource: data,
      loading: false,
    })
  })
}

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
        filterOption: false,
        onSearch: '{{useAsyncDataSource(loadData,$self)}}',
      },
      enum: [
        { key: '1', name: '标题1', description: '描述1' },
        { key: '2', name: '标题2', description: '描述2' },
      ],
      properties: {
        name: {
          title: '标题',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: '描述',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '60%',
          },
        },
      },
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

## 纯 JSX 案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, SelectTable } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="SelectTable"
      dataSource={[
        { key: '1', name: '标题1', description: '描述1' },
        { key: '2', name: '标题2', description: '描述2' },
      ]}
      decorator={[FormItem]}
      component={[
        SelectTable,
        {
          columns: [
            { dataIndex: 'name', title: '标题' },
            { dataIndex: 'description', title: '描述' },
          ],
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### SelectTable

| 属性名        | 类型                                         | 描述                                                                                                                                 | 默认值       |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| mode          | `'multiple' \| 'single'`                     | 设置 SelectTable 模式为单选或多选                                                                                                    | `'multiple'` |
| valueType     | `'all' \| 'parent' \| 'child' \| 'path'`     | 返回值类型，checkStrictly 设置为 `false` 时有效                                                                                      | `'all'`      |
| optionAsValue | boolean                                      | 使用表格行数据作为值，valueType 值为 `'path'` 时无效                                                                                 | false        |
| showSearch    | boolean                                      | 是否显示搜索组件                                                                                                                     | false        |
| searchProps   | object                                       | Search 组件属性                                                                                                                      | -            |
| primaryKey    | `string \| (record) => string`               | 表格行 key 的取值                                                                                                                    | `'key'`      |
| filterOption  | `boolean \| (inputValue, option) => boolean` | 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | true         |
| filterSort    | (optionA, optionB) => number                 | 搜索时对筛选结果项的排序函数, 类似 Array.sort 里的 compareFunction                                                                   | -            |
| onSearch      | 文本框值变化时回调                           | (inputValue) => void                                                                                                                 | -            |

参考 https://ant.design/components/table-cn/

### rowSelection

| 属性名        | 类型    | 描述                                                         | 默认值 |
| ------------- | ------- | ------------------------------------------------------------ | ------ |
| checkStrictly | boolean | checkable 状态下节点选择完全受控（父子数据选中状态不再关联） | true   |

参考 https://ant.design/components/table/#rowSelection

### SelectTable.Column

参考 https://ant.design/components/table-cn/ Table.Column 属性
