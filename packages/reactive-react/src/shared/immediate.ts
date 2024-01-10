export const immediate = (callback?: () => void) => {
  let disposed = false
  Promise.resolve(0).then(() => {
    if (disposed) {
      disposed = false
      return
    }
    callback()
  })
  return () => {
    disposed = true
  }
}
