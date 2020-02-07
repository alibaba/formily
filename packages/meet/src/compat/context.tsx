import React, { createContext, useContext } from 'react'
import { IFormItemTopProps } from '../types'

const FormItemContext = createContext<IFormItemTopProps>({})

export const FormItemProvider: React.FC<IFormItemTopProps> = ({
  children,
  prefix,
  size,
  labelAlign,
  // labelCol,
  inline,
  labelTextAlign,
  // wrapperCol
  labelWidth
}) => (
    <FormItemContext.Provider
      value={{
        prefix,
        labelAlign,
        // labelCol,
        labelTextAlign,
        labelWidth,
        // wrapperCol,
        size,
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
