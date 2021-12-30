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
        <SchemaField.Object
          type="object"
          name="selectTable"
          x-decorator="FormItem"
          x-component="SelectTable"
          x-component-props={{
            bordered: false,
            mode: 'single',
            showSearch: true,
            optionFilterProp: 'name',
            optionAsValue: true,
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

## API

### SelectTable

| Property name    | Type                                               | Description                                                                                                                                                                                                                                                 | Default value |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| mode             | `'multiple' \| 'single'`                           | Set mode of SelectTable                                                                                                                                                                                                                                     | `'multiple'`  |
| optionAsValue    | boolean                                            | use `option` as value                                                                                                                                                                                                                                       | false         |
| showSearch       | boolean                                            | show `Search` component                                                                                                                                                                                                                                     | false         |
| searchProps      | object                                             | `Search` component props                                                                                                                                                                                                                                    | -             |
| optionFilterProp | string                                             | Which prop value of option will be used for filter if filterOption is true.                                                                                                                                                                                 | `primaryKey`  |
| primaryKey       | string                                             | Row's unique key                                                                                                                                                                                                                                            | `'key'`       |
| filterOption     | `boolean \| (inputValue, option) => boolean`       | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded |
| filterSort       | (optionA, optionB) => number                       | Sort function for search options sorting, see Array.sort's compareFunction                                                                                                                                                                                  | -             |
| onSearch         | Callback function that is fired when input changed | (inputValue) => void                                                                                                                                                                                                                                        | -             |

`TableProps` type definition reference antd https://ant.design/components/table/

### SelectTable.Column

`ColumnProps` type definition reference antd https://ant.design/components/table/ Table.Column
