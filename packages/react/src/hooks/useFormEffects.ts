import { useContext, useEffect, useMemo } from 'react'
import { isStateModel } from '@formily/core'
import FormContext from '../context'
import { useEva } from 'react-eva'
import { IFormEffect, IFormActions } from '../types'
import { createFormEffects } from '../shared'

export function useFormEffects(effects: IFormEffect<any, IFormActions>) {
  const form = useContext(FormContext)
  const { dispatch } = useEva({
    effects: createFormEffects(effects, form)
  })
  const subscribeId = useMemo(
    () =>
      form.subscribe(({ type, payload }) => {
        dispatch.lazy(type, () => {
          return isStateModel(payload) ? payload.getState() : payload
        })
      }),
    []
  )
  useEffect(() => {
    return () => {
      form.unsubscribe(subscribeId)
    }
  }, [])
}
