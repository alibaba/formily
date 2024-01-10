import { useCallback, useRef, useState } from 'react'
import { useLayoutEffect } from './useLayoutEffect'
import { useDidUpdate } from './useDidUpdate'

const EMPTY_ARRAY: any[] = []
const RENDER_COUNT = { value: 0 }
const RENDER_QUEUE = new Set<() => void>()

export function useForceUpdate() {
  const [, setState] = useState([])
  const firstRenderedRef = useRef(false)
  const needUpdateRef = useRef(false)
  useLayoutEffect(() => {
    firstRenderedRef.current = true
    if (needUpdateRef.current) {
      setState([])
      needUpdateRef.current = false
    }
    return () => {
      firstRenderedRef.current = false
    }
  }, EMPTY_ARRAY)

  const update = useCallback(() => {
    setState([])
  }, EMPTY_ARRAY)

  const scheduler = useCallback(() => {
    if (!firstRenderedRef.current) {
      // 针对StrictMode无法快速回收内存，只能考虑拦截第一次渲染函数的setState，
      // 因为第一次渲染函数的setState会触发第二次渲染函数执行，从而清理掉第二次渲染函数内部的依赖
      needUpdateRef.current = true
      return
    }
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
