import { Tracker } from '@formily/reactive'
import { IObserverOptions } from '../types'
import { useForceUpdate } from './useForceUpdate'
import { useCompatFactory } from './useCompatFactory'

export const useObserver = <T extends () => any>(
  view: T,
  options?: IObserverOptions
): ReturnType<T> => {
  const forceUpdate = useForceUpdate()
  const tracker = useCompatFactory(
    () =>
      new Tracker(() => {
        if (typeof options?.scheduler === 'function') {
          options.scheduler(forceUpdate)
        } else {
          forceUpdate()
        }
      }, options?.displayName)
  )
  return tracker.track(view)
}
