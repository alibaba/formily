import { registerLinkage } from '../shared/registry'
import { presetLinkage } from '../shared/linkage'

registerLinkage(
  'value:visible',
  presetLinkage(
    ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.visible = true
      })
    },
    ({ target }, { setFieldState }) => {
      setFieldState(target, innerState => {
        innerState.visible = false
      })
    }
  )
)
