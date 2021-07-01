import React from 'react'
import { transformToSchema, transformToTreeNode } from '@designable/formily'
import { TreeNode, ITreeNode } from '@designable/core'
import { MonacoInput } from '@designable/react-settings-form'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

const Parser = {
  designableFormName: 'Root',
  designableFieldName: 'DesignableField',
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(transformToSchema(props.tree, Parser), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value), Parser))
      }}
      language="json"
    />
  )
}
