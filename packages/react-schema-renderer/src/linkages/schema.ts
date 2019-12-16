import { registerLinkage } from '../shared/registry'
import { presetLinkage } from '../shared/linkage'

registerLinkage(
  'value:schema',
  presetLinkage(
    ({ target, schema }, { setFieldState }) => {
      setFieldState(target, innerState => {
        Object.assign(innerState.props, schema)
      })
    },
    ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        Object.assign(innerState.props, otherwise)
      })
    }
  )
)
