import { useContext, useMemo, useRef } from 'react'
import { IFieldState } from '@formily/core'
import { FieldContext } from '../context'

export const useFieldState = <T extends {}>(
  defaultState: T
): [IFieldState, (nextState: T) => void] => {
  const ref = useRef<IFieldState>()
  const field = useContext(FieldContext)
  useMemo(() => {
    field.setSourceState(state => {
      Object.assign(state, defaultState)
    })
  }, [])

  ref.current = field.getState()
  return [
    ref.current,
    (nextState?: {}) => {
      if (!nextState) return
      field.setState(state => {
        Object.assign(state, nextState)
      })
    }
  ]
}
