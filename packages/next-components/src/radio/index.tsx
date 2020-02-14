import { connect } from '@formily/react-schema-renderer'
import { Radio as NextRadio } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

export const Radio = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextRadio)

Radio.Group = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextRadio.Group)

export default Radio
