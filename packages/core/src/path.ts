import createMatcher from 'dot-match'
import { resolveFieldPath, isStr, isFn, isArr, reduce } from './utils'
import { IFormPathMatcher } from '@uform/types'
type Filter = (payload: any) => boolean

const matchWithFilter = (result: boolean, filter: Filter, payload: any) => {
  if (isFn(filter)) {
    return result && filter(payload)
  }
  return result
}

const wildcardRE = /\*/

export const FormPath = {
  match(
    pattern: string,
    isRealPath?: boolean | Filter,
    filter?: Filter
  ): IFormPathMatcher {
    pattern = pattern + ''
    const match = createMatcher(pattern)
    if (isFn(isRealPath)) {
      filter = isRealPath as Filter
      isRealPath = false
    }
    const matcher = (payload: any) => {
      if (payload && payload.fieldState) {
        return matchWithFilter(
          match(
            resolveFieldPath(
              isRealPath ? payload.fieldState.path : payload.fieldState.name
            )
          ),
          filter,
          payload.fieldState
        )
      } else if (payload && payload.name && payload.path) {
        return matchWithFilter(
          match(resolveFieldPath(isRealPath ? payload.path : payload.name)),
          filter,
          payload
        )
      } else if (isStr(payload)) {
        return matchWithFilter(match(resolveFieldPath(payload)), filter, {
          name: payload
        })
      } else if (isArr(payload)) {
        return matchWithFilter(match(payload), filter, { path: payload })
      }
      return false
    }

    matcher.hasWildcard = wildcardRE.test(pattern)
    matcher.pattern = pattern

    return matcher
  },
  exclude(matcher: IFormPathMatcher) {
    return (path: any): boolean =>
      isFn(matcher)
        ? !matcher(path)
        : isStr(matcher)
        ? !FormPath.match(matcher)(path)
        : false
  },
  transform(
    path: string,
    regexp: RegExp,
    calllback: (...args: string[]) => string
  ) {
    const args = reduce(
      resolveFieldPath(path),
      (buf: string[], key: string) => {
        return new RegExp(regexp).test(key) ? buf.concat(key) : buf
      },
      []
    )
    return calllback(...args)
  }
}
