import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { Uploader as VanUploaderProps } from 'vant'
import { Uploader as VanUploader } from 'vant'

export type UploaderProps = VanUploaderProps

const TransformVanUploader = transformComponent<UploaderProps>(VanUploader, {
  change: 'input',
})

export const Uploader = connect(
  TransformVanUploader,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)
export default Uploader
