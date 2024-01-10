import React from 'react'

export interface IObserverOptions {
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}

export interface IObserverProps {
  children?: (() => React.ReactElement) | React.ReactNode
}

export type Modify<T, R> = Omit<T, keyof R> & R

export type ReactPropsWithChildren<P> = Modify<
  { children?: React.ReactNode | undefined },
  P
>

export type ReactFC<P = {}> = React.FC<ReactPropsWithChildren<P>>
