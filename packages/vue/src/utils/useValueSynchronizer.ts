import { onBeforeUpdate, getCurrentInstance } from '@vue/composition-api'
import { set, get, eq } from 'lodash'

type KeyInVm = string
type ValueInVm = any

type KeyMap = {
  [KeyInSource: string]: KeyInVm
}

type ValueMap = {
  [KeyInSource: string]: ValueInVm
}

export function useValueSynchronizer(
  valueMap: ValueMap = {},
  beforeSync?: () => void
) {
  const $vm = getCurrentInstance()
  return function syncValueBeforeUpdate(keyMap: KeyMap = {}): void {
    const keys = Object.keys(keyMap)
    onBeforeUpdate(() => {
      if (typeof beforeSync === 'function') {
        beforeSync()
      }
      keys.forEach(key => {
        if (!eq(get($vm, keyMap[key]), get(valueMap, key))) {
          set($vm, keyMap[key], get(valueMap, key))
        }
      })
    })
  }
}
