import { Switch as AntdSwitch } from 'antd'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '@formily/react-shared-components'

export const Switch = connect(
  AntdSwitch,
  mapProps({
    extract: 'value',
    to: 'checked'
  }),
  mapReadPretty(PreviewText)
)

export default Switch
