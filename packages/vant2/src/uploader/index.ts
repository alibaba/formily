import { transformComponent } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'
import type { Uploader as VanUploaderProps } from 'vant'
import { Uploader as VanUploader } from 'vant'

export type UploaderProps = VanUploaderProps

const TransformVanUploader = transformComponent<UploaderProps>(VanUploader, {
  change: 'input',
})

const BaseUploader = observer(
  defineComponent({
    name: 'FField',
    setup(props, { attrs, slots, listeners }) {
      return () => {
        return h(
          TransformVanUploader,
          {
            attrs: {
              ...attrs,
              fileList: attrs.value,
            },
            on: listeners,
          },
          slots
        )
      }
    },
  })
)

export const Uploader = connect(
  BaseUploader,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)
export default Uploader
