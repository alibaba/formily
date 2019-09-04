import { connect, registerFormField } from '@uform/react-schema-form'
import { NumberPicker } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(NumberPicker))
)
