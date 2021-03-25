import { observer } from '@formily/reactive-vue'
import { provide, defineComponent, toRaw } from 'vue-demi'
import { FormSymbol } from '../shared/context'
import { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'
import h from '../shared/h'
import { Fragment } from '../shared/fragment'

export default observer(defineComponent<IProviderProps>({
  name: 'FormProvider',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  setup(props, { attrs, slots }) {
    const formRef = useAttach(() => toRaw(props.form), () => props.form)
    provide(FormSymbol, formRef)

    return () => h(
      Fragment,
      { attrs },
      slots
    )
  }
}))
