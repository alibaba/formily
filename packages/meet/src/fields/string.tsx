import { connect, registerFormField } from '@uform/react-schema-renderer'
import { TextField } from '@alifd/meet';
import { mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'string',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(TextField)
)
