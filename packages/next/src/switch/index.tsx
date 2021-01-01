import { Switch as NextSwitch } from '@alifd/next'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  NextSwitch,
  mapProps({
    extract: 'value',
    to: 'checked',
  })
)

export default Switch
