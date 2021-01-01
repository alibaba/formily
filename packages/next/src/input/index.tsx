import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Input as NextInput } from '@alifd/next'
import { InputProps, TextAreaProps } from '@alifd/next/lib/input'
import { PreviewText } from '../preview-text'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  NextInput,
  mapProps((props) => {
    const onChange = props.onChange
    return {
      onChange(value) {
        onChange(value, null)
      },
    }
  }),
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(NextInput.TextArea, mapReadPretty(PreviewText.Input))

export default Input
