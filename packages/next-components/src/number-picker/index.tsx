import { connect } from '@formily/react-schema-renderer'
import { NumberPicker as NextNumberPicker } from '@alifd/next'
import { acceptEnum, mapStyledProps, mapTextComponent } from '../shared'

export const NumberPicker = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(acceptEnum(NextNumberPicker))

export default NumberPicker
