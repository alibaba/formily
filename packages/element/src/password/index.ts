import { Input } from '../input'
import { connect, mapProps } from '@formily/vue'

import type { Input as ElInputProps } from 'element-ui'

export type PasswordProps = ElInputProps

export const Password = connect(
  Input,
  mapProps((props) => {
    return {
      ...props,
      showPassword: true,
    }
  })
)
