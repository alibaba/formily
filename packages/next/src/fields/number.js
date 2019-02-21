import { connect, registerFormField } from '@uform/react'
import { NumberPicker } from '@alife/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(NumberPicker))
)
