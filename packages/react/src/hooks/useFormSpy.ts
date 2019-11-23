import {
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
  useReducer
} from 'react'
import { FormHeartSubscriber, LifeCycleTypes, IForm } from '@uform/core'
import { isStr, FormPath, isArr } from '@uform/shared'
import { IFormSpyProps, ISpyHook } from '../types'
import FormContext, { BroadcastContext } from '../context'

export const useFormSpy = (props: IFormSpyProps): ISpyHook => {
  const broadcast = useContext(BroadcastContext)
  const form = useContext(FormContext)
  const initializedRef = useRef(false)
  const subscriberId = useRef<number>()
  const [type, setType] = useState<string>(LifeCycleTypes.ON_FORM_INIT)
  const [state, dispatch] = useReducer(
    (state, action) => props.reducer(state, action, form),
    {}
  )
  const subscriber = useCallback<FormHeartSubscriber>(({ type, payload }) => {
    if (initializedRef.current) return
    setTimeout(() => {
      if (isStr(props.selector) && FormPath.parse(props.selector).match(type)) {
        setType(type)
        dispatch({
          type,
          payload
        })
      } else if (isArr(props.selector) && props.selector.indexOf(type) > -1) {
        setType(type)
        dispatch({
          type,
          payload
        })
      }
    })
  }, [])
  useMemo(() => {
    initializedRef.current = true
    if (form) {
      subscriberId.current = form.subscribe(subscriber)
    } else if (broadcast) {
      subscriberId.current = broadcast.subscribe(subscriber)
    }
    initializedRef.current = false
  }, [])
  useEffect(() => {
    return () => {
      if (form) {
        form.unsubscribe(subscriberId.current)
      } else if (broadcast) {
        broadcast.unsubscribe(subscriberId.current)
      }
    }
  }, [])
  const formApi: IForm = form ? form : broadcast && broadcast.getContext()
  return {
    form: formApi,
    type,
    state
  }
}
