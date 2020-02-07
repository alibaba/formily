import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Range } from '@alifd/meet'
import { mapStyledProps } from '../shared'

registerFormField(
  'range',
  connect({
    defaultProps: {
      style: {
      }
    },
    getProps: mapStyledProps
  })(Range)
)
