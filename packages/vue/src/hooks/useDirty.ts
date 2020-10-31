import { ref, watchEffect } from '@vue/composition-api'
import { isEqual } from '@formily/shared'

export const useDirty = (input: any = {}, keys: string[] = []) => {
  const inputRef = ref(input)
  const dirtyRef = ref<any>({ data: { ...input }, dirtys: {}, num: 0 })
  dirtyRef.value.num = 0
  watchEffect(() =>
    keys.forEach(key => {
      if (!isEqual(inputRef.value[key], dirtyRef.value.data[key])) {
        dirtyRef.value.data[key] = inputRef.value[key]
        dirtyRef.value.dirtys[key] = true
        dirtyRef.value.num++
      } else {
        dirtyRef.value.dirtys[key] = false
      }
    })
  )
  return dirtyRef.value
}
