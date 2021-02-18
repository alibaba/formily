import { connect, mapReadPretty, mapProps } from '@formily/react'
import { TreeSelect as AntdTreeSelect } from 'antd'
import { PreviewText } from '../preview-text'

export const TreeSelect = connect(
  AntdTreeSelect,
  mapProps({
    dataSource: 'treeData',
  }),
  mapReadPretty(PreviewText.TreeSelect)
)

export default TreeSelect
