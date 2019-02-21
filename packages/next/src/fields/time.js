import { connect, registerFormField } from '@uform/react'
import { TimePicker } from '@alife/next'
import { mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'time',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(TimePicker)
)
