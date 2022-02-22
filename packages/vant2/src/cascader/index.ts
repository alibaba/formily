import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import type { Cascader as VanCascaderProps } from 'vant'
import { Cascader as VanCascader } from 'vant'
import { Popup as VanPopup } from 'vant'
import FormItem from '../form-item'
import { PreviewText } from '../preview-text'

export type CascaderProps = VanCascaderProps

const BaseCascader = observer(
  defineComponent({
    name: 'FBaseCascader',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        popupProps = {},
        cascaderProps = {},
        fieldListeners = {},
        popupListeners = {},
        cascaderListeners = {},
      } = attrs as any
      const { format } = formItemProps
      const show = ref(false)

      return () => {
        return h(
          'div',
          {},
          {
            default: () => [
              h(
                FormItem,
                {
                  attrs: {
                    value: format ? format(attrs.value) : attrs.value,
                    readonly: true,
                    clickable: true,
                    ...formItemProps,
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
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
