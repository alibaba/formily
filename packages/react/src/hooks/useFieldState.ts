import { useContext, useMemo, useRef } from 'react'
import { IFieldState } from '@uform/core'
import { FieldContext } from '../context'

export const useFieldState = <T extends {}>(defaultState: T) => {
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
