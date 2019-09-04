import { connect, registerFormField } from '@uform/react-schema-form'
import { Transfer } from '@alifd/next'
import { mapStyledProps } from '../utils'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps
  })(Transfer)
)
