import { connect } from '@formily/react-schema-renderer'
import { Checkbox } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: CheckboxGroup } = Checkbox

export const Checkboxs = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(CheckboxGroup)

