import React from 'react'
import { useNodeIdProps } from '@designable/react'
import { Droppable } from '../Droppable'
import './styles.less'

export const createDesignableContainer = (
  Target: React.JSXElementConstructor<any>
) => {
  return (props: any) => {
    const nodeId = useNodeIdProps()
    if (props.children) {
      return (
        <div {...nodeId}>
          <Target {...props}>{props.children}</Target>
        </div>
      )
    }
    return <Droppable {...props} />
  }
}
