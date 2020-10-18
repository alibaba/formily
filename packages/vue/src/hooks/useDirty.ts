import { reactive } from '@vue/composition-api'
import { isEqual } from '@formily/shared'

export const useDirty = (input: any = {}, keys: string[] = []) => {
  const ref = reactive<any>({ data: { ...input }, dirtys: {}, num: 0 })
  ref.num = 0
  keys.forEach(key => {
    if (!isEqual(input[key], ref.data[key])) {
      ref.data[key] = input[key]
      ref.dirtys[key] = true
      ref.num++
    } else {
      ref.dirtys[key] = false
    }
  })
  return ref
}
