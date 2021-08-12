import { isArr, isFn, isPlainObj, isStr, reduce } from '@formily/shared'
import { isObservable } from '@formily/reactive'
import { Schema } from './schema'

const ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/
const actionsSymbol = Symbol.for('__REVA_ACTIONS')
const ENVS = {
  silent: false,
  compile(expression: string, scope = {}) {
    if (ENVS.silent) {
      try {
        return new Function('$root', `with($root) { return (${expression}); }`)(
          scope
        )
      } catch {}
    } else {
      return new Function('$root', `with($root) { return (${expression}); }`)(
        scope
      )
    }
  },
}

export const silent = (value = true) => {
  ENVS.silent = !!value
}

export const registerCompiler = (
  compiler: (expression: string, scope: any) => any
) => {
  if (isFn(compiler)) {
    ENVS.compile = compiler
  }
}

export const shallowCompile = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
) => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    return ENVS.compile(matched[1], scope)
  } else if (isArr(source)) {
    return source.map((item) => shallowCompile(item, scope))
  }
  return source
}

export const compile = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
): any => {
  const seenObjects = new WeakMap()
  const compile = (source: any) => {
    if (isStr(source)) {
      return shallowCompile(source, scope)
    } else if (isArr(source)) {
      return source.map((value: any) => compile(value))
    } else if (isPlainObj(source)) {
      if ('$$typeof' in source && '_owner' in source) {
        return source
      }
      if (source[actionsSymbol]) {
        return source
      }
      if (source['_isAMomentObject']) {
        return source
      }
      if (Schema.isSchemaInstance(source)) {
        return source.compile(scope)
      }
      if (isFn(source['toJS'])) {
        return source
      }
      if (isFn(source['toJSON'])) {
        return source
      }
      if (isObservable(source)) {
        return source
      }
      if (seenObjects.get(source)) {
        return source
      }
      seenObjects.set(source, true)
      const results = reduce(
        source,
        (buf, value, key) => {
          buf[key] = compile(value)
          return buf
        },
        {}
      )
      seenObjects.set(source, false)
      return results
    }
    return source
  }
  return compile(source)
}
