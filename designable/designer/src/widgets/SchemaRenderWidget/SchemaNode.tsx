import React, { useContext } from 'react'
import { TreeNode } from '@designable/core'
import { FormPath } from '@formily/core'
import { useDesigner, TreeNodeContext } from '@designable/react'
import {
  ArrayField,
  Field,
  ObjectField,
  VoidField,
  observer,
  Schema,
} from '@formily/react'
import { SchemaRenderContext } from './context'
export interface ISchemaNodeProps {
  node: TreeNode
}

export const SchemaNode: React.FC<ISchemaNodeProps> = observer((props) => {
  const context = useContext(SchemaRenderContext)
  const designer = useDesigner()
  const node = props.node

  if (!node) return null

  const getFieldProps = () => {
    const base = new Schema(node.props)
    const props = base.toFieldProps({
      components: context.components,
    })
    if (props.decorator?.[0]) {
      props.decorator[1] = props.decorator[1] || {}
      FormPath.setIn(props.decorator[1], designer.props.nodeIdAttrName, node.id)
    } else if (props.component?.[1]) {
      props.component[1] = props.component[1] || {}
      FormPath.setIn(props.component[1], designer.props.nodeIdAttrName, node.id)
    }
    props.value = props.initialValue
    return props as any
  }

  const renderChildren = () => {
    if (node.designerProps.selfRenderChildren) return
    if (!node.children.length) return
    return node.children.map((node) => {
      return <SchemaNode node={node} key={node.id} />
    })
  }

  const renderField = () => {
    const props = getFieldProps()
    if (node.props.type === 'object') {
      return (
        <ObjectField {...props} name={props.name || node.id}>
          {renderChildren()}
        </ObjectField>
      )
    } else if (node.props.type === 'array') {
      return <ArrayField {...props} name={props.name || node.id} />
    } else if (node.props.type === 'void') {
      return (
        <VoidField {...props} name={props.name || node.id}>
          {renderChildren()}
        </VoidField>
      )
    }
    return <Field {...props} name={props.name || node.id} />
  }
  return (
    <TreeNodeContext.Provider value={node}>
      {renderField()}
    </TreeNodeContext.Provider>
  )
})
