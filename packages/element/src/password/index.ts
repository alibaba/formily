import { Input } from '../input'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Input as ElInputProps } from 'element-ui'

export type PasswordProps = ElInputProps

export const Password = connect(
  Input,
  mapProps((props) => {
    return {
      ...props,
      showPassword: true,
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Password
