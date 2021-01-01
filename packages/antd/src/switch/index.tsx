import { Switch as AntdSwitch } from 'antd'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  AntdSwitch,
  mapProps({
    extract: 'value',
    to: 'checked'
  })
)

export default Switch
