import { connect } from '@formily/react-schema-renderer'
import { Checkbox as NextCheckbox } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

export const Checkbox = connect<'Group'>({
  valueName: 'checked',
  getProps: mapStyledProps
})(NextCheckbox)

Checkbox.Group = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextCheckbox.Group)

export default Checkbox
