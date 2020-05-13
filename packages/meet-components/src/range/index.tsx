import { connect } from '@formily/react-schema-renderer'
import { Range as MeetRange } from '@alifd/meet'
import { mapStyledProps } from '../shared'

export const Range = connect({
  getProps: mapStyledProps
})(MeetRange)

