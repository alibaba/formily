import React, { memo, forwardRef } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useObserver } from './hooks'
import { IObserverOptions } from './types'

export function observer<P extends object, TRef = {}>(
  baseComponent: React.ForwardRefRenderFunction<TRef, P>,
  options: IObserverOptions & { forwardRef: true }
): React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<TRef>
  >
>

export function observer<P extends object>(
  baseComponent: React.FunctionComponent<P>,
  options?: IObserverOptions
): React.FunctionComponent<P>

export function observer<
  C extends React.FunctionComponent<any> | React.ForwardRefRenderFunction<any>,
  Options extends IObserverOptions
>(
  baseComponent: C,
  options?: Options
): Options extends { forwardRef: true }
  ? C extends React.ForwardRefRenderFunction<infer P, infer TRef>
    ? C &
        React.MemoExoticComponent<
          React.ForwardRefExoticComponent<
            React.PropsWithoutRef<P> & React.RefAttributes<TRef>
          >
        >
    : never /* forwardRef set for a non forwarding component */
  : C & { displayName: string }

export function observer<P extends object, TRef = {}>(
  baseComponent:
    | React.ForwardRefRenderFunction<TRef, P>
    | React.FunctionComponent<P>,
  options?: IObserverOptions
) {
  const realOptions = {
    forwardRef: false,
    ...options,
  }
  const wrappedComponent = (props: P, ref: React.Ref<TRef>) => {
    //eslint-disable-next-line
    return useObserver(() => baseComponent(props, ref), realOptions)
  }
  let memoComponent: any
  if (realOptions.forwardRef) {
    memoComponent = memo(forwardRef(wrappedComponent))
  } else {
    memoComponent = memo(wrappedComponent)
  }

  hoistNonReactStatics(memoComponent, baseComponent)

  if (realOptions.displayName) {
    memoComponent.displayName = realOptions.displayName
  }

  return memoComponent
}
