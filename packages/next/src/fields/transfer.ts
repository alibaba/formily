import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Transfer } from '@alifd/next'
import { mapStyledProps } from '../shared'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps
  })(Transfer)
)
