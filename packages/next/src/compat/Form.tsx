import React from 'react'
import { Form } from '@alifd/next'
import { FormProps } from '@alifd/next/types/form'
import { IFormItemTopProps } from '../types'
import { FormItemProvider } from './context'
import { normalizeCol } from '../shared'

export const CompatNextForm: React.FC<
  FormProps & IFormItemTopProps
> = props => {
  return (
    <FormItemProvider {...props}>
      <Form
        {...props}
        labelCol={normalizeCol(props.labelCol)}
        wrapperCol={normalizeCol(props.wrapperCol)}
        field={false}
      />
    </FormItemProvider>
  )
}
