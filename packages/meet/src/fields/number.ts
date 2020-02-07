import { connect, registerFormField } from '@uform/react-schema-renderer'
import { NumberPicker } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(NumberPicker)
)
