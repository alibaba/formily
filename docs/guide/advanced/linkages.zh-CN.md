# 实现联动逻辑

Formily1.x 中实现联动逻辑只有一种模式，也就是主动模式，必须要监听一个或多个字段的事件变化去控制另一个或者多个字段的状态，这样对于一对多联动场景很方便，但是对于多对一场景就很麻烦了，需要监听多个字段的变化去控制一个字段状态，所以 Formily2.x 提供了响应式机制，可以让联动支持被动式联动，只需要关注某个字段所依赖的字段即可，依赖字段变化了，被依赖的字段即可自动联动。

## 主动模式

主动联动核心是基于

- [FormEffectHooks](https://core.formilyjs.org/zh-CN/api/entry/form-effect-hooks)
- [FieldEffectHooks](https://core.formilyjs.org/zh-CN/api/entry/field-effect-hooks)
- [setFormState](https://core.formilyjs.org/zh-CN/api/models/form#setformstate)
- [setFieldState](https://core.formilyjs.org/zh-CN/api/models/form#setfieldstate)
- [SchemaReactions](https://react.formilyjs.org/zh-CN/api/shared/schema#schemareactions)

实现主动联动，优点是实现一对多联动时非常方便

### 一对一联动

#### Effects 用例

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
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
        title="受控者"
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

### 一对多联动

#### Effects 用例

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('*(input1,input2)', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
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
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
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

### 依赖联动

#### Effects 用例

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
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
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
        title="控制者"
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
        title="受控者"
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

### 链式联动

#### Effects 用例

```tsx
import React from 'react'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input1', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.visible = !!field.value
      })
    })
    onFieldValueChange('input1', (field) => {
      form.setFieldState('input2', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
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
        title="控制者"
        default={false}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        default={true}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default={false}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
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
        title="受控者"
        default={true}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
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
        title="受控者"
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

### 循环联动

#### Effects 用例

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

#### SchemaReactions 用例

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
        title="数量"
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
        title="单价"
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

### 自身联动

#### Effects 用例

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
        title="颜色"
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

#### SchemaReactions 用例

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
        title="颜色"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          target: 'color',
          fulfill: {
            state: {
              'component[1].style.backgroundColor': '{{$self.value}}',
            },
            //以下用法也可以
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

### 异步联动

#### Effects 用例

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
          //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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

#### SchemaReactions 用例

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
          //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
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
        title="受控者"
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

## 被动模式

被动模式的核心是基于

- [onFieldReact](https://core.formilyjs.org/zh-CN/api/entry/field-effect-hooks#onfieldreact)实现全局响应式逻辑
- [FieldReaction](https://core.formilyjs.org/zh-CN/api/models/field#fieldreaction)实现局部响应式逻辑
- [SchemaReactions](https://react.formilyjs.org/zh-CN/api/shared/schema#schemareactions)实现 Schema 协议中的结构化逻辑描述(内部是基于 FieldReaction 来实现的)

### 一对一联动

#### Effects 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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

### 一对多联动

#### Effects 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
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
        title="受控者"
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

### 依赖联动

#### Effects 用例

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
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="dim_2"
        title="控制者"
        default={0}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="受控者"
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

### 链式联动

#### Effects 用例

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
        title="控制者"
        default={false}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        default={true}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input2"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default={false}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input1"
        title="受控者"
        default={true}
        enum={[
          { label: '显示', value: true },
          { label: '隐藏', value: false },
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
        title="受控者"
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

### 循环联动

#### Effects 用例

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

#### SchemaReactions 用例

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

### 自身联动

#### Effects 用例

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
        title="颜色"
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

#### SchemaReactions 用例

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
        title="颜色"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          fulfill: {
            state: {
              'component[1].style.backgroundColor': '{{$self.value}}',
            },
            //以下用法也可以
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

### 异步联动

#### Effects 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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

#### SchemaReactions 用例

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
        title="控制者"
        default="visible"
        enum={[
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'none' },
          { label: '隐藏-保留值', value: 'hidden' },
        ]}
        x-component="Select"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="input"
        title="受控者"
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
