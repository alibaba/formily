# SelectTable

> Optional table components

## Markup Schema single case

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
            { key: '1', name: 'Title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
          ]}
        >
          <SchemaField.Void
            name="name"
            title="Title"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="Description"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema filter case

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
            { key: '1', name: 'Title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
          ]}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="Title"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="Description"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema async data source case

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
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '2', name: 'title-2', description: 'description-2' },
          ]}
        >
          <SchemaField.Void
            name="name"
            title="Title"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="Description"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## Markup Schema read-pretty case

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
          title="single"
          type="string"
          name="selectTable1"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            mode: 'single',
          }}
          default="1"
          enum={[
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Void
            name="name"
            title="Title"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="Description"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
        <SchemaField.Object
          title="single + optionAsValue"
          type="string"
          name="selectTable2"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            mode: 'single',
            optionAsValue: true,
          }}
          default={{ key: '1', name: 'Title1', description: 'Description1' }}
          enum={[
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Void
            name="name"
            title="Title"
            x-component="SelectTable.Column"
          />
          <SchemaField.Void
            name="description"
            title="Description"
            x-component="SelectTable.Column"
          />
        </SchemaField.Object>
        <SchemaField.Array
          title="multiple"
          type="array"
          name="selectTable3"
          x-decorator="FormItem"
          x-component="SelectTable"
          default={['1', '3']}
          enum={[
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
            { key: '3', name: 'title-3', description: 'description-3' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="Title"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="Description"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
        <SchemaField.Array
          title="multiple + optionAsValue"
          type="array"
          name="selectTable4"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            optionAsValue: true,
          }}
          default={[
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '3', name: 'title-3', description: 'description-3' },
          ]}
          enum={[
            { key: '1', name: 'title-1', description: 'description-1' },
            { key: '2', name: 'Title-2', description: 'description-2' },
            { key: '3', name: 'title-3', description: 'description-3' },
          ]}
          x-read-pretty={true}
        >
          <SchemaField.Object>
            <SchemaField.Void
              name="name"
              title="Title"
              x-component="SelectTable.Column"
            />
            <SchemaField.Void
              name="description"
              title="Description"
              x-component="SelectTable.Column"
            />
          </SchemaField.Object>
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
}
```

## JSON Schema multiple case

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
        { key: '1', name: 'Title-1', description: 'description-1' },
        { key: '2', name: 'Title-2', description: 'description-2' },
      ],
      properties: {
        name: {
          title: 'Title',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: 'Description',
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
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema custom filter case

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
        { key: '1', name: 'title-1', description: 'A-description' },
        {
          key: '2',
          name: 'title-2',
          description: 'X-description',
          children: [
            {
              key: '2-1',
              name: 'title2-1',
              description: 'Y-description',
              children: [
                {
                  key: '2-1-1',
                  name: 'title-2-1-1',
                  description: 'Z-description',
                },
              ],
            },
            {
              key: '2-2',
              name: 'title2-2',
              description: 'YY-description',
            },
          ],
        },
        { key: '3', name: 'title-3', description: 'C-description' },
      ],
      properties: {
        name: {
          title: 'Title',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: 'Description',
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
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema async data source case

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
        { key: '1', name: 'title-1', description: 'description-1' },
        { key: '2', name: 'title-2', description: 'description-2' },
      ],
      properties: {
        name: {
          title: 'Title',
          type: 'string',
          'x-component': 'SelectTable.Column',
          'x-component-props': {
            width: '40%',
          },
        },
        description: {
          title: 'Description',
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
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

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
        { key: '1', name: 'title-1', description: 'description-1' },
        { key: '2', name: 'title-2', description: 'description-2' },
      ]}
      decorator={[FormItem]}
      component={[
        SelectTable,
        {
          columns: [
            { dataIndex: 'name', title: 'Title' },
            { dataIndex: 'description', title: 'Description' },
          ],
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### SelectTable

| Property name | Type                                               | Description                                                                                                                                                                                                                                                 | Default value |
| ------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| mode          | `'multiple' \| 'single'`                           | Set mode of SelectTable                                                                                                                                                                                                                                     | `'multiple'`  |
| valueType     | `'all' \| 'parent' \| 'child' \| 'path'`           | value type, Only applies when checkStrictly is set to `false`                                                                                                                                                                                               | `'all'`       |
| optionAsValue | boolean                                            | use `option` as value, Only applies when valueType is not set to `'path'`                                                                                                                                                                                   | false         |
| showSearch    | boolean                                            | show `Search` component                                                                                                                                                                                                                                     | false         |
| searchProps   | object                                             | `Search` component props                                                                                                                                                                                                                                    | -             |
| primaryKey    | `string \| (record) => string`                     | Row's unique key                                                                                                                                                                                                                                            | `'key'`       |
| filterOption  | `boolean \| (inputValue, option) => boolean`       | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded |
| filterSort    | (optionA, optionB) => number                       | Sort function for search options sorting, see Array.sort's compareFunction                                                                                                                                                                                  | -             |
| onSearch      | Callback function that is fired when input changed | (inputValue) => void                                                                                                                                                                                                                                        | -             |

`TableProps` type definition reference antd https://ant.design/components/table/

### rowSelection

| Property name | Type    | Description                                                                | Default value |
| ------------- | ------- | -------------------------------------------------------------------------- | ------------- |
| checkStrictly | boolean | Check table row precisely; parent row and children rows are not associated | true          |

`rowSelectionProps` type definition reference antd https://ant.design/components/table/#rowSelection

### SelectTable.Column

`ColumnProps` type definition reference antd https://ant.design/components/table/ Table.Column
