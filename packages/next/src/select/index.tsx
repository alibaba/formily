import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as NextSelect } from '@alifd/next'
import { PreviewText } from '../preview-text'

export const Select = connect(
  NextSelect,
  mapProps({
    extract: 'dataSource',
  }),
  mapReadPretty(PreviewText.Select)
)

export default Select
