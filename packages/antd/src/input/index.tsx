import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as AntdInput } from 'antd'
import { InputProps, TextAreaProps } from 'antd/lib/input'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  AntdInput,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffix
          )}
        </span>
      ),
    }
  }),
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input))

export default Input
