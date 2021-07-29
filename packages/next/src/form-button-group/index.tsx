/**
 * 1. FormItem网格布局
 * 2. 居中，居右，居左布局
 * 3. 行内布局
 * 4. 吸底布局
 */
import React, { useRef, useLayoutEffect, useState } from 'react'
import StickyBox, { StickyBoxMode } from 'react-sticky-box'
import { Space, ISpaceProps } from '../space'
import { BaseItem, IFormItemProps } from '../form-item'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
interface IStickyProps {
  offsetTop?: number
  offsetBottom?: number
  bottom?: boolean
  onChangeMode?: (
    oldMode: StickyBoxMode | undefined,
    newMode: StickyBoxMode
  ) => any
  style?: React.CSSProperties
  className?: string
  padding?: number
  align?: React.CSSProperties['textAlign']
}

type IFormButtonGroupProps = Omit<ISpaceProps, 'align' | 'size'> & {
  align?: React.CSSProperties['textAlign']
  gutter?: number
}

type ComposedButtonGroup = React.FC<IFormButtonGroupProps> & {
  Sticky: React.FC<IStickyProps>
  FormItem: React.FC<
    IFormItemProps & {
      gutter?: number
    }
  >
}

function getInheritedBackgroundColor(el: HTMLElement) {
  // get default style for current browser
  let defaultStyle = getDefaultBackground() // typically "rgba(0, 0, 0, 0)"

  // get computed color for el
  let backgroundColor = window.getComputedStyle(el).backgroundColor

  // if we got a real value, return it
  if (backgroundColor != defaultStyle) return backgroundColor

  // if we've reached the top parent el without getting an explicit color, return default
  if (!el.parentElement) return defaultStyle

  // otherwise, recurse and try again on parent element
  return getInheritedBackgroundColor(el.parentElement)
}

function getDefaultBackground() {
  // have to add to the document in order to use getComputedStyle
  let div = document.createElement('div')
  document.head.appendChild(div)
  let bg = window.getComputedStyle(div).backgroundColor
  document.head.removeChild(div)
  return bg
}

export const FormButtonGroup: ComposedButtonGroup = ({
  align,
  gutter,
  ...props
}) => {
  const prefixCls = usePrefixCls('formily-button-group')
  return (
    <Space
      {...props}
      size={gutter}
      className={cls(prefixCls, props.className)}
      style={{
        ...props.style,
        justifyContent:
          align === 'left'
            ? 'flex-start'
            : align === 'right'
            ? 'flex-end'
            : 'center',
        display: 'flex',
      }}
    >
      {props.children}
    </Space>
  )
}

FormButtonGroup.defaultProps = {
  align: 'left',
}

FormButtonGroup.FormItem = ({ gutter, ...props }) => {
  return (
    <BaseItem
      {...props}
      label=" "
      style={{
        margin: 0,
        padding: 0,
        ...props.style,
        width: '100%',
      }}
      colon={false}
    >
      {props.children?.['length'] ? (
        <Space size={gutter}>{props.children}</Space>
      ) : (
        props.children
      )}
    </BaseItem>
  )
}

FormButtonGroup.Sticky = ({ align, ...props }) => {
  const ref = useRef()
  const [color, setColor] = useState('transparent')
  const prefixCls = usePrefixCls('formily-button-group')

  useLayoutEffect(() => {
    if (ref.current) {
      const computed = getInheritedBackgroundColor(ref.current)
      if (computed !== color) {
        setColor(computed)
      }
    }
  })
  return (
    <StickyBox
      {...props}
      className={cls(`${prefixCls}-sticky`, props.className)}
      style={{
        backgroundColor: color,
        ...props.style,
      }}
      bottom
    >
      <div
        ref={ref}
        className={`${prefixCls}-sticky-inner`}
        style={{
          ...props.style,
          justifyContent:
            align === 'left'
              ? 'flex-start'
              : align === 'right'
              ? 'flex-end'
              : 'center',
        }}
      >
        {props.children}
      </div>
    </StickyBox>
  )
}

FormButtonGroup.Sticky.defaultProps = {
  align: 'left',
}

export default FormButtonGroup
