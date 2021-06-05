import { h } from '@formily/vue'
import { defineComponent } from 'vue-demi'
import { Space, SpaceProps } from './space'
import { BaseItem } from './form-item'
import { stylePrefix } from '../configs'

export type FormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: 'left' | 'right' | 'center'
  gutter?: number
  className?: string
  alignFormItem: boolean
}

export const FormButtonGroup = defineComponent<FormButtonGroupProps>({
  name: 'FormilyFormButtonGroup',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    gutter: Number,
    direction: String,
    alignFormItem: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = `${stylePrefix}-form-button-group`
    return () => {
      if (props.alignFormItem) {
        return h(
          BaseItem,
          {
            style: {
              margin: 0,
              padding: 0,
              width: '100%',
            },
            props: {
              colon: false,
              label: ' ',
            },
            attrs,
          },
          {
            default: () => h(Space, { props: { size: props.gutter } }, slots),
          }
        )
      } else {
        return h(
          Space,
          {
            class: {
              [prefixCls]: true,
              [`${props.className}`]: !!props.className,
            },
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
              ...props,
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
