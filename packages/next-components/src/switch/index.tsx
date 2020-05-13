import { connect } from '@formily/react-schema-renderer'
import { acceptEnum, mapStyledProps } from '../shared'
import { Switch as NextSwitch } from '@alifd/next'

export const Switch = connect({
  valueName: 'checked',
  getProps: mapStyledProps
})(acceptEnum(NextSwitch))

export default Switch
