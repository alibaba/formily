import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface FormLayoutProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number
  wrapperCol?: number
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal' | 'inline'
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  feedbackLayout?: 'loose' | 'terse' | 'popover'
  bordered?: boolean
}

export const FormLayoutContext = createContext<FormLayoutProps>(null)

export const FormLayoutShallowContext = createContext<FormLayoutProps>(null)

export const useFormLayout = () => useContext(FormLayoutContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const FormLayout: React.FC<FormLayoutProps> = ({
  shallow,
  children,
  prefixCls,
  className,
  style,
  ...props
}) => {
  const formPrefixCls = usePrefixCls('form')
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
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
    if (shallow) {
      return (
        <FormLayoutShallowContext.Provider value={props}>
          {children}
        </FormLayoutShallowContext.Provider>
      )
    } else {
      return (
        <FormLayoutContext.Provider value={props}>
          {children}
        </FormLayoutContext.Provider>
      )
    }
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

export default FormLayout