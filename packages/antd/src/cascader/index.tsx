import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Cascader as AntdCascader } from 'antd'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
  AntdCascader,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
