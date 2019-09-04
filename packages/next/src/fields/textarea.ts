import { connect, registerFormField } from '@uform/react-schema-form'
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
