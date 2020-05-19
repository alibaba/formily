import React, { createContext, useContext } from 'react'
import { IFormItemTopProps } from './types'

//递归控制
const NextFormItemDeepContext = createContext<IFormItemTopProps>({})
const NextFormItemShallowContext = createContext({})

export const FormItemDeepProvider: React.FC<IFormItemTopProps> = ({
  children,
  prefixCls,
  labelAlign,
  labelCol,
  inline,
  wrapperCol,
  size
}) => (
  <NextFormItemDeepContext.Provider
    value={{
      prefixCls,
      labelAlign,
      labelCol,
      wrapperCol,
      inline,
      size
    }}
  >
    {children}
  </NextFormItemDeepContext.Provider>
)

FormItemDeepProvider.displayName = 'FormItemDeepProvider'

export const useDeepFormItem = () => {
  return useContext(NextFormItemDeepContext)
}

export const FormItemShallowProvider = ({ children, ...props }) => (
  <NextFormItemShallowContext.Provider value={props}>
    {children}
  </NextFormItemShallowContext.Provider>
)

export const useShallowFormItem = () => {
  return useContext(NextFormItemShallowContext)
}
