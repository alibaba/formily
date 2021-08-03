# TreeSelect

> Tree selector

## Markup Schema synchronization data source case

```tsx
import React from 'react'
import { TreeSelect, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TreeSelect,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Number
        name="select"
        label="select box"
        x-decorator="FormItem"
        x-component="TreeSelect"
        enum={[
          {
            label: 'Option 1',
            value: 1,
            children: [
              {
                label: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
              },
              {
                label: 'Child Node2',
                value: '0-0-1',
                key: '0-0-1',
              },
              {
                label: 'Child Node3',
                value: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            label: 'Option 2',
            value: 2,
            children: [
              {
                label: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
              },
              {
                label: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
              },
              {
                label: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
              },
            ],
          },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Markup Schema Asynchronous Linkage Data Source Case

```tsx
import React from 'react'
import {
  TreeSelect,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
    TreeSelect,
    FormItem,
  },
})

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (field: Field) => Promise<{ label: string; value: any }[]>
) => {
  onFieldReact(pattern, (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
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
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'BBB',
                value: 'ccc',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'DDD',
                value: 'ddd',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
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
        label="Linkage selection box"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: 'Request 1', value: 1 },
          { label: 'Request 2', value: 2 },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
      <SchemaField.String
        name="select"
        label="Asynchronous selection box"
        x-decorator="FormItem"
        x-component="TreeSelect"
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema synchronization data source case

```tsx
import React from 'react'
import { TreeSelect, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    TreeSelect,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      label: 'Select box',
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      enum: [
        {
          label: 'Option 1',
          value: 1,
          children: [
            {
              label: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
            {
              label: 'Child Node2',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              label: 'Child Node3',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          label: 'Option 2',
          value: 2,
          children: [
            {
              label: 'Child Node1',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              label: 'Child Node2',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              label: 'Child Node3',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      'x-component-props': {
        style: {
          width: 200,
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

## JSON Schema asynchronous linkage data source case

```tsx
import React from 'react'
import {
  TreeSelect,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
    TreeSelect,
    FormItem,
  },
})

const loadData = async (field) => {
  const linkage = field.query('linkage').get('value')
  if (!linkage) return []
  return new Promise((resolve) => {
    setTimeout(() => {
      if (linkage === 1) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
            children: [
              {
                label: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
              },
              {
                label: 'Child Node2',
                value: '0-0-1',
                key: '0-0-1',
              },
              {
                label: 'Child Node3',
                value: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            label: 'BBB',
            value: 'ccc',
            children: [
              {
                label: 'Child Node1',
                value: '0-1-0',
                key: '0-1-0',
              },
              {
                label: 'Child Node2',
                value: '0-1-1',
                key: '0-1-1',
              },
              {
                label: 'Child Node3',
                value: '0-1-2',
                key: '0-1-2',
              },
            ],
          },
        ])
      } else if (linkage === 2) {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
            children: [
              {
                label: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
              },
              {
                label: 'Child Node2',
                value: '0-0-1',
                key: '0-0-1',
              },
              {
                label: 'Child Node3',
                value: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            label: 'DDD',
            value: 'ddd',
            children: [
              {
                label: 'Child Node1',
                value: '0-1-0',
                key: '0-1-0',
              },
              {
                label: 'Child Node2',
                value: '0-1-1',
                key: '0-1-1',
              },
              {
                label: 'Child Node3',
                value: '0-1-2',
                key: '0-1-2',
              },
            ],
          },
        ])
      }
    }, 1500)
  })
}

const useAsyncDataSource = (service) => (field) => {
  field.loading = true
  service(field).then(
    action.bound((data) => {
      field.dataSource = data
      field.loading = false
    })
  )
}

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    linkage: {
      type: 'string',
      label: 'Linkage selection box',
      enum: [
        { label: 'Request 1', value: 1 },
        { label: 'Request 2', value: 2 },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: 200,
        },
      },
    },
    select: {
      type: 'string',
      label: 'Asynchronous selection box',
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      'x-component-props': {
        style: {
          width: 200,
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
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX synchronization data source case

```tsx
import React from 'react'
import { TreeSelect, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="select"
      label="select box"
      dataSource={[
        {
          label: 'Option 1',
          value: 1,
          children: [
            {
              label: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
            {
              label: 'Child Node2',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              label: 'Child Node3',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          label: 'Option 2',
          value: 2,
          children: [
            {
              label: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              label: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              label: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ]}
      decorator={[FormItem]}
      component={[
        TreeSelect,
        {
          style: {
            width: 200,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX asynchronous linkage data source case

```tsx
import React from 'react'
import {
  TreeSelect,
  Select,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import {
  createForm,
  onFieldReact,
  FormPathPattern,
  FieldType,
} from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { action } from '@formily/reactive'

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (field: FieldType) => Promise<{ label: string; value: any }[]>
) => {
  onFieldReact(pattern, (field) => {
    field.loading = true
    service(field).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
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
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'BBB',
                value: 'ccc',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
              },
            ])
          } else if (linkage === 2) {
            resolve([
              {
                label: 'CCC',
                value: 'ccc',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-0-1',
                    key: '0-0-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-0-2',
                    key: '0-0-2',
                  },
                ],
              },
              {
                label: 'DDD',
                value: 'ddd',
                children: [
                  {
                    label: 'Child Node1',
                    value: '0-1-0',
                    key: '0-1-0',
                  },
                  {
                    label: 'Child Node2',
                    value: '0-1-1',
                    key: '0-1-1',
                  },
                  {
                    label: 'Child Node3',
                    value: '0-1-2',
                    key: '0-1-2',
                  },
                ],
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
    <Field
      name="linkage"
      label="Linkage selection box"
      dataSource={[
        { label: 'Request 1', value: 1 },
        { label: 'Request 2', value: 2 },
      ]}
      decorator={[FormItem]}
      component={[
        Select,
        {
          style: {
            width: 200,
          },
        },
      ]}
    />
    <Field
      name="select"
      label="Asynchronous selection box"
      decorator={[FormItem]}
      component={[
        TreeSelect,
        {
          style: {
            width: 200,
          },
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

Reference https://fusion.design/pc/component/basic/tree-select
