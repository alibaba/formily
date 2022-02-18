import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Rate as VanRateProps } from 'vant'
import { Rate as VanRate } from 'vant'

export type RateProps = VanRateProps

const TransformVanRate = transformComponent<RateProps>(VanRate, {
  change: 'input',
})

export const Rate = connect(
  TransformVanRate,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Rate)
)
export default Rate
