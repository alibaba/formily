import { getComponentByTag } from '../__builtins__/shared'
import { connect, mapProps } from '@formily/vue'

import type { Input as ElInputProps } from 'element-ui'
import { Input as ElInput } from 'element-ui'

export type InputProps = ElInputProps

const TransformElInput = getComponentByTag<InputProps>(ElInput, {
  change: 'input',
})

export const Input = connect(
  TransformElInput,
  mapProps({ readOnly: 'readonly' })
)

export const Textarea = connect(
  Input,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  })
)
