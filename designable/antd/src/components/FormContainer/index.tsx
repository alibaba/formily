import React from 'react'
import './styles.less'
import { Droppable } from '../Droppable'

export const createFormContainer = (
  Target: React.JSXElementConstructor<any>
) => {
  return (props: any) => {
    if (props.children) {
      return <Target {...props}>{props.children}</Target>
    }
    return <Droppable {...props} />
  }
}
