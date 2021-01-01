import { connect, mapReadPretty, mapProps } from '@formily/react'
import { TreeSelect as NextTreeSelect } from '@alifd/next'
import { PreviewText } from '../preview-text'

export const TreeSelect = connect(
  NextTreeSelect,
  mapProps({
    extract: 'dataSource',
  }),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
