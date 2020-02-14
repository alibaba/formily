import { connect } from '@formily/react-schema-renderer'
import { Rating as NextRating } from '@alifd/next'
import { mapStyledProps } from '../shared'

export const Rating = connect({
  getProps: mapStyledProps
})(NextRating)

export default Rating