import { connect } from '@formily/react-schema-renderer'
import { Range as NextRange } from '@alifd/next'
import { mapStyledProps } from '../shared'

export const Range = connect({
  defaultProps: {
    style: {
      width: 320
    }
  },
  getProps: mapStyledProps
})(NextRange)

export default Range