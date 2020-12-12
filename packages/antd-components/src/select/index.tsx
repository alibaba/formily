import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { PreviewText } from '../preview-text'

export const Select = connect(
  AntdSelect,
  mapProps(
    {
      extract: 'dataSource',
      to: 'options'
    },
    {
      extract: 'loading'
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
