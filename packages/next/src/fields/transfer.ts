import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Transfer } from '@alifd/next'
import { mapStyledProps } from '../shared'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps
  })(Transfer)
)
