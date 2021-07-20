import { useCallback, useEffect, useRef, useState } from 'react'
import { useDidUpdate } from './useDidUpdate'

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

export function useForceUpdate() {
  const [, setState] = useState([])
  const unMountRef = useRef(false)

  useEffect(() => {
    unMountRef.current = false
    return () => {
      unMountRef.current = true
    }
  }, EMPTY_ARRAY)

  const update = useCallback(() => {
    if (unMountRef.current) return
    setState([])
  }, EMPTY_ARRAY)

  const scheduler = useCallback(() => {
    if (RENDER_COUNT.value === 0) {
      update()
    } else {
      RENDER_QUEUE.add(update)
    }
  }, EMPTY_ARRAY)

  RENDER_COUNT.value++

  useDidUpdate(() => {
    if (RENDER_COUNT.value > 0) {
      RENDER_COUNT.value--
    }
    if (RENDER_COUNT.value === 0) {
      RENDER_QUEUE.forEach((update) => {
        RENDER_QUEUE.delete(update)
        update()
      })
    }
  })

  return scheduler
}
