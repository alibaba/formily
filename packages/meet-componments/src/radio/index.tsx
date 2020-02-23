import { connect } from '@formily/react-schema-renderer'
import { Radio } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: RadioGroup } = Radio

export const RadioGroups = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(RadioGroup)
