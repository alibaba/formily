import hoistNonReactStatics from 'hoist-non-react-statics'
import { forwardRef, memo } from 'react'
import { useObserver } from './hooks'
import { IObserverOptions } from './types'

export function observer<P, Options extends IObserverOptions>(
  component: React.FunctionComponent<P>,
  options?: Options
): Options extends { forwardRef: true }
  ? React.MemoExoticComponent<React.ForwardRefExoticComponent<P>>
  : React.MemoExoticComponent<React.FunctionComponent<P>> {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef((props: any, ref: any) => {
        return useObserver(() => component({ ...props, ref }), realOptions)
      })
    : (props: any) => {
        return useObserver(() => component(props), realOptions)
      }

  const memoComponent = memo(wrappedComponent)

  hoistNonReactStatics(memoComponent, component)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  return memoComponent as any
}
