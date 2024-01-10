import { isFn, isArr } from '@formily/shared'
import { SchemaPatch } from './types'

const patches: SchemaPatch[] = []

const polyfills: Record<string, SchemaPatch[]> = {}

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

export const registerPolyfills = (version: string, patch: SchemaPatch) => {
  if (version && isFn(patch)) {
    polyfills[version] = polyfills[version] || []
    polyfills[version].push(patch)
  }
}

export const enablePolyfills = (versions?: string[]) => {
  if (isArr(versions)) {
    versions.forEach((version) => {
      if (isArr(polyfills[version])) {
        polyfills[version].forEach((patch) => {
          registerPatches(patch)
        })
      }
    })
  }
}
