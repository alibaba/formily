import { isFn, isStr } from './types'

const caches = {}

export function deprecate<P1 = any, P2 = any, P3 = any, P4 = any, P5 = any>(
  method: any,
  message?: string,
  help?: string
) {
  if (isFn(method)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function(p1?: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5) {
      deprecate(message, help)
      return method.apply(this, arguments)
    }
  }
  if (isStr(method) && !caches[method]) {
    caches[method] = true
    console.warn(
      new Error(
        `${method} has been deprecated. Do not continue to use this api.${message ||
          ''}`
      )
    )
  }
}
