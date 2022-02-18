import { transformComponent } from '../__builtins__/shared'
import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import { PreviewText } from '../preview-text'
import type { Calendar as VanCalendarProps } from 'vant'
import { Calendar as VanCalendar } from 'vant'
import { Field as VanField } from 'vant'
import { Popup as VanPopup } from 'vant'

export type CalendarProps = VanCalendarProps

const BaseCalendar = observer(
  defineComponent({
    name: 'FCalendar',
    setup(props, { attrs, emit, slots, listeners }) {
      const {
        fieldProps = {},
        popupProps = {},
        calendarProps = {},
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
                  },
                },
                slots
              ),
              h(
                VanCalendar,
                {
                  attrs: {
                    value: show.value,
                    ...calendarProps,
                  },
                  on: {
                    input: (val) => {
                      show.value = val
                    },
                    confirm: (val) => {
                      emit('change', val)
                      show.value = false
                    },
                  },
                },
                {}
              ),
            ],
          }
        )
      }
    },
  })
)

export const Calendar = connect(
  BaseCalendar,
  mapProps({ readOnly: 'readonly' })
  // mapReadPretty(PreviewText.Uploader)
)

export default Calendar
