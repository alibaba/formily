import React from 'react'
import { useNodeIdProps, useTreeNode } from '@designable/react'
import { Droppable } from '../Droppable'

export const DesignableObject: React.FC = (props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.children.length === 0) return <Droppable {...nodeId} />
  return <div {...nodeId}>{props.children}</div>
}
