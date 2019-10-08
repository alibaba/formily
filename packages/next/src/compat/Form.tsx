import React from 'react'
import { Form } from '@alifd/next'
import { FormProps } from '@alifd/next/types/form'
import { IFormItemTopProps } from '../types'
import { FormItemProvider } from './context'

export const CompatNextForm: React.FC<
  FormProps & IFormItemTopProps
> = props => {
  return (
    <FormItemProvider {...props}>
      <Form {...props} field={false} />
    </FormItemProvider>
  )
}
