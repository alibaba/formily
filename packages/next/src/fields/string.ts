import { connect, registerFormField } from '@uform/react-schema-form'
import { Input } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'string',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(Input))
)
