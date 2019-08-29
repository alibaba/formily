import {
  Path,
  PathNode,
  ArrayPath,
  isStr,
  isNum,
  isPlainObj,
  isArr,
  isObj
} from '@uform/types'
import { map, each, every } from './array'
import { LRUMap } from './lru'

interface ITokenizerHandlers {
  name(str: string): void
  destructObjectStart(): void
  destructObjectEnd(): void
  destructArrayStart(): void
  destructArrayEnd(): void
  destructKey(str: string, isColon?: boolean): void
}

type Destruct =
  | {
      [key: string]: string
    }
  | Path

type Getter = (obj: any, path: Path, value?: any) => any

type Setter = (
  obj: any,
  path: Path,
  value?: any,
  getSchema?: (path: string[] | number[]) => any
) => any

type HasIn = (obj: any, path: Path) => boolean

function whitespace(c: string) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r'
}

function toString(val: Path | null) {
  if (!val) {
    return ''
  }
  if (isArr(val)) {
    return (val as string[]).join('.')
  }
  return isStr(val) ? val : ''
}

const PathCache = new LRUMap(1000)

export function getPathSegments(path: Path): ArrayPath {
  if (isArr(path)) {
    return path as string[]
  }
  if (isStr(path) && path) {
    const cached = PathCache.get(path)
    if (cached) {
      return cached
    }
    const pathArr = (path as string).split('.')
    const parts = []

    for (let i = 0; i < pathArr.length; i++) {
      let p = pathArr[i]

      while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
        p = p.slice(0, -1) + '.'
        p += pathArr[++i]
      }

      parts.push(p)
    }
    PathCache.set(path, parts)
    return parts
  }
  if (isNum(path)) {
    return [path as number]
  }
  return []
}

class DestructTokenizer {
  private text: string

  private index: number

  private handlers: ITokenizerHandlers

  private state: (char: string, prev?: string) => void

  private declareNameStart: number

  private declareNameEnd: number

  private nbraceCount: number

  private nbracketCount: number

  private EOF: boolean

  private destructKeyStart: number

  private destructKey: string

  constructor(text: string, handlers: ITokenizerHandlers) {
    this.text = text
    this.index = 0
    this.handlers = handlers
    this.state = this.processNameStart
    this.declareNameStart = 0
    this.declareNameEnd = 0
    this.nbraceCount = 0
    this.nbracketCount = 0
  }

  public parse() {
    let char = ''
    let prev = ''
    const l = this.text.length
    for (; this.index < l; this.index++) {
      char = this.text.charAt(this.index)
      this.EOF = l - 1 === this.index
      this.state(char, prev)
      prev = char
    }
  }

  private processNameStart(char: string) {
    if (char === '{' || char === '[') {
      this.state = this.processDestructStart
      this.index--
    } else if (!whitespace(char)) {
      this.declareNameStart = this.index
      this.state = this.processName
    }
  }

  private processName(char: string, prev: string) {
    if (whitespace(char)) {
      this.declareNameEnd = this.index
      this.handlers.name(this.getName())
    } else if (this.EOF) {
      this.declareNameEnd = this.index + 1
      this.handlers.name(this.getName())
    }
  }

  private processDestructStart(char) {
    if (char === '{') {
      this.nbraceCount++
      this.handlers.destructObjectStart()
    } else if (char === '[') {
      this.nbracketCount++
      this.handlers.destructArrayStart()
    } else if (!whitespace(char)) {
      this.state = this.processDestructKey
      this.destructKeyStart = this.index
      this.index--
    }
  }

  private processDestructKey(char: string, prev: string) {
    if (char === '}') {
      this.nbraceCount--

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart
      }
      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(
          this.destructKeyStart,
          this.index
        )
      }

      this.handlers.destructKey(this.destructKey)
      this.handlers.destructObjectEnd()
      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length
      }
    } else if (char === ']') {
      this.nbracketCount--

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart
      }
      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(
          this.destructKeyStart,
          this.index
        )
      }
      this.handlers.destructKey(this.destructKey)
      this.handlers.destructArrayEnd()
      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length
      }
    } else if (whitespace(char) || char === ':' || char === ',') {
      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(
          this.destructKeyStart,
          this.index
        )
      }
      if (!whitespace(char)) {
        this.state = this.processDestructStart
        this.handlers.destructKey(this.destructKey, char === ':')
      }
    }
  }

  private getName() {
    return this.text.substring(this.declareNameStart, this.declareNameEnd)
  }
}

const parseDestruct = (str: PathNode) => {
  if (!isStr(str)) {
    return str
  }

  let destruct: Destruct
  const stack = []
  let token = ''
  let realKey = ''
  let lastDestruct: Destruct
  let root: Destruct

  new DestructTokenizer(str as string, {
    name(key: string) {
      root = key
    },
    destructKey(key, readyReplace) {
      if (!key) {
        return
      }
      token = key
      if (readyReplace) {
        realKey = key
        lastDestruct = destruct
        return
      }
      if (isArr(destruct)) {
        ;(destruct as string[]).push(key)
      } else if (isPlainObj(destruct)) {
        destruct[realKey && lastDestruct === destruct ? realKey : key] = key
      }
      realKey = ''
      lastDestruct = destruct
    },
    destructArrayStart() {
      if (!destruct) {
        root = []
        destruct = root
      } else {
        destruct = []
      }
      const tail = stack[stack.length - 1]
      if (isPlainObj(tail)) {
        tail[token] = destruct
      } else if (isArr(tail)) {
        tail.push(destruct)
      }
      stack.push(destruct)
    },
    destructObjectStart() {
      if (!destruct) {
        root = {}
        destruct = root
      } else {
        destruct = {}
      }
      const tail = stack[stack.length - 1]
      if (isPlainObj(tail)) {
        tail[token] = destruct
      } else if (isArr(tail)) {
        tail.push(destruct)
      }
      stack.push(destruct)
    },
    destructArrayEnd() {
      stack.pop()
      destruct = stack[stack.length - 1]
    },
    destructObjectEnd() {
      stack.pop()
      destruct = stack[stack.length - 1]
    }
  }).parse()
  return root
}

const traverse = (obj: any, callback: any) => {
  const internalTraverse = (internalObj: any, path: string[]) => {
    if (isStr(internalObj)) {
      return callback(internalObj, internalObj)
    }
    each(internalObj, (item: any, key: string) => {
      const newPath = path.concat(key)
      if (isArr(item) || isPlainObj(item)) {
        internalTraverse(item, newPath)
      } else {
        callback(newPath, item)
      }
    })
  }

  return internalTraverse(obj, [])
}

const mapReduce = (obj: any, callback: any) => {
  const internalTraverse = (internalObj: any, path: string[]) => {
    return map(internalObj, (item: any, key: string) => {
      const newPath = path.concat(key)
      if (isArr(item) || isPlainObj(item)) {
        return internalTraverse(item, newPath)
      } else {
        return callback(
          newPath,
          newPath.slice(0, newPath.length - 1).concat(item)
        )
      }
    })
  }

  return internalTraverse(obj, [])
}

const parseDesturctPath = (path: Path): any => {
  const newPath = getPathSegments(path)
  const lastKey = newPath[newPath.length - 1]
  const startPath = newPath.slice(0, newPath.length - 1)
  const destruct = parseDestruct(lastKey)
  return {
    path: newPath,
    lastKey,
    startPath,
    destruct
  }
}

const parsePaths = (path: Path): any => {
  const result = []
  const parsed = parseDesturctPath(path)
  if (isStr(parsed.destruct)) {
    return path
  } else if (parsed.destruct) {
    traverse(parsed.destruct, (internalPath, key) => {
      result.push({
        path: parsed.startPath.concat(internalPath),
        startPath: parsed.startPath,
        endPath: internalPath,
        key
      })
    })
    return result
  } else {
    return path
  }
}

const resolveGetIn = (get: Getter) => {
  const cache = new Map()
  return (obj: any, path: Path, value?: any): any => {
    let ast = null

    if (!cache.get(path)) {
      ast = parseDesturctPath(path)
      cache.set(path, ast)
    } else {
      ast = cache.get(path)
    }
    if (!isArr(ast.destruct) && !isPlainObj(ast.destruct)) {
      return get(obj, path, value)
    }
    return mapReduce(ast.destruct, (mapPath, key) => {
      return get(obj, ast.startPath.concat(key[key.length - 1]))
    })
  }
}

const resolveUpdateIn = (update: Setter, internalGetIn: Getter) => {
  const cache = new Map()
  return (
    obj: any,
    path: Path,
    value?: any,
    getSchema?: (path: string[] | number[]) => any
  ) => {
    let paths: any = []
    if (!cache.get(path)) {
      paths = parsePaths(path)
      cache.set(path, paths)
    } else {
      paths = cache.get(path)
    }
    if (!isArr(paths)) {
      return update(obj, path, value, getSchema)
    }
    if (paths && paths.length) {
      each(paths, ({ mapPath, key, startPath, endPath }) => {
        update(
          obj,
          startPath.concat(key),
          internalGetIn(value, endPath),
          getSchema
        )
      })
    }
    return obj
  }
}

const resolveExistIn = (has: HasIn) => {
  const cache = new Map()
  return (obj: any, path: Path) => {
    let paths: any = []
    if (!cache.get(path)) {
      paths = parsePaths(path)
      cache.set(path, paths)
    } else {
      paths = cache.get(path)
    }
    if (!isArr(paths)) {
      return has(obj, path)
    }
    if (paths && paths.length) {
      return every(paths, ({ startPath, key }) => {
        return has(obj, startPath.concat(key))
      })
    }

    return false
  }
}

function _getIn(obj: any, path: Path, value: any) {
  if (!isObj(obj) || !path) {
    return obj
  }

  path = toString(path)

  if (path in obj) {
    return obj[path as string]
  }

  const pathArr = getPathSegments(path)

  for (let i = 0; i < pathArr.length; i++) {
    if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
      return value
    }

    obj = obj[pathArr[i]]

    if (obj === undefined || obj === null) {
      // `obj` is either `undefined` or `null` so we want to stop the loop, and
      // if this is not the last bit of the path, and
      // if it did't return `undefined`
      // it would return `null` if `obj` is `null`
      // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
      if (i !== pathArr.length - 1) {
        return value
      }

      break
    }
  }

  return obj
}

function _setIn(
  obj: any,
  path: Path,
  value: any,
  getSchema?: (path: string[] | number[]) => any
) {
  if (!isObj(obj) || !path) {
    return
  }

  path = toString(path)

  if (path in obj) {
    obj[path as string] = value
    return
  }

  const pathArr = getPathSegments(path)

  for (let i = 0; i < pathArr.length; i++) {
    const p = pathArr[i]
    if (!isObj(obj[p])) {
      if (obj[p] === undefined && value === undefined) {
        return
      }
      if (/^\d+$/.test(pathArr[i + 1 + ''])) {
        if (getSchema) {
          const schema = getSchema(pathArr.slice(0, i) as string[])

          if (!schema || schema.type === 'array') {
            obj[p] = []
          } else {
            obj[p] = {}
          }
        } else {
          obj[p] = []
        }
      } else {
        obj[p] = {}
      }
    }

    if (i === pathArr.length - 1) {
      obj[p] = value
    }

    obj = obj[p]
  }
}

function _deleteIn(obj: any, path: Path) {
  if (!isObj(obj) || !path) {
    return
  }

  path = toString(path)

  if (path in obj) {
    delete obj[path as string]
    return
  }

  const pathArr = getPathSegments(path)

  for (let i = 0; i < pathArr.length; i++) {
    const p = pathArr[i]

    if (i === pathArr.length - 1) {
      if (isArr(obj)) {
        obj.splice(p as number, 1)
      } else {
        delete obj[p]
      }
      return
    }

    obj = obj[p]

    if (!isObj(obj)) {
      return
    }
  }
}

function _existIn(obj: any, path: Path) {
  if (!isObj(obj) || !path) {
    return false
  }

  path = toString(path)

  if (path in obj) {
    return true
  }

  const pathArr = getPathSegments(path)

  for (let i = 0; i < pathArr.length; i++) {
    if (isObj(obj)) {
      if (!(pathArr[i] in obj)) {
        return false
      }

      obj = obj[pathArr[i]]
    } else {
      return false
    }
  }

  return true
}
export const getIn = resolveGetIn(_getIn)
export const setIn = resolveUpdateIn(_setIn, getIn)
export const deleteIn = resolveUpdateIn(_deleteIn, getIn)
export const existIn = resolveExistIn(_existIn)
export { parseDesturctPath, parseDestruct, parsePaths }
