import React from 'react'
import { useDesigner } from '@designable/react'
import cls from 'classnames'
import './styles.less'

export interface IDesignableTextProps {
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  className?: string
}

export const DesignableText: React.FC<IDesignableTextProps> = (props) => {
  const designer = useDesigner()
  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
  return React.createElement(
    tagName,
    {
      ...props,
      className: cls(props.className, 'dn-text'),
      [designer.props.contentEditableAttrName]: 'x-component-props.content',
    },
    props.content
  )
}
