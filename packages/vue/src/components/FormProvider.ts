import { defineObservableComponent } from '../shared/define-observable-component'
import { provide } from 'vue-demi'
import { FormSymbol } from '../shared/context'
import { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'
import h from '../shared/compatible-create-element'
import { Fragment } from '../shared/fragment-hack'

export default defineObservableComponent({
  name: 'FormProvider',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  provide () {
    return { [FormSymbol as symbol]: this.form }
  },
  setup(props: IProviderProps, { attrs, slots }) {
    useAttach(props.form)
    provide(FormSymbol, props.form)

    return () => h(
      Fragment,
      { attrs },
      slots
    )
  }
})
