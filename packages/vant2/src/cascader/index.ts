import { transformComponent } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'
import type { Cascader as VanCascaderProps } from 'vant'
import { Cascader as VanCascader } from 'vant'
import { Field as VanField } from 'vant'
import { Popup as VanPopup } from 'vant'

export type CascaderProps = VanCascaderProps

const BaseCascader = observer(
  defineComponent({
    name: 'FCascader',
    setup(props, { attrs, emit, slots, listeners }) {
      const {
        fieldProps = {},
        popupProps = {},
        cascaderProps = {},
        fieldListeners = {},
        popupListeners = {},
        cascaderListeners = {},
      } = attrs as any
      const { format } = fieldProps
      const show = ref(false)

      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                VanField,
                {
                  attrs: {
                    value: format ? format(attrs.value) : attrs.value,
                    readonly: true,
                    clickable: true,
                    ...fieldProps,
                  },
                  on: {
                    click: () => {
                      show.value = true
                    },
                    ...fieldListeners,
                  },
                },
                slots
              ),
              h(
                VanPopup,
                {
                  attrs: {
                    value: show.value,
                    round: true,
                    position: 'bottom',
                    ...popupProps,
                  },
                  on: {
                    input: (val) => {
                      show.value = val
                    },
                    ...popupListeners,
                  },
                },
                {
                  default: () => [
                    h(
                      VanCascader,
                      {
                        attrs: {
                          ...cascaderProps,
                        },
                        on: {
                          close: () => {
                            show.value = false
                          },
                          finish: (val) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...cascaderListeners,
                        },
                      },
                      {}
                    ),
                  ],
                }
              ),
            ],
          }
        )
      }
    },
  })
)

export const Cascader = connect(
  BaseCascader,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)

export default Cascader