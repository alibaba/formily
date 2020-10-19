import { inject, ref, watchEffect, computed } from '@vue/composition-api'
import { LifeCycleTypes, IFormState, IForm } from '@formily/core'
// import { useForceUpdate } from './useForceUpdate'
import { FormSymbol } from '../constants'

export const useFormState = <T extends {}>(defaultState: T) => {
  // const forceUpdate = useForceUpdate()
  const stateRef = ref<{ state?: IFormState; subscribeId?: number }>({})
  const form = inject<IForm>(FormSymbol)
  stateRef.value.subscribeId = computed(() => {
    form.setFormState(state => {
      Object.assign(state, defaultState)
    })
    return form.subscribe(({ type }) => {
      if (type === LifeCycleTypes.ON_FORM_CHANGE) {
        // forceUpdate()
      }
    })
  }).value

  stateRef.value.state = form.getFormState()
  watchEffect(() => {
    return () => {
      form.unsubscribe(stateRef.value.subscribeId)
    }
  })
  return [
    stateRef.value.state,
    (nextState?: {}) => {
      if (!nextState) return
      form.setFormState(state => {
        Object.assign(state, nextState)
      })
    }
  ]
}
