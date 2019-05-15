import { isStr, isNum, isPlainObj, isArr, isObj } from './types'
import { map, each, every } from './array'
import { LRUMap } from './lru'

type TokenizerHandlers = {
  name(str: string): void
  destructObjectStart(): void
  destructObjectEnd(): void
  destructArrayStart(): void
  destructArrayEnd(): void
  destructKey(str: string, isColon?: boolean): void
}

export type Path = Array<string | number> | string

type Destruct = {
  [key: string]: string
} | Path

type TraverseCallback = (path: string[], item: any) => void

type Getter = (obj: any, path: Path, value?: any) => any

type Setter = (obj: any, path: Path, value?: any) => any

type HasIn = (obj: any, path: Path) => boolean

function whitespace(c: string) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r'
}

function toString(val: Path | null) {
  if (!val) return ''
  if (isArr(val)) {
    return (val as Array<string>).join('.')
  }
  return isStr(val) ? val : ''
}

const PathCache = new LRUMap(1000)

export function getPathSegments(path: Array<string | number> | string | number | null): Array<string | number> {
  if (isArr(path)) return path as Array<string>
  if (isStr(path) && path) {
    const cached = PathCache.get(path)
    if (cached) return cached
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
  if (isNum(path)) return [path as number]
  return []
}

class DestructTokenizer {

  private text: string

  private index: number

  private handlers: TokenizerHandlers

  private state: (char: string, prev?: string) => void

  private declareNameStart: number

  private declareNameEnd: number

  private nbraceCount: number

  private nbracketCount: number

  private EOF: boolean

  private destructKeyStart: number

  private destructKey: string

  constructor(text: string, handlers: TokenizerHandlers) {
    this.text = text
    this.index = 0
    this.handlers = handlers
    this.state = this.processNameStart
    this.declareNameStart = 0
    this.declareNameEnd = 0
    this.nbraceCount = 0
    this.nbracketCount = 0
  }

  parse() {
    let char = ''
    let prev = ''
    let l = this.text.length
    for (; this.index < l; this.index++) {
      char = this.text.charAt(this.index)
      this.EOF = l - 1 === this.index
      this.state(char, prev)
      prev = char
    }
  }

  processNameStart(char: string) {
    if (char === '{' || char === '[') {
      this.state = this.processDestructStart
      this.index--
    } else if (!whitespace(char)) {
      this.declareNameStart = this.index
      this.state = this.processName
    }
  }

  processName(char: string, prev: string) {
    if (whitespace(char)) {
      this.declareNameEnd = this.index
      this.handlers.name(this.getName())
    } else if (this.EOF) {
      this.declareNameEnd = this.index + 1
      this.handlers.name(this.getName())
    }
  }

  processDestructStart(char) {
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

  processDestructKey(char: string, prev: string) {
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

  getName() {
    return this.text.substring(this.declareNameStart, this.declareNameEnd)
  }
}


const parseDestruct = (string: string | number) => {
  if (!isStr(string)) return string

  let destruct: Destruct
  let stack = []
  let token = ''
  let realKey = ''
  let lastDestruct: Destruct
  let root: Destruct

  new DestructTokenizer(string as string, {
    name(key: string) {
      root = key
    },
    destructKey(key, readyReplace) {
      if (!key) return
      token = key
      if (readyReplace) {
        realKey = key
        lastDestruct = destruct
        return
      }
      if (isArr(destruct)) {
        (destruct as Array<string>).push(key)
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

const traverse = (obj: any, callback: TraverseCallback) => {
  const _traverse = (obj: any, path: string[], callback: TraverseCallback) => {
    if (isStr(obj)) return callback(obj, obj)
    each(obj, (item: any, key: string) => {
      const _path = path.concat(key)
      if (isArr(item) || isPlainObj(item)) {
        _traverse(item, _path, callback)
      } else {
        callback(_path, item)
      }
    })
  }

  return _traverse(obj, [], callback)
}

const mapReduce = (obj: any, callback: TraverseCallback) => {
  const _traverse = (obj: any, path: string[], callback: TraverseCallback) => {
    return map(obj, (item: any, key: string) => {
      const _path = path.concat(key)
      if (isArr(item) || isPlainObj(item)) {
        return _traverse(item, _path, callback)
      } else {
        return callback(_path, _path.slice(0, _path.length - 1).concat(item))
      }
    })
  }

  return _traverse(obj, [], callback)
}

const parseDesturctPath = (path: Path): any => {
  const _path = getPathSegments(path)
  const lastKey = _path[_path.length - 1]
  const startPath = _path.slice(0, _path.length - 1)
  const destruct = parseDestruct(lastKey)
  return {
    path: _path,
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
    traverse(parsed.destruct, (path, key) => {
      result.push({
        path: parsed.startPath.concat(path),
        startPath: parsed.startPath,
        endPath: path,
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
    if (!(ast = cache.get(path))) {
      ast = parseDesturctPath(path)
      cache.set(path, ast)
    }
    if (!isArr(ast.destruct) && !isPlainObj(ast.destruct)) {
      return get(obj, path, value)
    }
    return mapReduce(ast.destruct, (path, key) => {
      return get(obj, ast.startPath.concat(key))
    })
  }
}

const resolveUpdateIn = (update: Setter, getIn: Getter) => {
  const cache = new Map()
  return (obj: any, path: Path, value: any) => {
    let paths = []
    if (!(paths = cache.get(path))) {
      paths = parsePaths(path)
      cache.set(path, paths)
    }
    if (!isArr(paths)) return update(obj, path, value)
    if (paths && paths.length) {
      each(paths, ({ path, key, startPath, endPath }) => {
        update(obj, startPath.concat(key), getIn(value, endPath))
      })
    }
    return obj
  }
}

const resolveExistIn = (has: HasIn) => {
  const cache = new Map()
  return (obj: any, path: Path) => {
    let paths = []
    if (!(paths = cache.get(path))) {
      paths = parsePaths(path)
      cache.set(path, paths)
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

function _setIn(obj: any, path: Path, value: any) {
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
      obj[p] = {}
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
        obj.splice(p, 1)
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
