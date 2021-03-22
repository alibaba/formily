# 实现联动逻辑

Formily1.x 中实现联动逻辑只有一种模式，也就是主动模式，必须要监听一个或多个字段的事件变化去控制另一个或者多个字段的状态，这样对于一对多联动场景很方便，但是对于多对一场景就很麻烦了，需要监听多个字段的变化去控制一个字段状态，所以 Formily2.x 提供了响应式机制，可以让联动支持被动式联动，只需要关注某个字段所依赖的字段即可，依赖字段变化了，被依赖的字段即可自动联动。

实现联动逻辑的方式主要有以下三种方式：

- Form effects 中实现
- Field reactions 中实现
- Schema x-reactions 中实现

## 主动模式

主动联动核心是基于

- [FormEffectHooks](https://core.formilyjs.org/api/entry/form-effect-hooks)
- [FieldEffectHooks](https://core.formilyjs.org/api/entry/field-effect-hooks)
- [setFormState](https://core.formilyjs.org/api/models/form#setformstate)
- [setFieldState](https://core.formilyjs.org/api/models/form#setfieldstate)

实现主动联动，优点是实现一对多联动时非常方便

### 一对一联动

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

### 一对多联动

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

### 依赖联动

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
        title="控制者1"
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

### 链式联动

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
        state.display = field.value ? 'visible' : 'none'
      })
    })
    onFieldValueChange('input1', (field) => {
      form.setFieldState('input2', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value ? 'visible' : 'none'
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

### 循环联动

## 被动模式

### 一对一联动

### 一对多联动

### 依赖联动

### 链式联动

### 循环联动
