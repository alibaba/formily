import React, { forwardRef, memo } from 'react'
import { useObserver, UpdateScheduler } from '../hooks/useObserver'

export { useObserver }

export interface ReactFC<P = {}> {
  (props: React.PropsWithChildren<P>, context?: any): React.ReactElement<
    any,
    any
  > | null
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
  [key: string]: any
}

export interface IObserverOptions {
  readonly forwardRef?: boolean
  readonly scheduler?: UpdateScheduler
}

export function observer<P extends object>(
  baseComponent: ReactFC<P>,
  options?: IObserverOptions
): ReactFC<P>

// n.b. base case is not used for actual typings or exported in the typing files
export function observer(
  baseComponent: ReactFC<any>,
  options?: IObserverOptions
) {
  const realOptions = {
    forwardRef: false,
    ...options
  }

  const baseComponentName = baseComponent.displayName || baseComponent.name

  const wrappedComponent = (props: any, ref: any) => {
    //eslint-disable-next-line
    return useObserver(() => baseComponent(props, ref), {
      baseComponentName,
      scheduler: realOptions.scheduler
    })
  }
  wrappedComponent.displayName = baseComponentName

  // memo; we are not interested in deep updates
  // in props; we assume that if deep objects are changed,
  // this is in observables, which would have been tracked anyway
  let memoComponent
  if (realOptions.forwardRef) {
    // we have to use forwardRef here because:
    // 1. it cannot go before memo, only after it
    // 2. forwardRef converts the function into an actual component, so we can't let the baseComponent do it
    //    since it wouldn't be a callable function anymore
    memoComponent = memo(forwardRef(wrappedComponent))
  } else {
    memoComponent = memo(wrappedComponent)
  }

  copyStaticProperties(baseComponent, memoComponent)
  memoComponent.displayName = baseComponentName

  return memoComponent
}

// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
const hoistBlackList: any = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true
}

function copyStaticProperties(base: any, target: any) {
  Object.keys(base).forEach(key => {
    if (!hoistBlackList[key]) {
      Object.defineProperty(
        target,
        key,
        Object.getOwnPropertyDescriptor(base, key)!
      )
    }
  })
}
