import { isFn } from '@uform/shared'

export const scheduler = (concurrent = 360) => {
  let operating = false
  let buffer = []
  const applyQueue = () => {
    operating = true
    requestAnimationFrame(() => {
      let expireTime = performance.now() + concurrent,
        operateEndTime = 0
      while (true) {
        if (expireTime < operateEndTime) break
        const fn = buffer.shift()
        if (fn) {
          fn()
          operateEndTime = performance.now()
        } else {
          break
        }
      }

      if (buffer.length > 0) {
        applyQueue()
      } else {
        operating = false
      }
    })
  }
  return (fn: any) => {
    if (!isFn(fn)) return
    buffer.push(fn)
    if (!operating) {
      applyQueue()
    }
  }
}
