import React from 'react'
import './styles.less'
import { Droppable } from '../Droppable'

export const createFormContainer = (
  Target: React.JSXElementConstructor<any>,
  inlineLayout = false
) => {
  const Component = (props: any) => {
    if (props.children) {
      return <Target {...props}>{props.children}</Target>
    }
    return <Droppable />
  }
  Component.designerProps = {
    inlineChildrenLayout: inlineLayout,
  }
  return Component
}
