# 前后端数据差异兼容方案

很多时候，我们总会遇到前端数据结构与后端数据结构不匹配的场景，看似很简单的问题，其实解决起来非常的让人难受，最常见的问题就是：

前端日期范围组件输出的是数组结构，但是后端要求的格式是拆分扁平数据结构，这种问题很大程度是受后端领域模型所限制，因为从后端模型设计的角度来看，拆分扁平结构是最佳方案；

但从前端组件化角度来看，数组结构又是最佳的；

所以哪一边都有其道理，可惜的是，每次都只能前端取消化这样一个不平等条约，不过，有了 Formily，你就完全不需要为这样一个尴尬局面而难受了，**Formily 提供了解构路径的能力，可以帮助用户快速解决这类问题。**，下面可以看看例子

## Markup Schema 案例

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm({
  effects() {
    onFieldValueChange('visible_destructor', (field) => {
      form.setFieldState('[startDate,endDate]', (state) => {
        state.visible = !!field.value
      })
    })
  },
})

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField>
        <SchemaField.Boolean
          name="visible_destructor"
          title="是否显示解构字段"
          default={true}
          enum={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          x-decorator="FormItem"
          x-component="Radio.Group"
        />
        <SchemaField.String
          name="undestructor"
          title="解构前"
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
        <SchemaField.String
          name="[startDate,endDate]"
          title="解构后"
          default={['2020-11-20', '2021-12-30']}
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
      </SchemaField>
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    visible_destructor: {
      type: 'boolean',
      title: '是否显示解构字段',
      default: true,
      enum: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    undestructor: {
      type: 'string',
      title: '解构前',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
    },
    '[startDate,endDate]': {
      type: 'string',
      title: '解构后',
      default: ['2020-11-20', '2021-12-30'],
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-reactions': {
        dependencies: ['visible_destructor'],
        fulfill: {
          state: {
            visible: '{{!!$deps[0]}}',
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { Field, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const form = createForm()

export default () => {
  return (
    <Form form={form} layout="vertical">
      <Field
        name="visible_destructor"
        title="是否显示解构字段"
        initialValue={true}
        dataSource={[
          { label: '是', value: true },
          { label: '否', value: false },
        ]}
        decorator={[FormItem]}
        component={[Radio.Group]}
      />
      <Field
        name="undestructor"
        title="解构前"
        decorator={[FormItem]}
        component={[DatePicker.RangePicker]}
      />
      <Field
        name="[startDate,endDate]"
        title="解构后"
        initialValue={['2020-11-20', '2021-12-30']}
        decorator={[FormItem]}
        component={[DatePicker.RangePicker]}
        reactions={(field)=>{
          field.visible = !!field.query('visible_destructor').value()
        }}
      />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```
