import { connect } from '@formily/react-schema-renderer'
import { Checkbox as MeetCheckbox } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: MeetCheckboxGroup } = MeetCheckbox

export const CheckboxGroup = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(MeetCheckboxGroup)

