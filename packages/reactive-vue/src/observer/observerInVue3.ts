import { IObserverOptions } from '../types'
import { useObserver } from '../hooks/useObserver'

export const observer = function (opts: any, options?: IObserverOptions): any {
  const name = options?.name || opts.name || 'ObservableComponent'
  
  return {
    name,
    ...opts,
    setup(props: Record<string, any>, context: any) {
      useObserver()
      return opts?.setup?.(props, context)
    }
  }
}
