import { connect, registerFormField } from '@uform/react'
import { Transfer } from 'antd'
import { mapLoadingProps } from '../utils'

registerFormField(
  'transfer',
  connect({
    getProps: mapLoadingProps
  })(Transfer)
)
