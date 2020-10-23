import { inject, ref, watchEffect } from '@vue/composition-api'
import { FormHeartSubscriber, LifeCycleTypes, IForm } from '@formily/core'
import { isStr, FormPath, isArr, isFn } from '@formily/shared'
import { IFormSpyProps, ISpyHook } from '../types'
import { FormSymbol, BroadcastSymbol } from '../constants'
import { Broadcast } from '../shared'
import { useState } from '../utils/useState'
import { useReducer } from '../utils/useReducer'

export const useFormSpy = (props: IFormSpyProps): ISpyHook => {
  const broadcast = inject<Broadcast>(BroadcastSymbol, null)
  const form = inject<IForm>(FormSymbol, null)
  const initializedRef = ref(false)
  const unmountRef = ref(false)
  const timerRef = ref({})
  const subscriberId = ref<number>()
  const [type, setType] = useState<string>(LifeCycleTypes.ON_FORM_INIT)
  const [state, dispatch] = useReducer(
    (state, action) => props.reducer(state, action, form),
    props.initialState || {}
  )
  const subscriber: FormHeartSubscriber = ({ type, payload }) => {
    if (initializedRef.value) return
    const key = `${type}_${payload?.state?.name}`
    clearTimeout(timerRef.value[key])
    timerRef.value[key] = setTimeout(() => {
      if (unmountRef.value) return
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
  }

  const init = () => {
    initializedRef.value = true
    if (broadcast) {
      subscriberId.value = broadcast.subscribe(subscriber)
    } else if (form) {
      subscriberId.value = form.subscribe(subscriber)
    }
    initializedRef.value = false
  }

  init()

  watchEffect(onInvalidate => {
    onInvalidate(() => {
      if (form) {
        form.unsubscribe(subscriberId.value)
      } else if (broadcast) {
        broadcast.unsubscribe(subscriberId.value)
      }
      unmountRef.value = true
    })
  })

  const formApi: IForm = broadcast ? broadcast && broadcast.getContext() : form

  return {
    form: formApi,
    type,
    state
  }
}
