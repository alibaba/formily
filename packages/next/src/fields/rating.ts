import { connect, registerFormField } from '@uform/react-schema-form'
import { Rating } from '@alifd/next'
import { mapStyledProps } from '../utils'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rating)
)
