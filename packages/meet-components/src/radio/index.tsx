import { connect } from '@formily/react-schema-renderer'
import { Radio as MeetRadio } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const { Group: MeetRadioGroup } = MeetRadio

export const RadioGroup = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(MeetRadioGroup)
