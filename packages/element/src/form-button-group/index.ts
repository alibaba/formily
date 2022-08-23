import { h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { FormBaseItem } from '../form-item'
import { Space, SpaceProps } from '../space'
import { stylePrefix } from '../__builtins__/configs'

export type FormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: 'left' | 'right' | 'center'
  gutter?: number
  className?: string
  alignFormItem: boolean
}

export const FormButtonGroup = defineComponent<FormButtonGroupProps>({
  name: 'FFormButtonGroup',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    gutter: {
      type: Number,
      default: 8,
    },
    alignFormItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = `${stylePrefix}-form-button-group`
    return () => {
      if (props.alignFormItem) {
        return h(
          FormBaseItem,
          {
            style: {
              margin: 0,
              padding: 0,
              width: '100%',
            },
            attrs: {
              colon: false,
              label: ' ',
              ...attrs,
            },
          },
          {
            default: () => h(Space, { props: { size: props.gutter } }, slots),
          }
        )
      } else {
        return h(
          Space,
          {
            class: [prefixCls],
            style: {
              justifyContent:
                props.align === 'left'
                  ? 'flex-start'
                  : props.align === 'right'
                  ? 'flex-end'
                  : 'center',
              display: 'flex',
            },
            props: {
              ...attrs,
              size: props.gutter,
            },
            attrs,
          },
          slots
        )
      }
    }
  },
})

export default FormButtonGroup
