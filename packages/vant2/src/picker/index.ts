import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import type { Picker as VanPickerProps } from 'vant'
import { Picker as VanPicker } from 'vant'
import { Popup as VanPopup } from 'vant'
import FormItem from '../form-item'
import { PreviewText } from '../preview-text'

export type PickerProps = VanPickerProps

const BasePicker = observer(
  defineComponent({
    name: 'FBasePicker',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        popupProps = {},
        pickerProps = {},
        fieldListeners = {},
        popupListeners = {},
        pickerListeners = {},
      } = attrs as any
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
                    value: attrs.value,
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
                      VanPicker,
                      {
                        attrs: {
                          showToolbar: true,
                          ...pickerProps,
                        },
                        on: {
                          cancel: () => {
                            show.value = false
                          },
                          confirm: (val) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...pickerListeners,
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

export const Picker = connect(
  BasePicker,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Picker)
)

export default Picker
