import React, { useMemo } from 'react'
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
  PreviewTextConfigProps & { onSubmit: () => void }> = props => {
  const { inline, previewPlaceholder, ...rest } = props
  return (
    <FormItemDeepProvider {...props}>
      <PreviewText.ConfigProvider value={props}>
        <Form
          {...rest}
          labelCol={normalizeCol(props.labelCol)}
          wrapperCol={normalizeCol(props.wrapperCol)}
          layout={inline ? 'inline' : props.layout}
          component={useMemo(() => {
            return innerProps => {
              return React.createElement('form', {
                ...innerProps,
                ...rest
              })
            }
          }, [])}
        />
      </PreviewText.ConfigProvider>
    </FormItemDeepProvider>
  )
}
