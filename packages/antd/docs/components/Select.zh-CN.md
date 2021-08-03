# Select

> 下拉框组件

## Markup Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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

## Markup Schema 异步搜索案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import {
  createForm,
  onFieldReact,
  onFieldInit,
  FormPathPattern,
  Field,
} from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action, observable } from '@formily/reactive'
import { fetch } from 'mfetch'

let timeout
let currentValue

function fetchData(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    fetch(`https://suggest.taobao.com/sug?q=${value}`, {
      method: 'jsonp',
    })
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          const { result } = d
          const data = []
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            })
          })
          callback(data)
        }
      })
  }

  timeout = setTimeout(fake, 300)
}

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const useAsyncDataSource = (
  pattern: FormPathPattern,
  service: (field: Field) => Promise<{ label: string; value: any }[]>
) => {
  const keyword = observable.ref('')

  onFieldInit(pattern, (field) => {
    field.setComponentProps({
      onSearch: (value) => {
        keyword.value = value
      },
    })
  })

  onFieldReact(pattern, (field) => {
    field.loading = true
    service({ field, keyword: keyword.value }).then(
      action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const form = createForm({
  effects: () => {
    useAsyncDataSource('select', async ({ keyword }) => {
      if (!keyword) {
        return []
      }
      return new Promise((resolve) => {
        fetchData(keyword, resolve)
      })
    })
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="异步搜索选择框"
        x-decorator="FormItem"
        x-component="Select"
        x-component-props={{
          showSearch: true,
          style: {
            width: 300,
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
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
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
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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

## JSON Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    Select,
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

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="select"
      title="选择框"
      dataSource={[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]}
      decorator={[FormItem]}
      component={[
        Select,
        {
          style: {
            width: 120,
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
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import {
  createForm,
  onFieldReact,
  FormPathPattern,
  Field as FieldType,
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
    <Field
      name="linkage"
      title="联动选择框"
      dataSource={[
        { label: '发请求1', value: 1 },
        { label: '发请求2', value: 2 },
      ]}
      decorator={[FormItem]}
      component={[
        Select,
        {
          style: {
            width: 120,
          },
        },
      ]}
    />
    <Field
      name="select"
      title="异步选择框"
      decorator={[FormItem]}
      component={[
        Select,
        {
          style: {
            width: 120,
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

参考 https://ant.design/components/select-cn/
