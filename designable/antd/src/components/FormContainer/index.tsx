import React from 'react'
import { GlobalRegistry } from '@designable/core'
import { usePrefix } from '@designable/react'
import { Empty } from 'antd'
import cls from 'classnames'
import './styles.less'

export const createFormContainer = (
  Target: React.JSXElementConstructor<any>,
  inlineLayout = false
) => {
  const Component = (props: any) => {
    const prefix = usePrefix('form-container')
    if (props.children) {
      return <Target {...props}>{props.children}</Target>
    }
    return (
      <Empty
        {...props}
        className={cls(prefix, props.className)}
        description={GlobalRegistry.getDesignerMessage('droppable')}
      />
    )
  }
  Component.designerProps = {
    inlineChildrenLayout: inlineLayout,
  }
  return Component
}
