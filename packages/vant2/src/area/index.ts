import { transformComponent } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'
import type { Area as VanAreaProps } from 'vant'
import { Area as VanArea } from 'vant'
import { BaseField } from '../field'
import { Popup as VanPopup } from 'vant'

export type AreaProps = VanAreaProps

const BaseArea = observer(
  defineComponent({
    name: 'FArea',
    setup(props, { attrs, emit, slots, listeners }) {
      const {
        fieldProps = {},
        popupProps = {},
        areaProps = {},
        fieldListeners = {},
        popupListeners = {},
        areaListeners = {},
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
                BaseField,
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
                      VanArea,
                      {
                        attrs: {
                          ...areaProps,
                        },
                        on: {
                          cancel: () => {
                            show.value = false
                          },
                          confirm: (val) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...areaListeners,
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

export const Area = connect(
  BaseArea,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)

export default Area
