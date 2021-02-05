import { defineObservableComponent } from '../utils/define-observable-component'
import { provide } from 'vue-demi'
import { FormSymbol } from '../shared/context'
import { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'
import h from '../utils/compatible-create-element'

export default defineObservableComponent({
  name: 'FormProvider',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  setup(props: IProviderProps, { attrs, slots }) {
    useAttach(props.form)
    provide(FormSymbol, props.form)

    return () => h(
      'div',
      { attrs },
      slots
    )
  }
})