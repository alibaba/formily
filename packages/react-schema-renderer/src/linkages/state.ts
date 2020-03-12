import { useValueLinkageEffect } from '../shared/linkage'
import { merge } from '@formily/shared'
export const useValueStateLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:state',
    resolve: ({ target, complie }, { setFieldState }) => {
      setFieldState(target, innerState => {
        merge(
          innerState,
          complie('state', {
            $target: innerState
          }),
          {
            assign: true
          }
        )
      })
    },
    reject: ({ target, otherwise, complie }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        merge(
          innerState,
          complie('otherwise', {
            $target: innerState
          }),
          {
            assign: true
          }
        )
      })
    },
    scope
  })
