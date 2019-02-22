import { connect, registerFormField } from '@uform/react'
import { TimePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'time',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(TimePicker)
)
