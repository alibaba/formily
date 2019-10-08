import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Checkbox } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: CheckboxGroup } = Checkbox

registerFormField(
  'checkbox',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(CheckboxGroup)
)
