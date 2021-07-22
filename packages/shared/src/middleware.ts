export interface IMiddleware {
  (payload: any, next: (payload: any) => any): any
}

export const applyMiddleware = (payload: any, fns: IMiddleware[] = []) => {
  const compose = (payload: any, fns: IMiddleware[]) => {
    if (fns.length === 0) return Promise.resolve(payload)
    return Promise.resolve(
      fns[0](payload, (payload) => compose(payload, fns.slice(1)))
    )
  }
  return compose(payload, fns)
}
