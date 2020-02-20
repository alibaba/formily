import { useContext, useEffect, useMemo, useRef } from 'react'
import { LifeCycleTypes, IFormState } from '@formily/core'
import { useForceUpdate } from './useForceUpdate'
import FormContext from '../context'

export const useFormState = <T extends {}>(defaultState: T) => {
  const forceUpdate = useForceUpdate()
  const ref = useRef<{ state?: IFormState; subscribeId?: number }>({})
  const form = useContext(FormContext)
  ref.current.subscribeId = useMemo(() => {
    form.setFormState(state => {
      Object.assign(state, defaultState)
    })
    return form.subscribe(({ type }) => {
      if (type === LifeCycleTypes.ON_FORM_CHANGE) {
        forceUpdate()
      }
    })
  }, [])

  ref.current.state = form.getFormState()
  useEffect(() => {
    return () => {
      form.unsubscribe(ref.current.subscribeId)
    }
  }, [])
  return [
    ref.current.state,
    (nextState?: {}) => {
      if (!nextState) return
      form.setFormState(state => {
        Object.assign(state, nextState)
      })
    }
  ]
}
