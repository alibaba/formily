import { connect } from '@formily/react-schema-renderer'
import { mapStyledProps } from '../shared'
import { Switch } from '@alifd/meet';


export const Switchs = connect({
  valueName: 'checked',
  getProps: mapStyledProps
})(Switch)

