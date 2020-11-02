import {
  inject,
  onBeforeUnmount,
  onBeforeUpdate,
  getCurrentInstance
} from '@vue/composition-api'
import { LifeCycleTypes, IForm } from '@formily/core'
import { useForceUpdate } from './useForceUpdate'
import { FormSymbol } from '../constants'
import { set, get } from 'lodash'

type KeysInHook = {
  [key: string]: string
}

export const useFormState = <T extends {}>(defaultState: T) => {
  const forceUpdate = useForceUpdate()
  const form = inject<IForm>(FormSymbol)
  form.setFormState(state => {
    Object.assign(state, defaultState)
  })

  const valueMap = {
    state: form.getFormState()
  }

  const subscribeId = form.subscribe(({ type }) => {
    valueMap.state = form.getFormState()
    if (type === LifeCycleTypes.ON_FORM_CHANGE) {
      forceUpdate()
    }
  })

  const syncValueBeforeUpdate = (keyMap: KeysInHook = {}) => {
    const keys = Object.keys(keyMap)
    const $vm = getCurrentInstance()
    onBeforeUpdate(() => {
      keys.forEach(key => {
        set($vm, keyMap[key], get(valueMap, key))
      })
    })
  }

  onBeforeUnmount(() => {
    form.unsubscribe(subscribeId)
  })

  return [
    valueMap.state,
    (nextState?: {}) => {
      if (!nextState) return
      form.setFormState(state => {
        Object.assign(state, nextState)
      })
    },
    syncValueBeforeUpdate
  ]
}
