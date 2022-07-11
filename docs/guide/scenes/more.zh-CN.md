# 更多场景

因为 Formily 在表单层面上是一个非常完备的方案，而且还很灵活，支持的场景非常多，但是场景案例，我们无法一一列举。

所以，还是希望社区能帮助 Formily 完善更多场景案例！我们会不胜感激！😀

```tsx
import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd'
import { Card, Slider, Rate } from 'antd'

const Text: React.FC<{
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode
  return React.createElement(tagName, props, value || content)
}

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
})

export default () => {
  const form = useMemo(() => createForm(), [])

  const onCase1Handler = () => {
    console.log('case1')
    form.setValues({
      array: [{ name: 1, age: 2 }],
    })
  }

  const onCase2Handler = () => {
    console.log('case2')
    form.setValues({
      array: [
        { name: 11, age: 22 },
        { name: 33, age: 44 },
      ],
    })
  }

  return (
    <Form form={form} labelCol={6} wrapperCol={12}>
      <button onClick={onCase1Handler}>case 1</button>
      <button onClick={onCase2Handler}>case 2</button>
      <SchemaField>
        <SchemaField.Array
          x-decorator="FormItem"
          x-component="ArrayCards"
          x-component-props={{ title: 'title' }}
          x-validator={[]}
          name="array"
        >
          <SchemaField.Object name="td9ytdpasln">
            <SchemaField.Void
              x-component="ArrayCards.Index"
              name="de9p053u0kf"
            />
            <SchemaField.Void
              x-component="Card"
              x-component-props={{ title: '{{$record.name}}' }}
              name="c0fh6krpd0o"
            >
              <SchemaField.String
                title="Input"
                x-decorator="FormItem"
                x-component="Input"
                x-validator={[]}
                name="name"
              />
              <SchemaField.String
                title="Input"
                x-decorator="FormItem"
                x-component="Input"
                x-validator={[]}
                name="age"
              />
            </SchemaField.Void>
            <SchemaField.Void
              title="Addition"
              x-component="ArrayCards.Remove"
              name="zk49a25jirt"
            />
            <SchemaField.Void
              title="Addition"
              x-component="ArrayCards.MoveDown"
              name="ixgmgbhm7fh"
            />
            <SchemaField.Void
              title="Addition"
              x-component="ArrayCards.MoveUp"
              name="pbfe2l4qv9f"
            />
          </SchemaField.Object>
          <SchemaField.Void
            title="Addition"
            x-component="ArrayCards.Addition"
            name="e5odnkjy0br"
          />
        </SchemaField.Array>
      </SchemaField>
    </Form>
  )
}
```
