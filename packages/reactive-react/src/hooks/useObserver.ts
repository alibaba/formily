import React from 'react'
import ReactDOM from 'react-dom'
import { Tracker } from '@formily/reactive'
import { isFn } from '@formily/shared'
import { GarbageCollector } from '../gc'
import { IObserverOptions } from '../types'
import { useForceUpdate } from './useForceUpdate'

const batchUpdate =
  React['batchUpdate'] ||
  ReactDOM['batchUpdate'] ||
  ReactDOM['unstable_batchedUpdates']

class AutoCollector {}

export const useObserver = <T extends () => any>(
  view: T,
  options?: IObserverOptions
): ReturnType<T> => {
  const forceUpdate = useForceUpdate()
  const gcRef = React.useRef<GarbageCollector>()
  const tracker = React.useMemo(() => {
    const updater = () => {
      if (isFn(batchUpdate)) {
        batchUpdate(() => forceUpdate())
      } else {
        forceUpdate()
      }
    }
    return new Tracker(() => {
      if (isFn(options?.scheduler)) {
        options.scheduler(updater)
      } else {
        updater()
      }
    })
  }, [])
  //StrictMode/ConcurrentMode会导致组件无法正确触发Unmount，所以只能自己做垃圾回收
  if (!gcRef.current) {
    const target = new AutoCollector()
    gcRef.current = new GarbageCollector(target, () => {
      if (tracker) {
        tracker.dispose()
      }
    })
    gcRef.current.open()
  }

  React.useEffect(() => {
    gcRef.current.close()
    return () => {
      if (tracker) {
        tracker.dispose()
      }
    }
  }, [])

  return tracker.track(view)
}
