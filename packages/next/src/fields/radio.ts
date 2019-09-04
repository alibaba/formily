import { connect, registerFormField } from '@uform/react-schema-form'
import { Radio } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../utils'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(RadioGroup)
)
