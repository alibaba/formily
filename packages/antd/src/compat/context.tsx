import React, { createContext, useContext } from 'react'
import { IFormItemTopProps } from '../types'

const FormItemContext = createContext<IFormItemTopProps>({})

export const FormItemProvider: React.FC<IFormItemTopProps> = ({
  children,
  prefixCls,
  labelAlign,
  labelCol,
  inline,
  wrapperCol
}) => (
  <FormItemContext.Provider
    value={{
      prefixCls,
      labelAlign,
      labelCol,
      wrapperCol,
      inline
    }}
  >
    {children}
  </FormItemContext.Provider>
)

FormItemProvider.displayName = 'FormItemProvider'

export const useFormItem = () => {
  return useContext(FormItemContext)
}
