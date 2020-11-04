import { inject, onBeforeUnmount } from '@vue/composition-api'
import { IFieldState, isField } from '@formily/core'
import { FieldSymbol } from '../constants'
import { IField, IVirtualField } from '@formily/core'
import { useValueSynchronizer } from '../utils/useValueSynchronizer'

type KeysInHook = {
  [key: string]: string
}

export const useFieldState = <T extends {}>(
  defaultState: T
): [IFieldState, (nextState: T) => void, (keyMap: KeysInHook) => void] => {
  const field = inject<IField | IVirtualField>(FieldSymbol)
  field.setState(state => {
    Object.assign(state, defaultState)
  })
  const valueMap = {
    state: isField(field) ? field.getState() : field.getState()
  }
  const subscriberId = field.subscribe(() => {
    valueMap.state = isField(field) ? field.getState() : field.getState()
  })

  const syncValueBeforeUpdate = useValueSynchronizer(valueMap)

  onBeforeUnmount(() => {
    field.unsubscribe(subscriberId)
  })
  return [
    valueMap.state,
    (nextState?: {}) => {
      if (!nextState) return
      field.setState(state => {
        Object.assign(state, nextState)
      })
    },
    syncValueBeforeUpdate
  ]
}
