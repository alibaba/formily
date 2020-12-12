import { connect, mapReadPretty } from '@formily/react'
import { Input as AntdInput } from 'antd'
import { InputProps, TextAreaProps } from 'antd/lib/input'
import { PreviewText } from '../preview-text'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  AntdInput,
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input))

export default Input
