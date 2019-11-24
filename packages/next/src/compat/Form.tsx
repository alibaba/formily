import React from 'react'
import { Form } from '@alifd/next'
import { FormProps } from '@alifd/next/types/form'
import { IFormItemTopProps } from '../types'
import { FormItemProvider } from './context'
import { normalizeCol } from '../shared'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@uform/react-shared-components'

export const CompatNextForm: React.FC<FormProps &
  IFormItemTopProps &
  PreviewTextConfigProps> = props => {
  return (
    <FormItemProvider {...props}>
      <PreviewText.ConfigProvider value={props}>
        <Form
          {...props}
          labelCol={normalizeCol(props.labelCol)}
          wrapperCol={normalizeCol(props.wrapperCol)}
          field={false}
        />
      </PreviewText.ConfigProvider>
    </FormItemProvider>
  )
}
