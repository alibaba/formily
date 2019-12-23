import { useValueLinkageEffect } from '../shared/linkage'

export const useValueSchemaLinkageEffect = (scope?: any) =>
  useValueLinkageEffect({
    type: 'value:schema',
    resolve: ({ target, schema }, { setFieldState }) => {
      setFieldState(target, innerState => {
        Object.assign(innerState.props, schema)
      })
    },
    reject: ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        Object.assign(innerState.props, otherwise)
      })
    },
    scope
  })
