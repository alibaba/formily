import { connect } from '@formily/react-schema-renderer'
import { Select as NextSelect } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

export const Select = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextSelect)

export default Select
