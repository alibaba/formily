import { each } from './array'
import { isValid } from './isEmpty'
export const defaults = (...args: any[]): any => {
  const result = {}
  each(args, target => {
    each(target, (value, key) => {
      if (isValid(value)) {
        result[key] = value
      }
    })
  })
  return result
}
