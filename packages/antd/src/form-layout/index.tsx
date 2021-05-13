import React, { createContext, useContext } from 'react'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'

export interface IFormLayoutProps {
  prefixCls?: string
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

export const FormLayoutContext = createContext<IFormLayoutProps>(null)

export const useFormLayout = () => useContext(FormLayoutContext)

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutProps
} = ({ shallow, children, prefixCls, className, style, ...props }) => {
  const parentLayout = useFormLayout()
  const providerValue = shallow
    ? {
        size: parentLayout.size,
        ...props,
      }
    : {
        ...parentLayout,
        ...props,
      }

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

  return (
    <div className={layoutClassName} style={style}>
      <FormLayoutContext.Provider value={providerValue}>
        {children}
      </FormLayoutContext.Provider>
    </div>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormLayout = useFormLayout

export default FormLayout
