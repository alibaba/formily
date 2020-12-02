import { useValueLinkageEffect } from '../shared/linkage'

export const useValueVisibleLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:visible',
    resolve: ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.visible = true
      })
    },
    reject: ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.visible = false
      })
    },
    scope
  })
