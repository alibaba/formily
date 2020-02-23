import { connect } from '@formily/react-schema-renderer'
import { Range } from '@alifd/meet'
import { mapStyledProps } from '../shared'

export const Ranges = connect({
  defaultProps: {
    style: {
    }
  },
  getProps: mapStyledProps
})(Range)

