import { registerLinkage } from '../shared/registry'
import { presetLinkage } from '../shared/linkage'

registerLinkage(
  'value:state',
  presetLinkage(
    ({ target, state }, { setFieldState }) => {
      setFieldState(target, innerState => {
        Object.assign(innerState, state)
      })
    },
    ({ target, otherwise }, { setFieldState }) => {
      if (!otherwise) return
      setFieldState(target, innerState => {
        Object.assign(innerState, otherwise)
      })
    }
  )
)
