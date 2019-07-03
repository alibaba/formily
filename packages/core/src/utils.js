import { isArr, isStr, getPathSegments, toArr, clone, isFn } from '@uform/utils'
export * from '@uform/utils'

const self = this || global || window

const getScheduler = () => {
  if (!self.requestAnimationFrame) {
    return [ self.setTimeout, self.clearTimeout ]
  }
  try {
    const scheduler = require('scheduler')
    return [
      scheduler.scheduleCallback || scheduler.unstable_scheduleCallback,
      scheduler.cancelCallback || scheduler.unstable_cancelCallback
    ]
  } catch (err) {
    return [ self.requestAnimationFrame, self.cancelAnimationFrame ]
  }
}

export const [ raf, caf ] = getScheduler()

export const resolveFieldPath = path => {
  if (!isArr(path)) {
    return isStr(path) ? resolveFieldPath(getPathSegments(path)) : undefined
  }
  return path.reduce((buf, key) => {
    return buf.concat(getPathSegments(key))
  }, [])
}

export const isChildField = (field, parent) => {
  if (field && parent && field.path && parent.path) {
    for (let i = 0; i < parent.path.length; i++) {
      if (field.path[i] !== parent.path[i]) {
        return false
      }
    }
    return parent.path.length < field.path.length
  }
  return false
}

export const hasRequired = rules => {
  return toArr(rules).some(rule => {
    return rule && rule.required
  })
}

export const publishFormState = state => {
  const { values, valid, invalid, errors, pristine, dirty } = state
  return {
    values,
    valid,
    invalid,
    errors,
    pristine,
    dirty
  }
}

export const publishFieldState = state => {
  const {
    value,
    valid,
    invalid,
    errors,
    visible,
    editable,
    initialValue,
    name,
    path,
    props,
    effectErrors,
    loading,
    pristine,
    required,
    rules
  } = state
  return {
    value: clone(value),
    valid,
    invalid,
    editable,
    visible,
    loading,
    errors: errors.concat(effectErrors),
    pristine,
    initialValue,
    name,
    path,
    props,
    required,
    rules
  }
}

export class BufferList {
  data = []
  indexes = {}
  push(key, value, extra) {
    if (!this.indexes[key]) {
      let index = this.data.length
      this.data.push({ ...extra, key, values: [value] })
      this.indexes[key] = index
    } else {
      let item = this.data[this.indexes[key]]
      if (item.values.indexOf(value) === -1) item.values.push(value)
    }
  }

  forEach(callback) {
    for (let i = 0; i < this.data.length; i++) {
      if (isFn(callback)) {
        callback(this.data[i], this.data[i].key)
      }
    }
  }

  remove(key, value) {
    this.data = this.data.reduce((buf, item, index) => {
      if (item.key === key) {
        delete this.indexes[key]
        return buf
      } else {
        this.indexes[key] = buf.length
        return buf.concat(item)
      }
    }, [])
  }
}
