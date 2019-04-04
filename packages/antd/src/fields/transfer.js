import { connect, registerFormField } from '@uform/react'
import { Transfer } from 'antd'
import { mapStyledProps } from '../utils'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps
  })(Transfer)
)
