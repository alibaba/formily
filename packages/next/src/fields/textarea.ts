import { connect, registerFormField } from '@uform/react'
import { Input } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

const { TextArea } = Input

registerFormField(
  'textarea',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(TextArea))
)
