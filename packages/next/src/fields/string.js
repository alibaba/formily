import { connect, registerFormField } from '@uform/react'
import { Input } from '@alife/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'string',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(Input))
)
