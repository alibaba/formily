import { connect } from '@formily/react-schema-renderer'
import { NumberPicker } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

export const NumberPickers = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NumberPicker)

