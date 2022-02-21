import { observer } from '@formily/reactive-vue'
import { connect, h } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import type { Field as VanFormItemProps } from 'vant'
import { Field as VanFormItem } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { inputValidate } from '../input'

export type FormItemProps = VanFormItemProps

export const BaseFormItem = observer(
  defineComponent({
    name: 'FBaseFormItem',
    setup(props, { attrs, slots, listeners }) {
      return () => {
        return h(
          VanFormItem,
          {
            class: { [`${stylePrefix}-input-asterisk`]: attrs.asterisk },
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

export const FormItem = connect(BaseFormItem, inputValidate)

export default FormItem
