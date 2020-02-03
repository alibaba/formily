import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Rating } from '@alifd/next'
import { mapStyledProps } from '../shared'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rating)
)
