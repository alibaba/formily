import { useValueLinkageEffect } from '../shared/linkage'
import { merge } from '@formily/shared'
export const useValueSchemaLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:schema',
    resolve: ({ target, schema }, { setFieldState }) => {
      setFieldState(target, innerState => {
        merge(innerState.props, schema)
      })
    },
    reject: ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        merge(innerState.props, otherwise)
      })
    },
    scope
  })
