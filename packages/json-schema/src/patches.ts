import { isFn } from '@formily/shared'
import { SchemaPatch } from './types'

const patches: SchemaPatch[] = []

export const reducePatches = (schema: any) => {
  return patches.reduce(
    (buf, patch) => {
      return patch(buf)
    },
    { ...schema }
  )
}

export const registerPatches = (...args: SchemaPatch[]) => {
  args.forEach((patch) => {
    if (isFn(patch)) {
      patches.push(patch)
    }
  })
}
