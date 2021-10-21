import {
  provide,
  inject,
  InjectionKey,
  defineComponent,
  Ref,
  ref,
  watch,
  computed,
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
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
}

export const FormLayoutDeepContext: InjectionKey<Ref<FormLayoutProps>> = Symbol(
  'FormLayoutDeepContext'
)

export const FormLayoutShallowContext: InjectionKey<Ref<FormLayoutProps>> =
  Symbol('FormLayoutShallowContext')

export const useFormDeepLayout = (): Ref<FormLayoutProps> =>
  inject(FormLayoutDeepContext, ref(null))

export const useFormShallowLayout = (): Ref<FormLayoutProps> =>
  inject(FormLayoutShallowContext, ref(null))

export const useFormLayout = (): Ref<FormLayoutProps> => {
  return ref({
    ...useFormDeepLayout().value,
    ...useFormShallowLayout().value,
  })
}

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
    spaceGap: {},
    gridColumnGap: {},
    gridRowGap: {},
  },
  setup(props, { slots }) {
    const deepLayout = useFormDeepLayout()
    const newDeepLayout = ref({
      ...deepLayout,
    })
    const shallowProps = computed(() => (props.shallow ? props : undefined))

    watch(
      [props, deepLayout],
      () => {
        if (!props.shallow) {
          Object.assign(newDeepLayout.value, props)
        } else {
          if (props.size) {
            newDeepLayout.value.size = props.size
          }
          if (props.colon) {
            newDeepLayout.value.colon = props.colon
          }
        }
      },
      { deep: true, immediate: true }
    )

    provide(FormLayoutDeepContext, newDeepLayout)
    provide(FormLayoutShallowContext, shallowProps)

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
