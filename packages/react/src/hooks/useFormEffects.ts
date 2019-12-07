import { useContext, useEffect } from 'react'
import { isStateModel } from '@uform/core'
import FormContext from '../context'
import { useEva } from 'react-eva'
import { IFormEffect } from '../types'
import { createFormEffects } from '../shared'


export function useFormEffects(effects: IFormEffect) {
  const form = useContext(FormContext)
  const { dispatch } = useEva({
    effects: createFormEffects(effects, form)
  })
  useEffect(() => {
    const subscribeId = form.subscribe(({ type, payload }) => {
      dispatch.lazy(type, () => {
        return isStateModel(payload) ? payload.getState() : payload
      })
    })
    return () => {
      form.unsubscribe(subscribeId)
    }
  }, [])
}