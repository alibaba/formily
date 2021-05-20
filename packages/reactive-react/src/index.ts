import React, { memo, forwardRef, ForwardedRef } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useObserver } from './hooks'
import { IObserverOptions } from './types'

export function observer<P extends object>(
  baseComponent: React.FunctionComponent<P>,
  options?: IObserverOptions
): IObserverOptions extends { forwardRef: true }
  ? React.MemoExoticComponent<
      React.ForwardRefExoticComponent<React.PropsWithoutRef<P>>
    >
  : React.MemoExoticComponent<React.FunctionComponent<P>>

export function observer<P extends object>(
  baseComponent: React.FunctionComponent<P>,
  options?: IObserverOptions
) {
  const realOptions = {
    forwardRef: false,
    ...options,
  }

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef(
        (
          props: P,
          ref: ForwardedRef<'ref' extends keyof P ? P['ref'] : any>
        ) => {
          return useObserver(
            () =>
              baseComponent({
                ...props,
                ...ref,
              }),
            realOptions
          )
        }
      )
    : (props: P) => {
        return useObserver(() => baseComponent(props), realOptions)
      }

  const memoComponent = memo(wrappedComponent)

  hoistNonReactStatics(memoComponent, baseComponent)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  return memoComponent
}
