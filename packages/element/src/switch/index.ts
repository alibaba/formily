import { connect, mapProps } from '@formily/vue'

import type { Switch as ElSwitchProps } from 'element-ui'
import { Switch as ElSwitch } from 'element-ui'

export type SwitchProps = ElSwitchProps

export const Switch = connect(ElSwitch, mapProps({ readOnly: 'readonly' }))

export default Switch
