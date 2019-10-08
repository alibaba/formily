import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Range } from '@alifd/next'
import { mapStyledProps } from '../shared'

registerFormField(
  'range',
  connect({
    defaultProps: {
      style: {
        width: 320
      }
    },
    getProps: mapStyledProps
  })(Range)
)
