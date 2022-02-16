import { composeExport, transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Field as VanInputProps } from 'vant'
import { Field as VanInput } from 'vant'

export type InputProps = VanInputProps

const TransformVanInput = transformComponent<InputProps>(VanInput, {
  change: 'input',
})

const InnerInput = connect(
  TransformVanInput,
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
