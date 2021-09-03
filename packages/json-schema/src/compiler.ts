import {
  isArr,
  isFn,
  isPlainObj,
  isStr,
  reduce,
  FormPath,
} from '@formily/shared'
import { IGeneralFieldState } from '@formily/core'
import { untracked, test } from '@formily/reactive'
import {
  isNoNeedCompileObject,
  SchemaNestedKeys,
  hasOwnProperty,
  patchStateFormSchema,
} from './shared'
import { traverse } from './traverse'
import { ISchema } from './types'

const ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/
const Registry = {
  silent: false,
  compile(expression: string, scope = {}) {
    if (Registry.silent) {
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

const traverseSchema = (
  schema: ISchema,
  visitor: (value: any, path: any[]) => void
) => {
  traverse(schema, visitor, (value, path) => {
    if (String(path[0]).indexOf('x-') == -1 && isFn(value)) return false
    if (SchemaNestedKeys[path[0]]) return false
    return true
  })
}

export const silent = (value = true) => {
  Registry.silent = !!value
}

export const registerCompiler = (
  compiler: (expression: string, scope: any) => any
) => {
  if (isFn(compiler)) {
    Registry.compile = compiler
  }
}

export const shallowCompile = <Source = any, Scope = any>(
  source: Source,
  scope?: Scope
) => {
  if (isStr(source)) {
    const matched = source.match(ExpRE)
    if (!matched) return source
    return Registry.compile(matched[1], scope)
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
      if (isNoNeedCompileObject(source)) return source
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

export const patchCompile = (
  targetState: IGeneralFieldState,
  sourceState: any,
  scope: any
) => {
  traverse(sourceState, (value, path) => {
    const compiled = compile(value, scope)
    if (compiled === undefined) return
    if (hasOwnProperty.call(sourceState, path[0])) {
      untracked(() => FormPath.setIn(targetState, path, compiled))
    }
  })
}

export const patchSchemaCompile = (
  targetState: IGeneralFieldState,
  sourceSchema: ISchema,
  scope: any,
  demand = false
) => {
  traverseSchema(sourceSchema, (value, path) => {
    let compiled = value
    let hasCollected = test(() => {
      compiled = compile(value, scope)
    })
    if (compiled === undefined) return
    if (demand) {
      if (hasCollected || !targetState.initialized) {
        patchStateFormSchema(targetState, path, compiled)
      }
    } else {
      patchStateFormSchema(targetState, path, compiled)
    }
  })
}
