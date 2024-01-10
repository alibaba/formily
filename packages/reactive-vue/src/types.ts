export interface IObserverOptions {
  name?: string
  scheduler?: (updater: () => void) => void
}
