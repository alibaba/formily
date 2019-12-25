import { useValueLinkageEffect } from '../shared/linkage'

export const useValueStateLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:state',
    resolve: ({ target, state }, { setFieldState }) => {
      setFieldState(target, innerState => {
        Object.assign(innerState, state)
      })
    },
    reject: ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        Object.assign(innerState, otherwise)
      })
    },
    scope
  })
