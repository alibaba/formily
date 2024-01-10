import { connect, mapReadPretty, mapProps } from '@formily/react'
import { TreeSelect as NextTreeSelect } from '@alifd/next'
import { PreviewText } from '../preview-text'
import { mapSize, mapStatus } from '../__builtins__'

export const TreeSelect = connect(
  NextTreeSelect,
  mapProps(
    {
      dataSource: true,
    },
    mapSize,
    mapStatus
  ),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
