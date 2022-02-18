import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Stepper as VanStepperProps } from 'vant'
import { Stepper as VanStepper } from 'vant'

export type StepperProps = VanStepperProps

const TransformVanStepper = transformComponent<StepperProps>(VanStepper, {
  change: 'input',
})

export const Stepper = connect(
  TransformVanStepper,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Stepper)
)
export default Stepper
