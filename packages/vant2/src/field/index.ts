import { observer } from '@formily/reactive-vue'
import { h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import type { Field as VanFieldProps } from 'vant'
import { Field as VanField } from 'vant'

export type FieldProps = VanFieldProps

export const Field = observer(
  defineComponent({
    name: 'FField',
    setup(props, { attrs, slots, listeners }) {
      return () => {
        return h(
          VanField,
          {
            attrs,
            on: listeners,
          },
          {
            input: () => slots.default?.(),
          }
        )
      }
    },
  })
)

export default Field
