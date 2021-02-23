# LogicDiagram

## Markup Schema 案例

```jsx
import React from 'react'
import {
  Switch,
  Input,
  Select,
  LogicDiagram,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm, onFieldChange } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Switch,
    Input,
    Select,
    LogicDiagram,
    FormItem,
  },
})

const form = createForm({
  initialValues: {
    editable: true,
    logic: {
      relation: 'OR',
      rule: [
        { field: 'field1', operator: 'EQ', value: '123' },
        {
          relation: 'AND',
          rule: [
            { field: 'field2', operator: 'NEQ', value: '456' },
            { field: 'field2', operator: 'NEQ', value: '654' },
          ],
        },
        { field: 'field3', operator: 'EQ', value: '789' },
      ],
    },
  },
  effects: () => {
    onFieldChange('editable', ['value'], (field) => {
      field.query('logic').take((target) => {
        target.editable = !!field.value
      })
    })
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.Boolean
        name="editable"
        title="可编辑"
        x-decorator="FormItem"
        x-component="Switch"
      />
      <SchemaField.Object
        name="logic"
        title="条件表达式"
        x-decorator="FormItem"
        x-component="LogicDiagram"
      >
        <SchemaField.Void x-component="LogicDiagram.Relation">
          <SchemaField.String
            name="relation"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '或', value: 'OR' },
              { label: '且', value: 'AND' },
            ]}
          />
        </SchemaField.Void>
        <SchemaField.Object name="rule" x-component="LogicDiagram.Rule">
          <SchemaField.String
            name="field"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '字段一', value: 'field1' },
              { label: '字段二', value: 'field2' },
              { label: '字段三', value: 'field3' },
            ]}
            required
          />
          <SchemaField.String
            name="operator"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              { label: '等于', value: 'EQ' },
              { label: '不等于', value: 'NEQ' },
            ]}
            required
          />
          <SchemaField.String
            name="value"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
        </SchemaField.Object>
        <SchemaField.Void x-component="LogicDiagram.AddRule" name="addRule" />
        <SchemaField.Void
          x-component="LogicDiagram.AddRuleGroup"
          name="addRuleGroup"
        />
        <SchemaField.Void
          x-component="LogicDiagram.RemoveRule"
          name="removeRule"
        />
      </SchemaField.Object>
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```
