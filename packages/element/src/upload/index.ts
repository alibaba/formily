import { Field } from '@formily/core'
import { defineComponent } from '@vue/composition-api'
import { connect, mapProps, h, useField, Fragment } from '@formily/vue'

import type {
  ElUpload as ElUploadProps,
  ElUploadInternalFileDetail,
} from 'element-ui/types/upload'

import { Upload as ElUpload, Button as ElButton } from 'element-ui'

export type UploadProps = ElUploadProps & {
  textContent?: String
  errorAdaptor?: (error?: ErrorEvent) => String
}

const UploadWrapper = defineComponent<UploadProps>({
  name: 'FUpload',
  props: {
    textContent: {
      type: String,
      default: '',
    },
    errorAdaptor: {
      type: Function,
      default(error?: ErrorEvent) {
        return error?.message || ''
      },
    },
  },
  setup(curProps: UploadProps, { slots, attrs, listeners, emit }) {
    return () => {
      const fieldRef = useField<Field>()
      const setFeedBack = (error?: ErrorEvent) => {
        const message = curProps.errorAdaptor(error)

        fieldRef.value.setFeedback({
          type: 'error',
          code: 'UploadError',
          messages: message ? [message] : [],
        })
      }

      const props = {
        ...attrs,
        onChange(
          file: ElUploadInternalFileDetail,
          fileList: ElUploadInternalFileDetail[]
        ) {
          ;(attrs.onChange as Function)?.(file, fileList)
          setFeedBack()
          emit('change', fileList)
        },

        onRemove(
          file: ElUploadInternalFileDetail,
          fileList: ElUploadInternalFileDetail[]
        ) {
          ;(attrs.onRemove as Function)?.(file, fileList)
          setFeedBack()
          emit('change', fileList)
        },

        onError(
          error: ErrorEvent,
          file: ElUploadInternalFileDetail,
          fileList: ElUploadInternalFileDetail[]
        ) {
          ;(attrs.onError as Function)?.(error, file, fileList)

          setTimeout(() => {
            setFeedBack(error)
          }, 0)
        },
      }
      const children = {
        ...slots,
      }
      if (!slots.default) {
        children.default = () => {
          const listType = attrs.listType
          const drag = attrs.drag

          if (drag) {
            return h(
              Fragment,
              {},
              {
                default: () => [
                  h('i', { staticClass: 'el-icon-upload' }, {}),
                  h(
                    'div',
                    { staticClass: 'el-upload__text' },
                    { default: () => [curProps.textContent] }
                  ),
                ],
              }
            )
          }

          if (listType === 'picture-card') {
            return h(
              'i',
              {
                staticClass: 'el-icon-plus',
              },
              {}
            )
          }

          return h(
            ElButton,
            { props: { icon: 'el-icon-upload2' } },
            { default: () => [curProps.textContent] }
          )
        }
      }
      return h(ElUpload, { attrs: props, on: listeners }, children)
    }
  },
})

export const Upload = connect(
  UploadWrapper,
  mapProps({ readOnly: 'readonly', value: 'fileList' })
)

export default Upload
