import React from 'react'
import { isEqual } from '@formily/shared'

export const useDirty = (input: any = {}, keys: string[] = []) => {
  const ref = React.useRef<any>({ data: { ...input }, dirtys: {}, num: 0 })
  ref.current.num = 0
  keys.forEach(key => {
    if (!isEqual(input[key], ref.current.data[key])) {
      ref.current.data[key] = input[key]
      ref.current.dirtys[key] = true
      ref.current.num++
    } else {
      ref.current.dirtys[key] = false
    }
  })
  return ref.current
}
