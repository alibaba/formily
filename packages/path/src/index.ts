import { Parser } from './parser'
import {
  isStr,
  isArr,
  isFn,
  isEqual,
  isObj,
  isNum,
  isRegExp,
  isPlainObj,
  isAssignable,
} from './shared'
import {
  getDestructor,
  getInByDestructor,
  setInByDestructor,
  deleteInByDestructor,
  existInByDestructor,
} from './destructor'
import { Segments, Node, Pattern, IRegistry, IAccessors } from './types'
export * from './types'
import { LRUMap } from './lru'
import { Matcher } from './matcher'

const REGISTRY: IRegistry = {
  accessors: {
    get(source: any, key: number | string | symbol) {
      if (isAssignable(source)) {
        return Reflect.get(source, key)
      }
    },
    set(source: any, key: number | string | symbol, value: any) {
      if (isAssignable(source)) {
        return Reflect.set(source, key, value)
      }
    },
    has(source: any, key: number | string | symbol) {
      if (isAssignable(source)) {
        return Reflect.has(source, key)
      }
      return false
    },
    delete(source: any, key: number | string | symbol) {
      if (isAssignable(source)) {
        if (Array.isArray(source) && isNumberIndex(key)) {
          source.splice(Number(key), 1)
          return true
        }
        return Reflect.deleteProperty(source, key)
      }
    },
  },
}

const pathCache = new LRUMap(1000)

const isMatcher = Symbol('PATH_MATCHER')

const isValid = (val: any) => val !== undefined && val !== null

const isNumberIndex = (val: any) =>
  isStr(val) ? /^\d+$/.test(val) : isNum(val)

const arrayExist = (obj: any, key: string | number) => {
  if (Array.isArray(obj)) {
    const index = Number(key)
    if (index < 0 || index > obj.length - 1) return false
  }
  return true
}

const getIn = (segments: Segments, source: any) => {
  for (let i = 0; i < segments.length; i++) {
    const index = segments[i]
    const rules = getDestructor(index as string)
    if (!rules) {
      if (!isValid(source)) {
        if (i !== segments.length - 1) {
          return source
        }
        break
      }
      if (arrayExist(source, index)) {
        source = REGISTRY.accessors.get(source, index)
      } else {
        return
      }
    } else {
      source = getInByDestructor(source, rules, { setIn, getIn })
      break
    }
  }
  return source
}

const setIn = (segments: Segments, source: any, value: any) => {
  for (let i = 0; i < segments.length; i++) {
    const index = segments[i]
    const rules = getDestructor(index as string)
    if (!rules) {
      if (!isValid(source)) return
      if (isArr(source) && !isNumberIndex(index)) {
        return
      }
      if (!arrayExist(source, index)) {
        if (!isValid(value)) {
          return
        }
        if (i < segments.length - 1) {
          REGISTRY.accessors.set(
            source,
            index,
            isNum(segments[i + 1]) ? [] : {}
          )
        }
      } else if (!isValid(source[index])) {
        if (!isValid(value)) {
          return
        }
        if (i < segments.length - 1) {
          REGISTRY.accessors.set(
            source,
            index,
            isNum(segments[i + 1]) ? [] : {}
          )
        }
      }
      if (i === segments.length - 1) {
        REGISTRY.accessors.set(source, index, value)
      }
      if (arrayExist(source, index)) {
        source = REGISTRY.accessors.get(source, index)
      }
    } else {
      setInByDestructor(source, rules, value, { setIn, getIn })
      break
    }
  }
}

const deleteIn = (segments: Segments, source: any) => {
  for (let i = 0; i < segments.length; i++) {
    const index = segments[i]
    const rules = getDestructor(index as string)
    if (!rules) {
      if (i === segments.length - 1 && isValid(source)) {
        REGISTRY.accessors.delete(source, index)
        return
      }

      if (!isValid(source)) return
      if (arrayExist(source, index)) {
        source = REGISTRY.accessors.get(source, index)
      } else {
        return
      }

      if (!isObj(source)) {
        return
      }
    } else {
      deleteInByDestructor(source, rules, {
        setIn,
        getIn,
        deleteIn,
      })
      break
    }
  }
}

const existIn = (segments: Segments, source: any, start: number | Path) => {
  if (start instanceof Path) {
    start = start.length
  }
  for (let i = start; i < segments.length; i++) {
    const index = segments[i]
    const rules = getDestructor(index as string)
    if (!rules) {
      if (i === segments.length - 1) {
        return REGISTRY.accessors.has(source, index)
      }

      if (!isValid(source)) return false
      if (arrayExist(source, index)) {
        source = REGISTRY.accessors.get(source, index)
      } else {
        return false
      }

      if (!isObj(source)) {
        return false
      }
    } else {
      return existInByDestructor(source, rules, start, {
        setIn,
        getIn,
        deleteIn,
        existIn,
      })
    }
  }
}

const parse = (pattern: Pattern, base?: Pattern) => {
  if (pattern instanceof Path) {
    return {
      entire: pattern.entire,
      segments: pattern.segments.slice(),
      isRegExp: false,
      isWildMatchPattern: pattern.isWildMatchPattern,
      isMatchPattern: pattern.isMatchPattern,
      haveExcludePattern: pattern.haveExcludePattern,
      tree: pattern.tree,
    }
  } else if (isStr(pattern)) {
    if (!pattern)
      return {
        entire: '',
        segments: [],
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      }
    const parser = new Parser(pattern, Path.parse(base))
    const tree = parser.parse()
    if (!parser.isMatchPattern) {
      const segments = parser.data.segments
      return {
        entire: segments.join('.'),
        segments,
        tree,
        isRegExp: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      }
    } else {
      return {
        entire: pattern,
        segments: [],
        isRegExp: false,
        isWildMatchPattern: parser.isWildMatchPattern,
        haveExcludePattern: parser.haveExcludePattern,
        isMatchPattern: true,
        tree,
      }
    }
  } else if (isFn(pattern) && pattern[isMatcher]) {
    return parse(pattern['path'])
  } else if (isArr(pattern)) {
    return {
      entire: pattern.join('.'),
      segments: pattern.reduce((buf, key) => {
        return buf.concat(parseString(key))
      }, []),
      isRegExp: false,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false,
    }
  } else if (isRegExp(pattern)) {
    return {
      entire: pattern,
      segments: [],
      isRegExp: true,
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: true,
    }
  } else {
    return {
      entire: '',
      isRegExp: false,
      segments: pattern !== undefined ? [pattern] : [],
      isWildMatchPattern: false,
      haveExcludePattern: false,
      isMatchPattern: false,
    }
  }
}

const parseString = (source: any) => {
  if (isStr(source)) {
    source = source.replace(/\s*/g, '')
    try {
      const { segments, isMatchPattern } = parse(source)
      return !isMatchPattern ? segments : source
    } catch (e) {
      return source
    }
  } else if (source instanceof Path) {
    return source.segments
  }
  return source
}

export class Path {
  public entire: string | RegExp
  public segments: Segments
  public isMatchPattern: boolean
  public isWildMatchPattern: boolean
  public isRegExp: boolean
  public haveExcludePattern: boolean
  public matchScore: number
  public tree: Node
  private matchCache: any
  private includesCache: any

  constructor(input: Pattern, base?: Pattern) {
    const {
      tree,
      segments,
      entire,
      isRegExp,
      isMatchPattern,
      isWildMatchPattern,
      haveExcludePattern,
    } = parse(input, base)
    this.entire = entire
    this.segments = segments
    this.isMatchPattern = isMatchPattern
    this.isWildMatchPattern = isWildMatchPattern
    this.isRegExp = isRegExp
    this.haveExcludePattern = haveExcludePattern
    this.tree = tree as Node
    this.matchCache = new LRUMap(200)
    this.includesCache = new LRUMap(200)
  }

  toString() {
    return this.entire?.toString()
  }

  toArr() {
    return this.segments?.slice()
  }

  get length() {
    return this.segments.length
  }

  concat = (...args: Pattern[]) => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be concat`)
    }
    const path = new Path('')
    path.segments = this.segments.concat(...args.map((s) => parseString(s)))
    path.entire = path.segments.join('.')
    return path
  }

  slice = (start?: number, end?: number) => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be slice`)
    }
    const path = new Path('')
    path.segments = this.segments.slice(start, end)
    path.entire = path.segments.join('.')
    return path
  }

  push = (...items: Pattern[]) => {
    return this.concat(...items)
  }

  pop = () => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be pop`)
    }
    return new Path(this.segments.slice(0, this.segments.length - 1))
  }

  splice = (
    start: number,
    deleteCount?: number,
    ...items: Array<string | number>
  ) => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be splice`)
    }
    items = items.reduce((buf, item) => buf.concat(parseString(item)), [])
    const segments_ = this.segments.slice()
    segments_.splice(start, deleteCount, ...items)
    return new Path(segments_)
  }

  forEach = (callback: (key: string | number) => any) => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be each`)
    }
    this.segments.forEach(callback)
  }

  map = (callback: (key: string | number) => any) => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be map`)
    }
    return this.segments.map(callback)
  }

  reduce = <T>(
    callback: (buf: T, item: string | number, index: number) => T,
    initial: T
  ): T => {
    if (this.isMatchPattern || this.isRegExp) {
      throw new Error(`${this.entire} cannot be reduce`)
    }
    return this.segments.reduce(callback, initial)
  }

  parent = () => {
    return this.slice(0, this.length - 1)
  }

  includes = (pattern: Pattern) => {
    const { entire, segments, isMatchPattern } = Path.parse(pattern)
    const cache = this.includesCache.get(entire)
    if (cache !== undefined) return cache
    const cacheWith = (value: boolean): boolean => {
      this.includesCache.set(entire, value)
      return value
    }
    if (this.isMatchPattern) {
      if (!isMatchPattern) {
        return cacheWith(this.match(segments))
      } else {
        throw new Error(`${this.entire} cannot be used to match ${entire}`)
      }
    }
    if (isMatchPattern) {
      throw new Error(`${this.entire} cannot be used to match ${entire}`)
    }
    if (segments.length > this.segments.length) return cacheWith(false)
    for (let i = 0; i < segments.length; i++) {
      if (!isEqual(String(segments[i]), String(this.segments[i]))) {
        return cacheWith(false)
      }
    }
    return cacheWith(true)
  }

  transform = <T>(
    regexp: string | RegExp,
    callback: (...args: string[]) => T
  ): T | string => {
    if (!isFn(callback)) return ''
    if (this.isMatchPattern) {
      throw new Error(`${this.entire} cannot be transformed`)
    }
    const args = this.segments.reduce((buf, key) => {
      return new RegExp(regexp).test(key as string) ? buf.concat(key) : buf
    }, [])
    return callback(...args)
  }

  match = (pattern: Pattern): boolean => {
    const path = Path.parse(pattern)
    const cache = this.matchCache.get(path.entire)
    if (cache !== undefined) {
      if (cache.record && cache.record.score !== undefined) {
        this.matchScore = cache.record.score
      }
      return cache.matched
    }
    const cacheWith = (value: any) => {
      this.matchCache.set(path.entire, value)
      return value
    }
    if (path.isMatchPattern) {
      if (this.isMatchPattern) {
        throw new Error(`${path.entire} cannot match ${this.entire}`)
      } else {
        this.matchScore = 0
        return cacheWith(path.match(this.segments))
      }
    } else {
      if (this.isMatchPattern) {
        if (this.isRegExp) {
          try {
            return this['entire']?.['test']?.(path.entire)
          } finally {
            ;(this.entire as RegExp).lastIndex = 0
          }
        }
        const record = {
          score: 0,
        }
        const result = cacheWith(
          new Matcher(this.tree, record).match(path.segments)
        )
        this.matchScore = record.score
        return result.matched
      } else {
        const record = {
          score: 0,
        }
        const result = cacheWith(
          Matcher.matchSegments(this.segments, path.segments, record)
        )
        this.matchScore = record.score
        return result.matched
      }
    }
  }

  //别名组匹配
  matchAliasGroup = (name: Pattern, alias: Pattern) => {
    const namePath = Path.parse(name)
    const aliasPath = Path.parse(alias)
    const nameMatched = this.match(namePath)
    const nameMatchedScore = this.matchScore
    const aliasMatched = this.match(aliasPath)
    const aliasMatchedScore = this.matchScore
    if (this.haveExcludePattern) {
      if (nameMatchedScore >= aliasMatchedScore) {
        return nameMatched
      } else {
        return aliasMatched
      }
    } else {
      return nameMatched || aliasMatched
    }
  }

  existIn = (source?: any, start: number | Path = 0) => {
    return existIn(this.segments, source, start)
  }

  getIn = (source?: any) => {
    return getIn(this.segments, source)
  }

  setIn = (source?: any, value?: any) => {
    setIn(this.segments, source, value)
    return source
  }

  deleteIn = (source?: any) => {
    deleteIn(this.segments, source)
    return source
  }

  ensureIn = (source?: any, defaults?: any) => {
    const results = this.getIn(source)
    if (results === undefined) {
      this.setIn(source, defaults)
      return this.getIn(source)
    }
    return results
  }

  static match(pattern: Pattern) {
    const path = Path.parse(pattern)
    const matcher = (target) => {
      return path.match(target)
    }
    matcher[isMatcher] = true
    matcher.path = path
    return matcher
  }

  static transform<T>(
    pattern: Pattern,
    regexp: string | RegExp,
    callback: (...args: string[]) => T
  ): any {
    return Path.parse(pattern).transform(regexp, callback)
  }

  static parse(path: Pattern = '', base?: Pattern): Path {
    if (path instanceof Path) {
      const found = pathCache.get(path.entire)
      if (found) {
        return found
      } else {
        pathCache.set(path.entire, path)
        return path
      }
    } else if (path && path[isMatcher]) {
      return Path.parse(path['path'])
    } else {
      const key_ = base ? Path.parse(base) : ''
      const key = `${path}:${key_}`
      const found = pathCache.get(key)
      if (found) {
        return found
      } else {
        path = new Path(path, base)
        pathCache.set(key, path)
        return path
      }
    }
  }

  static getIn = (source: any, pattern: Pattern) => {
    const path = Path.parse(pattern)
    return path.getIn(source)
  }

  static setIn = (source: any, pattern: Pattern, value: any) => {
    const path = Path.parse(pattern)
    return path.setIn(source, value)
  }

  static deleteIn = (source: any, pattern: Pattern) => {
    const path = Path.parse(pattern)
    return path.deleteIn(source)
  }

  static existIn = (source: any, pattern: Pattern, start?: number | Path) => {
    const path = Path.parse(pattern)
    return path.existIn(source, start)
  }

  static ensureIn = (source: any, pattern: Pattern, defaultValue?: any) => {
    const path = Path.parse(pattern)
    return path.ensureIn(source, defaultValue)
  }

  static registerAccessors = (accessors: IAccessors) => {
    if (isPlainObj(accessors)) {
      for (const name in accessors) {
        if (isFn(accessors[name])) {
          REGISTRY.accessors[name] = accessors[name]
        }
      }
    }
  }
}

export default Path
