import React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'
import { IFormItemTopProps } from '../types'
import { FormItemProvider } from './context'
import { normalizeCol } from '../shared'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@uform/react-shared-components'
export const CompatAntdForm: React.FC<FormProps &
  IFormItemTopProps &
  PreviewTextConfigProps> = props => {
  const { inline, ...rest } = props;
  return (
    <FormItemProvider {...props}>
      <PreviewText.ConfigProvider value={props}>
        <Form
          {...rest}
          labelCol={normalizeCol(props.labelCol)}
          wrapperCol={normalizeCol(props.wrapperCol)}
          layout={inline ? 'inline' : props.layout}
          form={undefined}
        />
      </PreviewText.ConfigProvider>
    </FormItemProvider>
  )
}
