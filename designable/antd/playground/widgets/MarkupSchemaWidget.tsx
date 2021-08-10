import React from 'react'
import { TreeNode } from '@designable/core'
import { MonacoInput } from '@designable/react-settings-form'
import { isEmpty, isPlainObj } from '@formily/shared'

export interface IMarkupSchemaWidgetProps {
  tree: TreeNode
}

const transformToMarkupSchemaCode = (tree: TreeNode) => {
  const printAttribute = (node: TreeNode) => {
    if (!node) return ''
    return `${Object.keys(node.props || {})
      .map((key) => {
        if (
          key === '_designableId' ||
          key === '_isJSONSchemaObject' ||
          key === 'version' ||
          key === 'type'
        )
          return ''
        const value = node.props[key]
        if (isPlainObj(value) && isEmpty(value)) return ''
        if (typeof value === 'string') return `${key}="${value}"`
        return `${key}={${JSON.stringify(value)}}`
      })
      .join(' ')}`
  }
  const printChildren = (node: TreeNode) => {
    if (!node) return ''
    return node.children
      .map((child) => {
        return printNode(child)
      })
      .join('')
  }
  const printTag = (node: TreeNode) => {
    if (node.props.type === 'string') return 'SchemaField.String'
    if (node.props.type === 'number') return 'SchemaField.Number'
    if (node.props.type === 'boolean') return 'SchemaField.Boolean'
    if (node.props.type === 'date') return 'SchemaField.Date'
    if (node.props.type === 'datetime') return 'SchemaField.DateTime'
    if (node.props.type === 'array') return 'SchemaField.Array'
    if (node.props.type === 'object') return 'SchemaField.Object'
    if (node.props.type === 'void') return 'SchemaField.Void'
    return 'SchemaField.Markup'
  }
  const printNode = (node: TreeNode) => {
    if (!node) return ''
    return `<${printTag(node)} ${printAttribute(node)} ${
      node.children.length
        ? `>${printChildren(node)}</${printTag(node)}>`
        : '/>'
    }`
  }
  const root = tree.find((child) => {
    return child.componentName === 'Root'
  })
  return `import React, { useMemo } from 'react'
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

export default ()=>{
  const form = useMemo(()=>createForm(),[])

  return <Form form={form} ${printAttribute(root)}>
    <SchemaField>
      ${printChildren(root)}
    </SchemaField>
  </Form>
}
  
`
}

export const MarkupSchemaWidget: React.FC<IMarkupSchemaWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      options={{ readOnly: true }}
      value={transformToMarkupSchemaCode(props.tree)}
      language="typescript"
    />
  )
}
