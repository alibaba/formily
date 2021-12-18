import { provide, defineComponent, watch } from 'vue-demi'
import {
  FormSymbol,
  FieldSymbol,
  SchemaMarkupSymbol,
  SchemaSymbol,
  SchemaExpressionScopeSymbol,
  SchemaOptionsSymbol,
} from '../shared/context'
import { IProviderProps, DefineComponent } from '../types'
import { useAttach } from '../hooks/useAttach'
import { useInjectionCleaner } from '../hooks/useInjectionCleaner'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default defineComponent({
  name: 'FormProvider',
  inheritAttrs: false,
  props: ['form'],
  setup(props: IProviderProps, { attrs, slots }) {
    const getForm = () => props.form
    const [formRef, checker] = useAttach(getForm())
    watch(
      () => props.form,
      () => (formRef.value = checker(getForm()))
    )

    provide(FormSymbol, formRef)
    useInjectionCleaner([
      FieldSymbol,
      SchemaMarkupSymbol,
      SchemaSymbol,
      SchemaExpressionScopeSymbol,
      SchemaOptionsSymbol,
    ])

    return () => h(Fragment, { attrs }, slots)
  },
}) as DefineComponent<IProviderProps>
