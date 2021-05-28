import {
  memo,
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  MemoExoticComponent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useObserver } from './hooks'
import { IObserverOptions } from './types'

export function observer<
  Options extends IObserverOptions,
  Component extends Options extends { forwardRef: true }
    ? ForwardRefRenderFunction<any, any>
    : FunctionComponent<any>
>(
  component: Component,
  options?: Options
): Options extends { forwardRef: true }
  ? MemoExoticComponent<
      ForwardRefExoticComponent<
        PropsWithoutRef<Parameters<Component>[0]> & {
          ref?: Parameters<Component>[1]
        }
      >
    >
  : MemoExoticComponent<FunctionComponent<Parameters<Component>[0]>> {
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
