import { useCallback, useRef, useState } from 'react'
import { useLayoutEffect } from './useLayoutEffect'
import { useDidUpdate } from './useDidUpdate'

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

export function useForceUpdate() {
  const [, setState] = useState([])
  const renderedRef = useRef(false)
  useLayoutEffect(() => {
    renderedRef.current = true
    return () => {
      renderedRef.current = false
    }
  }, EMPTY_ARRAY)

  const update = useCallback(() => {
    if (!renderedRef.current) {
      // 针对StrictMode无法快速回收内存，只能考虑拦截第一次渲染函数的setState，
      // 因为第一次渲染函数的setState会触发第二次渲染函数执行，从而清理掉第二次渲染函数内部的依赖
      return
    }
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
