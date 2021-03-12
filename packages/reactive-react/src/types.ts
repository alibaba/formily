
export interface IObserverOptions {
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}
