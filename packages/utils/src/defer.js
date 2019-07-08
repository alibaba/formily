export const defer = () => {
  let _resolve
  let _reject
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
