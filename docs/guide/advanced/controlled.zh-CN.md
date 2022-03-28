# 实现表单受控

Formily2.x 已经放弃了给表单组件和字段组件支持受控模式，因为表单内部管理状态模式本身就不是受控模式，在将受控模式转为非受控模式的过程中会有很多边界问题，同时受控模式会存在大量的脏检查过程，性能很不好，反而非受控模式本身就可以解决大部分问题了。

所以 Formily 就不再支持受控模式了，但是如果我们硬要实现普通 React 受控，还是可以支持的，只不过只能实现值受控，不能实现字段级受控，也就是我们使用的 Field 组件，属性只会在初次渲染时生效，未来属性发生任何变化都不会自动更新，想要自动更新，除非重新创建 Form 实例(显然这样会丢失所有之前维护好的状态)。

所以，我们更加推荐的是使用[@formily/reactive](https://reactive.formilyjs.org/zh-CN) 实现响应式受控，既能实现值受控，也能实现字段级受控

## 值受控

普通受控模式，会强依赖脏检查实现数据同步，同时组件渲染次数会非常高

```tsx
import React, { useMemo, useState, useEffect, useRef } from 'react'
import { createForm, onFormValuesChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const MyForm = (props) => {
  const form = useMemo(
    () =>
      createForm({
        values: props.values,
        effects: () => {
          onFormValuesChange((form) => {
            props.onChange(form.values)
          })
        },
      }),
    []
  )
  const count = useRef(1)

  useEffect(() => {
    form.setValues(props.values, 'overwrite')
  }, [JSON.stringify(props.values)])

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: '受控者' }}
        />
      </SchemaField>
      Form组件渲染次数：{count.current++}
    </Form>
  )
}

export default () => {
  const [values, setValues] = useState({ input: '' })
  const count = useRef(1)
  return (
    <>
      <FormItem>
        <Input
          value={values.input}
          placeholder="控制者"
          onChange={(event) => {
            setValues({ ...values, input: event.target.value })
          }}
        />
      </FormItem>
      <MyForm
        values={values}
        onChange={(values) => {
          setValues({ ...values })
        }}
      />
      根组件渲染次数：{count.current++}
    </>
  )
}
```

## 响应式值受控

响应式受控主要是使用[@formily/reactive](https://reactive.formilyjs.org/zh-CN)实现响应式更新，我们可以轻松实现双向绑定，同时性能完爆普通受控更新

```tsx
import React, { useMemo, useRef } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const MyForm = (props) => {
  const count = useRef(1)
  const form = useMemo(
    () =>
      createForm({
        values: props.values,
      }),
    []
  )

  return (
    <Form form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: '受控者' }}
        />
      </SchemaField>
      Form组件渲染次数：{count.current++}
    </Form>
  )
}

const Controller = observer((props) => {
  const count = useRef(1)
  return (
    <FormItem>
      <Input
        value={props.values.input}
        placeholder="控制者"
        onChange={(event) => {
          props.values.input = event.target.value
        }}
      />
      Controller组件渲染次数：{count.current++}
    </FormItem>
  )
})

export default () => {
  const count = useRef(1)
  const values = useMemo(() =>
    observable({
      input: '',
    })
  )
  return (
    <>
      <Controller values={values} />
      <MyForm values={values} />
      根组件渲染次数：{count.current++}
    </>
  )
}
```

## Schema 受控

对于表单配置化场景会有一个需求，表单的 Schema 会发生频繁改变，其实就相当于频繁创建新表单了，之前操作的状态就应该丢弃了

```tsx
import React, { useMemo, useState } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'
import { Button, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
})

export default () => {
  const [current, setCurrent] = useState({})
  const form = useMemo(() => createForm(), [current])
  return (
    <Form form={form} layout="vertical">
      <Space style={{ marginBottom: 20 }}>
        <Button
          onClick={() => {
            setCurrent({
              type: 'object',
              properties: {
                aa: {
                  type: 'string',
                  title: 'AA',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: 'Input',
                  },
                },
              },
            })
          }}
        >
          Schema1
        </Button>
        <Button
          onClick={() => {
            setCurrent({
              type: 'object',
              properties: {
                aa: {
                  type: 'string',
                  title: 'AA',
                  'x-decorator': 'FormItem',
                  enum: [
                    {
                      label: '111',
                      value: '111',
                    },
                    { label: '222', value: '222' },
                  ],
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: 'Select',
                  },
                },
                bb: {
                  type: 'string',
                  title: 'BB',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            })
          }}
        >
          Schema2
        </Button>
      </Space>
      <SchemaField schema={current} />
    </Form>
  )
}
```

## Schema 片段联动(顶层控制)

片段联动最重要的是需要手动清理字段模型，否则无法做到 UI 同步

```tsx
import React, { useMemo, useRef } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, observer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
})

const DYNAMIC_INJECT_SCHEMA = {
  type_1: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
    },
  },
  type_2: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        enum: [
          {
            label: '111',
            value: '111',
          },
          { label: '222', value: '222' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          placeholder: 'Select',
        },
      },
      bb: {
        type: 'string',
        title: 'BB',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
}

export default observer(() => {
  const oldTypeRef = useRef()
  const form = useMemo(() => createForm(), [])
  const currentType = form.values.type
  const schema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      container: DYNAMIC_INJECT_SCHEMA[currentType],
    },
  }

  if (oldTypeRef.current !== currentType) {
    form.clearFormGraph('container.*') //回收字段模型
  }

  oldTypeRef.current = currentType

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
    </Form>
  )
})
```

## Schema 片段联动(自定义组件)

```tsx
import React, { useMemo, useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import {
  createSchemaField,
  RecursionField,
  useForm,
  useField,
  observer,
} from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const Custom = observer(() => {
  const field = useField()
  const form = useForm()
  const [schema, setSchema] = useState({})

  useEffect(() => {
    form.clearFormGraph(`${field.address}.*`) //回收字段模型
    //可以异步获取
    setSchema(DYNAMIC_INJECT_SCHEMA[form.values.type])
  }, [form.values.type])

  return (
    <RecursionField
      basePath={field.address}
      schema={schema}
      onlyRenderProperties
    />
  )
})

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    Custom,
  },
})

const DYNAMIC_INJECT_SCHEMA = {
  type_1: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
    },
  },
  type_2: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        enum: [
          {
            label: '111',
            value: '111',
          },
          { label: '222', value: '222' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          placeholder: 'Select',
        },
      },
      bb: {
        type: 'string',
        title: 'BB',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
}

export default observer(() => {
  const form = useMemo(() => createForm(), [])
  const schema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      container: {
        type: 'object',
        'x-component': 'Custom',
      },
    },
  }

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
    </Form>
  )
})
```

## 字段级受控

### 最佳实践

推荐使用[@formily/reactive](https://reactive.formilyjs.org/zh-CN) 实现响应式受控

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

const obs = observable({
  input: '',
})

const Controller = observer(() => {
  return (
    <FormItem>
      <Input
        value={obs.input}
        placeholder="控制者"
        onChange={(event) => {
          obs.input = event.target.value
        }}
      />
    </FormItem>
  )
})

export default () => {
  return (
    <>
      <Controller />
      <Form form={form}>
        <SchemaField>
          <SchemaField.String
            name="input"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{ placeholder: '受控者' }}
            x-reactions={(field) => {
              field.component[1].placeholder = obs.input || '受控者'
            }}
          />
        </SchemaField>
      </Form>
    </>
  )
}
```

### 反模式

使用传统受控模式是无法自动更新的

```tsx
import React, { useState } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <FormItem>
        <Input
          value={value}
          placeholder="控制者"
          onChange={(event) => {
            setValue(event.target.value)
          }}
        />
      </FormItem>
      <Form form={form}>
        <SchemaField>
          <SchemaField.String
            name="input"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{ placeholder: value || '受控者' }}
          />
        </SchemaField>
      </Form>
    </>
  )
}
```
