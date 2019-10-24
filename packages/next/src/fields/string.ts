import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Input } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'string',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(acceptEnum(Input))
)
