# Linkage Logic

There is only one mode to realize linkage logic in Formily 1.x, that is, active mode. It is necessary to monitor the event changes of one or more fields to control the state of another or more fields.
This is very convenient for one-to-many linkage scenarios, but it is very troublesome for many-to-one scenarios. It is necessary to monitor the changes of multiple fields to control the state of a field. Therefore, Formily 2.x provides a responsive mechanism that allows the linkage to support passive linkage. You only need to pay attention to the field that a field depends on. When the dependent field changes, the dependent field can be automatically linked.

## Active Mode

The core of active linkage is based on

- [FormEffectHooks](https://core.formilyjs.org/api/entry/form-effect-hooks)
- [FieldEffectHooks](https://core.formilyjs.org/api/entry/field-effect-hooks)
- [setFormState](https://core.formilyjs.org/api/models/form#setformstate)
- [setFieldState](https://core.formilyjs.org/api/models/form#setfieldstate)
- [SchemaReactions](https://react.formilyjs.org/api/shared/schema#schemareactions)

Realize active linkage, the advantage is that it is very convenient to realize one-to-many linkage.

### One-to-One Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input', (state) => {
        //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
        state.display = field.value
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          target: 'input',
          fulfill: {
            state: {
              display: '{{$self.value}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### One-to-Many Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('*(input1,input2)', (state) => {
        //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
        state.display = field.value
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          target: '*(input1,input2)',
          fulfill: {
            state: {
              display: '{{$self.value}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input1"
        title="controller"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="controller"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Rely on Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('dim_1', (field) => {
      const dim1 = field.value
      const dim2 = field.query('dim_2').value()
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2
      })
    })
    onFieldValueChange('dim_2', (field) => {
      const dim1 = field.query('dim_1').value()
      const dim2 = field.value || 0
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="dim_1"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="controlled target"
        x-pattern="readPretty"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="dim_1"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['dim_2'],
          target: 'result',
          fulfill: {
            state: {
              value: '{{$self.value * $deps[0]}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="dim_2"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['dim_1'],
          target: 'result',
          fulfill: {
            state: {
              value: '{{$self.value * $deps[0]}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="result"
        title="controller"
        x-pattern="readPretty"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Chain Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input1', (state) => {
        //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
        state.visible = !!field.value
      })
    })
    onFieldValueChange('input1', (field) => {
      form.setFieldState('input2', (state) => {
        //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
        state.visible = !!field.value
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default={false}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        default={true}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default={false}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          target: 'input1',
          fulfill: {
            state: {
              visible: '{{!!$self.value}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        default={true}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          target: 'input2',
          fulfill: {
            state: {
              visible: '{{!!$self.value}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Loop Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldInputValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldInputValueChange('total', (field) => {
      if (field.value === undefined) return
      form.setFieldState('count', (state) => {
        const price = form.values.price
        if (!price) return
        state.value = field.value / price
      })
      form.setFieldState('price', (state) => {
        const count = form.values.count
        if (!count) return
        state.value = field.value / count
      })
    })
    onFieldInputValueChange('price', (field) => {
      form.setFieldState('total', (state) => {
        const count = form.values.count
        if (count === undefined) return
        state.value = field.value * count
      })
    })
    onFieldInputValueChange('count', (field) => {
      form.setFieldState('total', (state) => {
        const price = form.values.price
        if (price === undefined) return
        state.value = field.value * price
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="total price"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="count"
        title="quantity"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="price"
        title="unit price"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'
const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="total price"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={[
          {
            target: 'count',
            effects: ['onFieldInputValueChange'],
            dependencies: ['price'],
            fulfill: {
              state: {
                value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
              },
            },
          },
          {
            target: 'price',
            effects: ['onFieldInputValueChange'],
            dependencies: ['count'],
            fulfill: {
              state: {
                value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
              },
            },
          },
        ]}
      />
      <SchemaField.Number
        name="count"
        title="quantity"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          target: 'total',
          effects: ['onFieldInputValueChange'],
          dependencies: ['price'],
          fulfill: {
            state: {
              value:
                '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="price"
        title="unit price"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          target: 'total',
          effects: ['onFieldInputValueChange'],
          dependencies: ['count'],
          fulfill: {
            state: {
              value:
                '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Self Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import './input.less'

const form = createForm({
  effects() {
    onFieldValueChange('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="color"
        default="#FFFFFF"
        title="color"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import './input.less'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="color"
        default="#FFFFFF"
        title="color"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          target: 'color',
          fulfill: {
            state: {
              'component[1].style.backgroundColor': '{{$self.value}}',
            },
            //The following usage is also possible
            // schema: {
            //   'x-component-props.style.backgroundColor': '{{$self.value}}',
            // },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Asynchronous Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      field.loading = true
      setTimeout(() => {
        field.loading = false
        form.setFieldState('input', (state) => {
          //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
          state.display = field.value
        })
      }, 1000)
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
  scope: {
    asyncVisible(field) {
      field.loading = true
      setTimeout(() => {
        field.loading = false
        form.setFieldState('input', (state) => {
          //For the initial linkage, if the field cannot be found, setFieldState will push the update into the update queue until the field appears before performing the operation
          state.display = field.value
        })
      }, 1000)
    },
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          target: 'input',
          effects: ['onFieldValueChange'],
          fulfill: {
            run: 'asyncVisible($self,$target)',
          },
        }}
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

## Passive Mode

The core of the passive mode is based on

- [onFieldReact](https://core.formilyjs.org/api/entry/field-effect-hooks#onfieldreact) Implement global reactive logic
- [FieldReaction](https://core.formilyjs.org/api/models/field#fieldreaction) Implement partial responsive logic
- [SchemaReactions](https://react.formilyjs.org/api/shared/schema#schemareactions) Implement the structured logical description in the Schema protocol (the internal implementation is based on FieldReaction)

### One-to-One Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('input', (field) => {
      field.display = field.query('select').value()
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['select'],
          fulfill: {
            state: {
              display: '{{$deps[0]}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### One-to-Many Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('*(input1,input2)', (field) => {
      field.display = field.query('select').value()
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['select'],
          fulfill: {
            state: {
              display: '{{$deps[0]}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['select'],
          fulfill: {
            state: {
              display: '{{$deps[0]}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Rely on Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('result', (field) => {
      field.value = field.query('dim_1').value() * field.query('dim_2').value()
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="dim_1"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="controlled target"
        x-pattern="readPretty"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="dim_1"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="controller"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="controlled target"
        x-pattern="readPretty"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['dim_1', 'dim_2'],
          fulfill: {
            state: {
              value: '{{$deps[0] * $deps[1]}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Chain Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('input1', (field) => {
      field.visible = !!field.query('select').value()
    })
    onFieldReact('input2', (field) => {
      field.visible = !!field.query('input1').value()
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default={false}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        default={true}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default={false}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="controlled target"
        default={true}
        enum={[
          { label: 'display', value: true },
          { label: 'hide', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['select'],
          fulfill: {
            state: {
              visible: '{{!!$deps[0]}}',
            },
          },
        }}
      />
      <SchemaField.String
        name="input2"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['input1'],
          fulfill: {
            state: {
              visible: '{{!!$deps[0]}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Loop Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('total', (field) => {
      const count = field.query('count').value()
      const price = field.query('price').value()
      if (count !== undefined && price !== undefined) {
        field.value = count * price
      }
    })
    onFieldReact('price', (field) => {
      const total = field.query('total').value()
      const count = field.query('count').value()
      if (total !== undefined && count > 0) {
        field.value = total / count
      }
    })
    onFieldReact('count', (field) => {
      const total = field.query('total').value()
      const price = field.query('price').value()
      if (total !== undefined && price > 0) {
        field.value = total / price
      }
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="总价"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="count"
        title="数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="price"
        title="单价"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="总价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['.count', '.price'],
          fulfill: {
            state: {
              value:
                '{{$deps[0] !== undefined && $deps[1] !== undefined ? $deps[0] * $deps[1] : $self.value}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="count"
        title="数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['.total', '.price'],
          fulfill: {
            state: {
              value: '{{ $deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
            },
          },
        }}
      />
      <SchemaField.Number
        name="price"
        title="单价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ['.total', '.count'],
          fulfill: {
            state: {
              value: '{{ $deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
            },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Self Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import './input.less'

const form = createForm({
  effects() {
    onFieldReact('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      })
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="color"
        default="#FFFFFF"
        title="color"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'
import './input.less'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="color"
        default="#FFFFFF"
        title="color"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          fulfill: {
            state: {
              'component[1].style.backgroundColor': '{{$self.value}}',
            },
            //The following usage is also possible
            // schema: {
            //   'x-component-props.style.backgroundColor': '{{$self.value}}',
            // },
          },
        }}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

### Asynchronous Linkage

#### Effects Use Cases

```tsx
import React from 'react'
import { createForm, onFieldReact } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldReact('input', (field) => {
      const select = field.query('select').take()
      if (!select) return
      const selectValue = select.value
      select.loading = true
      if (selectValue) {
        setTimeout(() => {
          select.loading = false
          field.display = selectValue
        }, 1000)
      }
    })
  },
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```

#### SchemaReactions Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
  scope: {
    asyncVisible(field) {
      const select = field.query('select').take()
      if (!select) return
      const selectValue = select.value
      select.loading = true
      if (selectValue) {
        setTimeout(() => {
          select.loading = false
          field.display = selectValue
        }, 1000)
      }
    },
  },
})

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.String
        name="select"
        title="controller"
        default="visible"
        enum={[
          { label: 'display', value: 'visible' },
          { label: 'hide', value: 'none' },
          { label: 'Hidden-reserved value', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="controlled target"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
        x-reactions="{{asyncVisible}}"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
)
```
