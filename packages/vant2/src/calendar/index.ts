import { observer } from '@formily/reactive-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { ref, defineComponent } from '@vue/composition-api'
import type { Calendar as VanCalendarProps } from 'vant'
import { Calendar as VanCalendar } from 'vant'
import FormItem from '../form-item'
import { PreviewText } from '../preview-text'

export type CalendarProps = VanCalendarProps

const BaseCalendar = observer(
  defineComponent({
    name: 'FBaseCalendar',
    setup(props, { attrs, emit, slots }) {
      const {
        formItemProps = {},
        calendarProps = {},
        fieldListeners = {},
        calendarListeners = {},
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
                  ...calendarListeners,
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
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.Calendar)
)

export default Calendar
