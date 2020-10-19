import { inject, ref } from '@vue/composition-api'
import { IFieldState, isField } from '@formily/core'
import { FieldSymbol } from '../constants'
import { IField, IVirtualField } from '@formily/core'

export const useFieldState = <T extends {}>(
  defaultState: T
): [IFieldState, (nextState: T) => void] => {
  const field = inject<IField | IVirtualField>(FieldSymbol)
  field.setState(state => {
    Object.assign(state, defaultState)
  })
  const state = isField(field) ? field.getState() : field.getState()
  const stateRef = ref<IFieldState>(state)
  return [
    stateRef.value,
    (nextState?: {}) => {
      if (!nextState) return
      field.setState(state => {
        Object.assign(state, nextState)
      })
    }
  ]
}
