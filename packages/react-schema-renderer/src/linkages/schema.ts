import { useValueLinkageEffect } from '../shared/linkage'
import { merge } from '@formily/shared'
export const useValueSchemaLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:schema',
    resolve: ({ target, complie }, { setFieldState }) => {
      setFieldState(target, innerState => {
        merge(
          innerState.props,
          complie('schema', {
            $target: innerState
          }),
          {
            assign: true,
            arrayMerge:(target,source)=>source
          }
        )
      })
    },
    reject: ({ target, otherwise, complie }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        merge(
          innerState.props,
          complie('otherwise', {
            $target: innerState
          }),
          {
            assign: true,
            arrayMerge:(target,source)=>source
          }
        )
      })
    },
    scope
  })
