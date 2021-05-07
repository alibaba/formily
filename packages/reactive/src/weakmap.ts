const globalId = { value: 0 }

const scopeName = '@@ReactiveScope@@'

const isObject = (value: any) => value instanceof Object

const defineProperty = Object.defineProperty

export class FastWeakMap<K extends object, V = any> {
  id = globalId.value++

  get(key: K): V {
    if (!isObject(key)) return
    if (key[scopeName]) {
      return key[scopeName][this.id]
    }
  }

  set(key: K, value: V) {
    if (!isObject(key)) return
    if (!key[scopeName]) {
      defineProperty(key, scopeName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: {},
      })
    }
    key[scopeName][this.id] = value
  }

  has(key: K) {
    if (!isObject(key)) return false
    if (key[scopeName]) {
      return this.id in key[scopeName]
    }
    return false
  }

  delete(key: K) {
    if (!isObject(key)) return false
    if (this.has(key)) {
      delete key[scopeName][this.id]
    }
  }
}
