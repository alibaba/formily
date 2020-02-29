import { connect } from '@formily/react-schema-renderer'
import { NumberPicker as MeetNumberPicker } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

export const NumberPicker = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(MeetNumberPicker)

