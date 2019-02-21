import { connect, registerFormField } from '@uform/react'
import { Radio } from '@alife/next'
import { mapStyledProps, mapTextComponent } from '../utils'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(RadioGroup)
)
