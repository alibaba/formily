import React, { createContext, useContext } from 'react'
import { IFormItemTopProps } from './types'

//递归控制
const NextFormItemDeepContext = createContext<IFormItemTopProps>({})
const NextFormItemShallowContext = createContext({})

export const FormItemDeepProvider: React.FC<IFormItemTopProps> = ({
  children,
  prefix,
  size,
  labelAlign,
  labelCol,
  inline,
  labelTextAlign,
  wrapperCol
}) => (
  <NextFormItemDeepContext.Provider
    value={{
      prefix,
      labelAlign,
      labelCol,
      labelTextAlign,
      wrapperCol,
      size,
      inline
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
