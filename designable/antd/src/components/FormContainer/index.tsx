import React from 'react'
import { GlobalRegistry } from '@designable/core'
import { usePrefix } from '@designable/react'
import { Empty } from 'antd'
import cls from 'classnames'
import './styles.less'

const groupProps = (props: any) => {
  const keys = Object.keys(props || {})
  const dataKeys = keys.filter((key) => key.indexOf('data-') > -1)
  const otherKeys = keys.filter((key) => key.indexOf('data-') === -1)
  const dataProps = dataKeys.reduce((buf, key) => {
    buf[key] = props[key]
    return buf
  }, {})
  const otherProps = otherKeys.reduce((buf, key) => {
    buf[key] = props[key]
    return buf
  }, {})
  return {
    dataProps,
    otherProps,
  }
}

export const createFormContainer = (
  Target: React.JSXElementConstructor<any>,
  inlineLayout = false
) => {
  const Component = (props: any) => {
    const prefix = usePrefix('form-container')
    const { dataProps, otherProps } = groupProps(props)
    if (props.children) {
      return (
        <div {...dataProps} className={prefix + '-wrapper'}>
          <Target {...otherProps}>{props.children}</Target>
        </div>
      )
    }
    return (
      <Empty
        {...dataProps}
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
