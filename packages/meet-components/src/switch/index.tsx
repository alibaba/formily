import { connect } from '@formily/react-schema-renderer'
import { mapStyledProps } from '../shared'
import { Switch as MeetSwitch } from '@alifd/meet';


export const Switch = connect({
  valueName: 'checked',
  getProps: mapStyledProps
})(MeetSwitch)

