/* eslint-disable camelcase */
import {
  unstable_scheduleCallback,
  scheduleCallback,
  unstable_cancelCallback,
  cancelCallback
} from 'scheduler'
import { Path, IFormPathMatcher } from '@uform/types'
/* eslint-disable camelcase */

import { isArr, isStr, getPathSegments, toArr, clone, isFn } from '@uform/utils'
export * from '@uform/utils'

const self = window

export const raf =
  (self.requestAnimationFrame &&
    (scheduleCallback ||
      unstable_scheduleCallback ||
      self.requestAnimationFrame)) ||
  self.setTimeout

export const caf =
  (self.requestAnimationFrame &&
    (cancelCallback || unstable_cancelCallback || self.cancelAnimationFrame)) ||
  self.clearTimeout

export const resolveFieldPath = (path: Path | IFormPathMatcher): string[] => {
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
  const { values, valid, invalid, initialValues, errors, pristine, dirty } = state
  return {
    values,
    valid,
    invalid,
    errors,
    pristine,
    dirty,
    initialValues
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
  public data = []
  public indexes = {}
  public push(key: string, value: any, extra: any) {
    if (!this.indexes[key]) {
      const index = this.data.length
      this.data.push({ ...extra, key, values: [value] })
      this.indexes[key] = index
    } else {
      const item = this.data[this.indexes[key]]
      if (item.values.indexOf(value) === -1) { item.values.push(value) }
    }
  }

  public forEach(callback) {
    for (let i = 0; i < this.data.length; i++) {
      if (isFn(callback)) {
        callback(this.data[i], this.data[i].key)
      }
    }
  }

  public remove(key: string, value?: any) {
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
