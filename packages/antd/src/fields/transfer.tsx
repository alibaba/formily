import { connect, registerFormField } from '@uform/react-schema-form'
import { Transfer } from 'antd'
import { mapStyledProps } from '../utils'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps,
    valueName: 'targetKeys'
  })(Transfer)
)
