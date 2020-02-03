import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Transfer } from 'antd'
import { mapStyledProps } from '../shared'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps,
    valueName: 'targetKeys'
  })(Transfer)
)
