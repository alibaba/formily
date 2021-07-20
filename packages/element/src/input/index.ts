import { getComponentByTag } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewInputText } from '../preview-text'
import type { Input as ElInputProps } from 'element-ui'
import { Input as ElInput } from 'element-ui'

export type InputProps = ElInputProps

const TransformElInput = getComponentByTag<InputProps>(ElInput, {
  change: 'input',
})

export const Input = connect(
  TransformElInput,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewInputText)
)

export const TextArea = connect(
  Input,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewInputText)
)
