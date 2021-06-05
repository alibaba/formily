import { connect, mapProps } from '@formily/vue'
import { getComponentByTag } from '../shared'

import type { Switch as ElSwitchProps } from 'element-ui'

export type SwitchProps = ElSwitchProps

const ElSwitch = getComponentByTag('el-switch')

export const Switch = connect(ElSwitch, mapProps({ readOnly: 'readonly' }))
