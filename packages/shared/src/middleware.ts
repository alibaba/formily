export interface IMiddleware<Payload = any, Result = any> {
  (payload: Payload, next: (payload?: Payload) => Result): Result
}

export const applyMiddleware = (payload: any, fns: IMiddleware[] = []) => {
  const compose = (payload: any, fns: IMiddleware[]) => {
    const prevPayload = payload
    return Promise.resolve(
      fns[0](payload, (payload) =>
        compose(payload ?? prevPayload, fns.slice(1))
      )
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
