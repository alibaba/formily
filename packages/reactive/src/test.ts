import { DependencyCollected } from './environment'

export const test = (callback?: () => void) => {
  DependencyCollected.value = false
  callback?.()
  return DependencyCollected.value
}
