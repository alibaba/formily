# Form Controlled

Formily 2.x has given up supporting controlled mode for form components and field components. Because the internal management state mode of the form itself is not a controlled mode, there will be many boundary problems in the process of changing the controlled mode to the uncontrolled mode. At the same time, the controlled mode will have a large number of dirty inspection processes, and the performance is very poor. Instead, the controlled mode itself can solve most of the problems.

So Formily no longer supports the controlled mode, but if we insist on implementing ordinary React controlled, we can still support it. It can only achieve value control, not field-level control, which is the Field component we use. The properties will only take effect during the first rendering. Any changes to the properties in the future will not be automatically updated. If you want to update automatically, unless you recreate the Form instance (obviously this will lose all the previously maintained state).

Therefore, we more recommend using [@formily/reactive](https://reactive.formilyjs.org) to achieve responsive control, which can achieve both value control and field-level control.

## Value Controlled

Ordinary controlled mode, which will rely heavily on dirty checking to achieve data synchronization, and the number of component renderings will be very high.

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
          x-component-props={{ placeholder: 'controlled target' }}
        />
      </SchemaField>
      Form component rendering times：{count.current++}
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
          placeholder="controller"
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
      root component rendering times: {count.current++}
    </>
  )
}
```

## Responsive Value Controlled

Responsive control is mainly to use [@formily/reactive](https://reactive.formilyjs.org) to achieve responsive updates, we can easily achieve two-way binding, while the performance is full of normal controlled updates.

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
          x-component-props={{ placeholder: 'controlled target' }}
        />
      </SchemaField>
      Form component rendering times：{count.current++}
    </Form>
  )
}

const Controller = observer((props) => {
  const count = useRef(1)
  return (
    <FormItem>
      <Input
        value={props.values.input}
        placeholder="controller"
        onChange={(event) => {
          props.values.input = event.target.value
        }}
      />
      Controller component rendering times：{count.current++}
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
      root component rendering times：{count.current++}
    </>
  )
}
```

## Schema Controlled

There will be a requirement for the form configuration scenario. The Schema of the form will change frequently. In fact, it is equivalent to frequently creating new forms. The state of the previous operation should be discarded.

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

## Schema fragment linkage

Note that there are several problems with this model

1. When the clip is switched, the previously entered value will still be retained, because there is no display or hidden control, so the value will not be deleted automatically

2. Because the values ​​are mentioned outside and turned into observable data, the onFormValuesChange inside the Form will not be triggered anymore, because the values ​​are passed to the Form as a reference

Although these two problems exist, it is still very practical in some scenarios, such as the configuration panel of the Formily form designer, which is based on the x-component/x-decorator type for x-component-props and x-decorator-props To switch dynamically, the maintainability of the schema is still greatly improved

```tsx
import React, { useMemo } from 'react'
import { observable } from '@formily/reactive'
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

const SchemaForm = observer(({ values }) => {
  const form = useMemo(
    () =>
      createForm({
        values,
      }),
    [values.type]
  )

  const schema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        title: 'Type',
        enum: [
          { label: 'type 1', value: 'type_1' },
          { label: 'type 2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      container: DYNAMIC_INJECT_SCHEMA[values.type],
    },
  }

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
    </Form>
  )
})

export default () => {
  const values = useMemo(
    () =>
      observable({
        type: 'type_1',
      }),
    []
  )
  return <SchemaForm values={values} />
}
```

## Field Level Control

### Best Practices

It is recommended to use [@formily/reactive](https://reactive.formilyjs.org) to achieve responsive control.

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
        placeholder="controller"
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
            x-component-props={{ placeholder: 'controlled target' }}
            x-reactions={(field) => {
              field.component[1].placeholder = obs.input || 'controlled target'
            }}
          />
        </SchemaField>
      </Form>
    </>
  )
}
```

### Anti-pattern

It is not possible to update automatically when using traditional controlled mode.

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
          placeholder="controller"
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
            x-component-props={{ placeholder: value || 'controlled target' }}
          />
        </SchemaField>
      </Form>
    </>
  )
}
```
