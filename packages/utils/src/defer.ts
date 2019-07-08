export const defer = <P, E>() => {
  let internalResolve: (payload: P) => void
  let internalReject: (error: E) => void
  const promise = new Promise((resolve, reject) => {
    internalResolve = resolve
    internalReject = reject
  })
  return {
    promise,
    resolve: internalResolve,
    reject: internalReject
  }
}
