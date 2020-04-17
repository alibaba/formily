import { connect } from '@formily/react-schema-renderer'
import { Select as MeetSelect } from '@alifd/meet';
import { mapStyledProps, mapTextComponent } from '../shared'

export const Select =
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(MeetSelect)

