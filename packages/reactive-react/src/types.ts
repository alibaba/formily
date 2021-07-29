import React from 'react'

export interface IObserverOptions {
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}

export interface IObserverProps {
  children?: (() => React.ReactElement) | React.ReactNode
}
