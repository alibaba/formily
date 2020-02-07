import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Radio } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(RadioGroup)
)
