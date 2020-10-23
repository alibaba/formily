import { inject, watchEffect } from '@vue/composition-api'
import { isStateModel, IForm } from '@formily/core'
import { FormSymbol } from '../constants'
import { useEva } from '../utils/eva'
import { IFormEffect, IFormActions } from '../types'
import { createFormEffects } from '../shared'

export function useFormEffects(effects: IFormEffect<any, IFormActions>) {
  const form = inject<IForm>(FormSymbol)
  const { dispatch } = useEva({
    effects: createFormEffects(effects, form)
  })
  const subscribeId = form.subscribe(({ type, payload }) => {
    dispatch.lazy(type, () => {
      return isStateModel(payload) ? payload.getState() : payload
    })
  })
  watchEffect(onInvalidate => {
    onInvalidate(() => {
      form.unsubscribe(subscribeId)
    })
  })
}
