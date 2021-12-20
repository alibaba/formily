import React from 'react'
import { Form } from '@alifd/next'
import { FormProps } from '@alifd/next/types/form'
import { IFormItemTopProps } from '../types'
import { FormItemDeepProvider } from '../context'
import { normalizeCol } from '../shared'
import {
  PreviewText,
  PreviewTextConfigProps
} from '@formily/react-shared-components'

export const NextSchemaFormAdaptor: React.FC<FormProps &
  IFormItemTopProps &
  PreviewTextConfigProps> = props => {
  const { previewPlaceholder, ...rest } = props
  return (
    <FormItemDeepProvider {...rest}>
      <PreviewText.ConfigProvider value={props}>
        <Form
          {...rest}
          labelCol={normalizeCol(props.labelCol)}
          wrapperCol={normalizeCol(props.wrapperCol)}
          field={false}
        />
      </PreviewText.ConfigProvider>
    </FormItemDeepProvider>
  )
}
