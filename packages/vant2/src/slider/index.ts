import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import type { Slider as VanSliderProps } from 'vant'
import { Slider as VanSlider } from 'vant'
import { PreviewText } from '../preview-text'

export type SliderProps = VanSliderProps

const TransformVanSlider = transformComponent<SliderProps>(VanSlider, {
  change: 'input',
})

export const Slider = connect(
  TransformVanSlider,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Slider)
)
export default Slider
