import createMatcher from 'dot-match'
import { resolveFieldPath, isStr, isFn, isArr, reduce } from './utils'

const withFilter = (result, filter, payload) => {
  if (isFn(filter)) {
    return result && filter(payload)
  }
  return result
}

const wildcardRE = /\.\s*\*\s*\.?/

export const FormPath = {
  match(matchLanguage, matchRealPath, filter) {
    matchLanguage = matchLanguage + ''
    const match = createMatcher(matchLanguage)
    if (isFn(matchRealPath)) {
      filter = matchRealPath
      matchRealPath = false
    }
    const matcher = payload => {
      if (payload && payload.fieldState) {
        return withFilter(
          match(
            resolveFieldPath(
              matchRealPath ? payload.fieldState.path : payload.fieldState.name
            )
          ),
          filter,
          payload.fieldState
        )
      } else if (payload && payload.name && payload.path) {
        return withFilter(
          match(resolveFieldPath(matchRealPath ? payload.path : payload.name)),
          filter,
          payload
        )
      } else if (isStr(payload)) {
        return withFilter(match(resolveFieldPath(payload)), filter, {
          name: payload
        })
      } else if (isArr(payload)) {
        return withFilter(match(payload), filter, { path: payload })
      }
      return false
    }

    matcher.hasWildcard = wildcardRE.test(matchLanguage)
    matcher.string = matchLanguage

    return matcher
  },
  exclude(matcher) {
    return path =>
      isFn(matcher)
        ? !matcher(path)
        : isStr(matcher)
          ? !FormPath.match(matcher)(path)
          : false
  },
  transform(path, regexp, calllback) {
    const args = reduce(
      resolveFieldPath(path),
      (buf, key) => {
        return new RegExp(regexp).test(key) ? buf.concat(key) : buf
      },
      []
    )
    return calllback(...args)
  }
}
