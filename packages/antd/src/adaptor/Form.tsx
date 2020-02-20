import React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form'
import { IFormItemTopProps } from '../types'
import { FormItemDeepProvider } from '../context'
import { normalizeCol } from '../shared'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@formily/react-shared-components'

export const AntdSchemaFormAdaptor: React.FC<FormProps &
  IFormItemTopProps &
  PreviewTextConfigProps> = props => {
  const { inline, previewPlaceholder, ...rest } = props
  return (
    <FormItemDeepProvider {...props}>
      <PreviewText.ConfigProvider value={props}>
        <Form
          {...rest}
          labelCol={normalizeCol(props.labelCol)}
          wrapperCol={normalizeCol(props.wrapperCol)}
          layout={inline ? 'inline' : props.layout}
          form={undefined}
        />
      </PreviewText.ConfigProvider>
    </FormItemDeepProvider>
  )
}
