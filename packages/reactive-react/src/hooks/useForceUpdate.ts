import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

const batchUpdate =
  React['batchUpdate'] ||
  ReactDOM['batchUpdate'] ||
  ReactDOM['unstable_batchedUpdates'] ||
  ((callback: any) => callback())

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const unmountRef = useRef(false)

  const update = useCallback(() => {
    if (RENDER_COUNT.value === 0) {
      if (unmountRef.current) return
      setTick((tick) => {
        return tick + 1
      })
    } else {
      if (!RENDER_QUEUE.has(update)) {
        RENDER_QUEUE.add(update)
      }
    }
  }, EMPTY_ARRAY)

  RENDER_COUNT.value++

  useEffect(() => {
    RENDER_COUNT.value--
    if (RENDER_COUNT.value === 0) {
      batchUpdate(() => {
        RENDER_QUEUE.forEach((update) => {
          RENDER_QUEUE.delete(update)
          update()
        })
      })
    }
  })

  useEffect(() => {
    unmountRef.current = false
    return () => {
      unmountRef.current = true
    }
  }, [])

  return update
}
