/**
 * 1. FormItem网格布局
 * 2. 居中，居右，居左布局
 * 3. 行内布局
 * 4. 吸底布局
 */
import React, {
  useRef,
  useLayoutEffect,
  useState,
  createContext,
  useContext,
} from 'react'
import StickyBox, { StickyBoxMode } from 'react-sticky-box'
import { Form } from 'antd'
import { FormItemProps } from 'antd/lib/form'

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
}

type ComposedButtonGroup = React.FC<FormItemProps> & {
  Sticky: React.FC<IStickyProps>
}

function getInheritedBackgroundColor(el: HTMLElement) {
  // get default style for current browser
  var defaultStyle = getDefaultBackground() // typically "rgba(0, 0, 0, 0)"

  // get computed color for el
  var backgroundColor = window.getComputedStyle(el).backgroundColor

  // if we got a real value, return it
  if (backgroundColor != defaultStyle) return backgroundColor

  // if we've reached the top parent el without getting an explicit color, return default
  if (!el.parentElement) return defaultStyle

  // otherwise, recurse and try again on parent element
  return getInheritedBackgroundColor(el.parentElement)
}

function getDefaultBackground() {
  // have to add to the document in order to use getComputedStyle
  var div = document.createElement('div')
  document.head.appendChild(div)
  var bg = window.getComputedStyle(div).backgroundColor
  document.head.removeChild(div)
  return bg
}

const PaddingContext = createContext(0)

export const FormButtonGroup: ComposedButtonGroup = (props) => {
  const padding = useContext(PaddingContext)
  return (
    <Form.Item
      {...props}
      style={{ paddingTop: padding, paddingBottom: padding, ...props?.style }}
      label=" "
      colon={false}
    >
      {props.children}
    </Form.Item>
  )
}

FormButtonGroup.Sticky = (props) => {
  const ref = useRef()
  const [color, setColor] = useState('transparent')
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
      style={{ ...props.style, backgroundColor: color }}
      bottom
    >
      <PaddingContext.Provider value={props.padding || 10}>
        <div ref={ref}>{props.children}</div>
      </PaddingContext.Provider>
    </StickyBox>
  )
}

export default FormButtonGroup
