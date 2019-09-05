import { isFn, isStr } from './types'

export const deprecate = (method: any, message?: string, help?: string) => {
  if (isFn(method)) {
    return function(...args: any[]) {
      deprecate(message, help)
      method.apply(this, args)
    }
  }
  if (isStr(method)) {
    console.error(
      new Error(
        `${method} has been deprecated. Do not continue to use this api.${message ||
          ''}`
      )
    )
  }
}
