import { action as bindAction } from '../action'
import { createAnnotation } from '../internals'

export const action = createAnnotation(({ target, key, value }) => {
  if (target) {
    target[key] = bindAction(value)
  }
  return bindAction(value)
})
