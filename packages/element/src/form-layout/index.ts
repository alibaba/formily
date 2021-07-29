import {
  provide,
  inject,
  InjectionKey,
  defineComponent,
} from '@vue/composition-api'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'

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
  tooltipLayout?: 'icon' | 'text'
  bordered?: boolean
  inset?: boolean
}

export const FormLayoutDeepContext: InjectionKey<FormLayoutProps> = Symbol(
  'FormLayoutDeepContext'
)

export const FormLayoutShallowContext: InjectionKey<FormLayoutProps> = Symbol(
  'FormLayoutShallowContext'
)

export const useFormDeepLayout = () => inject(FormLayoutDeepContext, null)

export const useFormShallowLayout = () => inject(FormLayoutShallowContext, null)

export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
})

export const FormLayout = defineComponent<FormLayoutProps>({
  name: 'FFormLayout',
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
    tooltipLayout: {},
    bordered: { default: true },
    inset: { default: false },
  },
  setup(props, { slots, attrs }) {
    const deepLayout = useFormDeepLayout()

    const newDeepLayout = {
      ...deepLayout,
    }
    if (!props.shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
      if (props.colon) {
        newDeepLayout.colon = props.colon
      }
    }

    provide(FormLayoutDeepContext, newDeepLayout)
    provide(FormLayoutShallowContext, props.shallow ? props : undefined)

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
        },
        slots
      )
    }
  },
})

export default FormLayout
