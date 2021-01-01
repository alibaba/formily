import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Cascader as NextCascader } from '@alifd/next'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  NextCascader,
  mapProps({
    extract: 'dataSource',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
