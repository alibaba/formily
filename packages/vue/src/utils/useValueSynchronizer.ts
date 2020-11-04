import { onBeforeUpdate, getCurrentInstance } from '@vue/composition-api'
import { set, get } from 'lodash'

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
  beforSync?: () => void
) {
  const $vm = getCurrentInstance()
  return function syncValueBeforeUpdate(keyMap: KeyMap = {}): void {
    const keys = Object.keys(keyMap)
    onBeforeUpdate(() => {
      if (typeof beforSync === 'function') {
        beforSync()
      }
      keys.forEach(key => {
        set($vm, keyMap[key], get(valueMap, key))
      })
    })
  }
}
