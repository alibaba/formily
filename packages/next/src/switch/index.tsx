import { Switch as NextSwitch } from '@alifd/next'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  NextSwitch,
  mapProps({
    value: 'checked',
  })
)

export default Switch
