export const toArray = (value: any) => {
  return Array.isArray(value)
    ? value
    : value !== undefined && value !== null
    ? [value]
    : []
}

export class ArraySet<T> {
  value: T[]
  batchDeleting = false
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
    if (this.batchDeleting) return //批量删除时禁止单独删除，会影响计数执行器
    const index = this.value.indexOf(item)
    if (index > -1) {
      this.value.splice(index, 1)
    }
  }

  forEach(callback: (value: T) => void) {
    if (this.value.length === 0) return
    for (let index = 0, len = this.value.length; index < len; index++) {
      callback(this.value[index])
    }
  }

  forEachDelete(callback: (value: T) => void) {
    if (this.value.length === 0) return
    this.batchDeleting = true
    for (let index = 0; index < this.value.length; index++) {
      const item = this.value[index]
      this.value.splice(index, 1)
      callback(item)
      index--
    }
    this.batchDeleting = false
  }

  clear() {
    this.value.length = 0
  }
}
