import { provide, inject, InjectionKey, defineComponent } from 'vue-demi'
import { h } from '@formily/vue'
import { stylePrefix } from '../configs'

export type FormLayoutProps = {
  className?: string
  colon?: boolean
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number
  wrapperCol?: number
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal' | 'inline'
  direction?: 'rtl' | 'ltr'
  shallow?: boolean
  feedbackLayout?: 'loose' | 'terse' | 'popover'
}

export const FormLayoutContext: InjectionKey<FormLayoutProps> =
  Symbol('FormLayoutContext')

export const FormLayoutShallowContext: InjectionKey<FormLayoutProps> = Symbol(
  'FormLayoutShallowContext'
)

export const useFormLayout = () => inject(FormLayoutContext, null)

export const useFormShallowLayout = () => inject(FormLayoutShallowContext, null)

export const FormLayout = defineComponent<FormLayoutProps>({
  name: 'FormilyFormLayout',
  props: {
    className: {},
    colon: { default: true },
    labelAlign: {},
    wrapperAlign: {},
    labelWrap: { default: false },
    labelWidth: {},
    wrapperWidth: {},
    wrapperWrap: { default: false },
    labelCol: {},
    wrapperCol: {},
    fullness: { default: false },
    size: { default: 'default' },
    layout: { default: 'horizontal' },
    direction: { default: 'ltr' },
    shallow: { default: true },
    feedbackLayout: {},
  },
  setup(props, { slots, attrs }) {
    if (props.shallow) {
      provide(FormLayoutShallowContext, props)
    } else {
      provide(FormLayoutContext, props)
    }
    const formPrefixCls = `${stylePrefix}-form`
    return () => {
      const classNames = {
        [`${formPrefixCls}-${props.layout}`]: true,
        [`${formPrefixCls}-rtl`]: props.direction === 'rtl',
        [`${formPrefixCls}-${props.size}`]: props.size !== undefined,
        [`${props.className}`]: props.className !== undefined,
      }
      return h(
        'div',
        {
          class: classNames,
          style: attrs.style as string | undefined,
        },
        slots
      )
    }
  },
})
