import { connect, mapReadPretty, mapProps } from '@formily/react'
import { CascaderSelect } from '@alifd/next'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  CascaderSelect,
  mapProps({
    extract: 'dataSource',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
