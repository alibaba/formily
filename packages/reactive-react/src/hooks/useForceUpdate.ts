import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'

const batchUpdate =
  React['batchUpdate'] ||
  ReactDOM['batchUpdate'] ||
  ReactDOM['unstable_batchedUpdates'] ||
  ((callback: any) => callback())

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

const runPendingUpdate = () => {
  if (RENDER_COUNT.value === 0) {
    batchUpdate(() => {
      RENDER_QUEUE.forEach((update) => {
        RENDER_QUEUE.delete(update)
        update()
      })
    })
  }
}

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const unmountRef = useRef(false)
  const mountedRef = useRef(false)
  const update = useCallback(() => {
    if (RENDER_COUNT.value === 0 || mountedRef.current) {
      if (unmountRef.current) return
      batchUpdate(() => {
        setTick((tick) => {
          return tick + 1
        })
      })
    } else {
      if (!RENDER_QUEUE.has(update)) {
        RENDER_QUEUE.add(update)
      }
    }
  }, EMPTY_ARRAY)

  if (!mountedRef.current) {
    RENDER_COUNT.value++
  }

  useLayoutEffect(() => {
    if (mountedRef.current) return
    RENDER_COUNT.value--
    runPendingUpdate()
  })

  useEffect(() => {
    mountedRef.current = true
    unmountRef.current = false
    return () => {
      mountedRef.current = false
      unmountRef.current = true
    }
  }, [])

  return update
}
