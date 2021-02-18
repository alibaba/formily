import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { PreviewText } from '../preview-text'

export const Select = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
