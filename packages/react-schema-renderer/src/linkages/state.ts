import { useValueLinkageEffect } from '../shared/linkage'
import { merge } from '@formily/shared'
export const useValueStateLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:state',
    resolve: ({ target, state }, { setFieldState }) => {
      setFieldState(target, innerState => {
        merge(innerState, state)
      })
    },
    reject: ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        merge(innerState, otherwise)
      })
    },
    scope
  })
