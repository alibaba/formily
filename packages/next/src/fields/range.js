import { connect, registerFormField } from '@uform/react'
import { Range } from '@alifd/next'
import { mapStyledProps } from '../utils'

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
