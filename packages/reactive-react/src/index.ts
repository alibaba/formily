import hoistNonReactStatics from 'hoist-non-react-statics'
import { forwardRef, memo } from 'react'
import { useObserver } from './hooks'
import { IObserverOptions } from './types'

export function observer<
  Options extends IObserverOptions,
  Component extends Options extends { forwardRef: true }
    ? React.ForwardRefRenderFunction<any, any>
    : React.FunctionComponent<any>
>(
  component: Component,
  options?: Options
): Options extends { forwardRef: true }
  ? React.MemoExoticComponent<
      React.ForwardRefExoticComponent<
        React.PropsWithoutRef<Parameters<Component>[0]> & {
          ref?: Parameters<Component>[1]
        }
      >
    >
  : React.MemoExoticComponent<
      React.FunctionComponent<Parameters<Component>[0]>
    > {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef((props: any, ref: any) => {
        return useObserver(() => component(props, ref), realOptions)
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
