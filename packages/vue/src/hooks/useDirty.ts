import { ref } from '@vue/composition-api'
import { isEqual } from '@formily/shared'

export const useDirty = (input: any = {}, keys: string[] = []) => {
  const dirtyRef = ref<any>({ data: { ...input }, dirtys: {}, num: 0 })
  dirtyRef.value.num = 0
  keys.forEach(key => {
    if (!isEqual(input[key], dirtyRef.value.data[key])) {
      dirtyRef.value.data[key] = input[key]
      dirtyRef.value.dirtys[key] = true
      dirtyRef.value.num++
    } else {
      dirtyRef.value.dirtys[key] = false
    }
  })
  return dirtyRef.value
}
