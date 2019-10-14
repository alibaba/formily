import React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'
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
        layout={props.inline ? 'inline' : props.layout}
        form={undefined}
      />
    </FormItemProvider>
  )
}
