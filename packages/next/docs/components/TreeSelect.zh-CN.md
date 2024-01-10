# TreeSelect

> 树选择器

## Markup Schema 同步数据源案例

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
        label="选择框"
        x-decorator="FormItem"
        x-component="TreeSelect"
        enum={[
          {
            label: '选项1',
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
            label: '选项2',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Markup Schema 异步联动数据源案例

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
        label="联动选择框"
        x-decorator="FormItem"
        x-component="Select"
        enum={[
          { label: '发请求1', value: 1 },
          { label: '发请求2', value: 2 },
        ]}
        x-component-props={{
          style: {
            width: 200,
          },
        }}
      />
      <SchemaField.String
        name="select"
        label="异步选择框"
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 同步数据源案例

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
      label: '选择框',
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      enum: [
        {
          label: '选项1',
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
          label: '选项2',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 异步联动数据源案例

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
      label: '联动选择框',
      enum: [
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
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
      label: '异步选择框',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 同步数据源案例

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
      label="选择框"
      dataSource={[
        {
          label: '选项1',
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
          label: '选项2',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 异步联动数据源案例

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
      label="联动选择框"
      dataSource={[
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
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
      label="异步选择框"
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

参考 https://fusion.design/pc/component/basic/tree-select
