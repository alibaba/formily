import { connect, registerFormField } from '@uform/react-schema-form'
import { Checkbox } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../utils'

const { Group: CheckboxGroup } = Checkbox

registerFormField(
  'checkbox',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(CheckboxGroup)
)
