export const toArray = (value: any) => {
  return Array.isArray(value)
    ? value
    : value !== undefined && value !== null
    ? [value]
    : []
}

export class ArraySet<T> {
  value: T[]
  forEachIndex = 0
  constructor(value: T[] = []) {
    this.value = value
  }

  add(item: T) {
    if (!this.has(item)) {
      this.value.push(item)
    }
  }

  has(item: T) {
    return this.value.indexOf(item) > -1
  }

  delete(item: T) {
    const len = this.value.length
    if (len === 0) return
    if (len === 1 && this.value[0] === item) {
      this.value = []
      return
    }
    const findIndex = this.value.indexOf(item)
    if (findIndex > -1) {
      this.value.splice(findIndex, 1)
      if (findIndex <= this.forEachIndex) {
        this.forEachIndex -= 1
      }
    }
  }

  forEach(callback: (value: T) => void) {
    if (this.value.length === 0) return
    this.forEachIndex = 0
    for (; this.forEachIndex < this.value.length; this.forEachIndex++) {
      callback(this.value[this.forEachIndex])
    }
  }

  batchDelete(callback: (value: T) => void) {
    if (this.value.length === 0) return
    this.forEachIndex = 0
    for (; this.forEachIndex < this.value.length; this.forEachIndex++) {
      const value = this.value[this.forEachIndex]
      this.value.splice(this.forEachIndex, 1)
      this.forEachIndex--
      callback(value)
    }
  }

  clear() {
    this.value.length = 0
  }
}
