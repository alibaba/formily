import { getCurrentInstance } from '@vue/composition-api'

export function useForceUpdate() {
  const $instance = getCurrentInstance()
  const $forceUpdate = $instance?.$forceUpdate?.bind($instance)
  const forceUpdate = () => {
    if ($forceUpdate) {
      $forceUpdate()
    }
  }
  return forceUpdate
}
