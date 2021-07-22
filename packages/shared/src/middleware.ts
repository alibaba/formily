export interface IMiddleware {
  (payload: any, next: (payload: any) => any): any
}

export const applyMiddleware = (payload: any, fns: IMiddleware[] = []) => {
  const compose = (payload: any, fns: IMiddleware[]) => {
    return Promise.resolve(
      fns[0](payload, (payload) => compose(payload, fns.slice(1)))
    )
  }
  return new Promise((resolve) => {
    compose(
      payload,
      fns.concat((payload) => {
        resolve(payload)
      })
    )
  })
}
