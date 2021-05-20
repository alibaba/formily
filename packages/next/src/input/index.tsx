import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Input as NextInput } from '@alifd/next'
import { InputProps, TextAreaProps } from '@alifd/next/lib/input'
import { PreviewText } from '../preview-text'
import { mapSize, mapStatus } from '../__builtins__'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  NextInput,
  mapProps(mapSize, mapStatus),
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(
  NextInput.TextArea,
  mapProps(mapSize, mapStatus),
  mapReadPretty(PreviewText.Input)
)

export default Input
