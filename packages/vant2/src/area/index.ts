import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import { Popup as VanPopup } from 'vant'
import { Area as VanArea } from 'vant'
import { PreviewText } from '../preview-text'
import FormItem from '../form-item'

const BaseArea = observer(
  defineComponent({
    name: 'FArea',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        popupProps = {},
        areaProps = {},
        fieldListeners = {},
        popupListeners = {},
        areaListeners = {},
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
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Area)
)

export default Area
