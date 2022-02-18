import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Switch as VanSwitchProps } from 'vant'
import { Switch as VanSwitch } from 'vant'

export type SwitchProps = VanSwitchProps

const TransformVanSwitch = transformComponent<SwitchProps>(VanSwitch, {
  change: 'input',
})

export const Switch = connect(
  TransformVanSwitch,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Switch)
)
export default Switch
