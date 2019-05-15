export const defer = () => {
  let _resolve: (payload: any) => void
  let _reject: (error: any) => void
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
