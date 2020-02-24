import { connect } from '@formily/react-schema-renderer'
import { Transfer as NextTransfer } from '@alifd/next'
import { mapStyledProps } from '../shared'

export const Transfer = connect({
  getProps: mapStyledProps
})(NextTransfer)

export default Transfer