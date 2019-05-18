export const defer = <P, E>() => {
  let _resolve: (payload: P) => void
  let _reject: (error: E) => void
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return {
    promise,
    resolve: _resolve,
    reject: _reject
  }
}
