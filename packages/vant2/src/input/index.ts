import { composeExport, transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Field as ElInputProps } from 'vant'
import { Field as ElInput } from 'vant'

export type InputProps = ElInputProps

const TransformElInput = transformComponent<InputProps>(ElInput, {
  change: 'input',
})

const InnerInput = connect(
  TransformElInput,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      autosize: true,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
