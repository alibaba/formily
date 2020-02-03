import { connect, registerFormField } from '@formily/react-schema-renderer'
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
