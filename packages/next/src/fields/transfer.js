import { connect, registerFormField } from '@uform/react'
import { Transfer } from '@alife/next'
import { mapStyledProps } from '../utils'

registerFormField(
  'transfer',
  connect({
    getProps: mapStyledProps
  })(Transfer)
)
