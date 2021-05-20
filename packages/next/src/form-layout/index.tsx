import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface IFormLayoutProps {
  prefix?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number
  wrapperCol?: number
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal' | 'inline'
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  bordered?: boolean
}

export const FormLayoutDeepContext = createContext<IFormLayoutProps>(null)

export const FormLayoutShallowContext = createContext<IFormLayoutProps>(null)

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
})

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutProps
  useFormDeepLayout: () => IFormLayoutProps
  useFormShallowLayout: () => IFormLayoutProps
} = ({ shallow, children, prefix, className, style, ...props }) => {
  const deepLayout = useFormDeepLayout()
  const formPrefixCls = usePrefixCls('form')
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefix })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: true,
      [`${formPrefixCls}-rtl`]: props.direction === 'rtl',
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    const newDeepLayout = {
      ...deepLayout,
    }
    if (!shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
      if (props.colon) {
        newDeepLayout.colon = props.colon
      }
    }
    return (
      <FormLayoutDeepContext.Provider value={newDeepLayout}>
        <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
          {children}
        </FormLayoutShallowContext.Provider>
      </FormLayoutDeepContext.Provider>
    )
  }
  return (
    <div className={layoutClassName} style={style}>
      {renderChildren()}
    </div>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormDeepLayout = useFormDeepLayout
FormLayout.useFormShallowLayout = useFormShallowLayout
FormLayout.useFormLayout = useFormLayout

export default FormLayout
