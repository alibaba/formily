import {
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
  useReducer
} from 'react'
import { FormHeartSubscriber, LifeCycleTypes, IForm } from '@formily/core'
import { isStr, FormPath, isArr, isFn } from '@formily/shared'
import { IFormSpyProps, ISpyHook } from '../types'
import FormContext, { BroadcastContext } from '../context'

export const useFormSpy = (props: IFormSpyProps): ISpyHook => {
  const broadcast = useContext(BroadcastContext)
  const form = useContext(FormContext)
  const initializedRef = useRef(false)
  const unmountRef = useRef(false)
  const timerRef = useRef({})
  const subscriberId = useRef<number>()
  const [type, setType] = useState<string>(LifeCycleTypes.ON_FORM_INIT)
  const [state, dispatch] = useReducer(
    (state, action) => props.reducer(state, action, form),
    props.initialState || {}
  )
  const subscriber = useCallback<FormHeartSubscriber>(({ type, payload }) => {
    if (initializedRef.current) return
    const key =  `${type}_${payload?.state?.name}`
    clearTimeout(timerRef.current[key])
    timerRef.current[key] = setTimeout(() => {
      if (unmountRef.current) return
      payload = payload && isFn(payload.getState) ? payload.getState() : payload
      if (isStr(props.selector) && FormPath.parse(props.selector).match(type)) {
        setType(type)
        dispatch({
          type,
          payload
        })
      } else if (isArr(props.selector)) {
        if (
          !!(props.selector as any[]).find(str => {
            if (isStr(str)) {
              return str === type
            } else if (isArr(str)) {
              if (str.length < 2) {
                return str[0] === type
              } else {
                return (
                  str[0] === type &&
                  FormPath.parse(str[1]).matchAliasGroup(
                    payload.name,
                    payload.path
                  )
                )
              }
            }
          })
        ) {
          setType(type)
          dispatch({
            type,
            payload
          })
        }
      }
    })
  }, [])
  useMemo(() => {
    initializedRef.current = true
    if (broadcast) {
      subscriberId.current = broadcast.subscribe(subscriber)
    } else if (form) {
      subscriberId.current = form.subscribe(subscriber)
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
      unmountRef.current = true
    }
  }, [])
  const formApi: IForm = broadcast ? broadcast && broadcast.getContext() : form
  return {
    form: formApi,
    type,
    state
  }
}
