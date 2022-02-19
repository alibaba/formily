import { transformComponent } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'
import type { DatetimePicker as VanDatetimePickerProps } from 'vant'
import { DatetimePicker as VanDatetimePicker } from 'vant'
import { Field as VanField } from 'vant'
import { Popup as VanPopup } from 'vant'

export type DatetimePickerProps = VanDatetimePickerProps

const BaseDatetimePicker = observer(
  defineComponent({
    name: 'FDatetimePicker',
    setup(props, { attrs, emit, slots, listeners }) {
      const {
        fieldProps = {},
        popupProps = {},
        datetimePickerProps = {},
        fieldListeners = {},
        popupListeners = {},
        datetimePickerListeners = {},
      } = attrs as any
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
                    value: attrs.value,
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
                      VanDatetimePicker,
                      {
                        attrs: {
                          showToolbar: true,
                          ...datetimePickerProps,
                        },
                        on: {
                          cancel: () => {
                            show.value = false
                          },
                          confirm: (val) => {
                            emit('change', val)
                            show.value = false
                          },
                          ...datetimePickerListeners,
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

export const DatetimePicker = connect(
  BaseDatetimePicker,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)

export default DatetimePicker
