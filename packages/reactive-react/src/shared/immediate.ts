export const immediate = (callback?: () => void) => {
  let desposed = false
  Promise.resolve(0).then(() => {
    if (desposed) return
    callback()
  })
  return () => {
    desposed = true
  }
}
