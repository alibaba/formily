/* eslint-disable camelcase */
import {
  unstable_scheduleCallback,
  scheduleCallback,
  unstable_cancelCallback,
  cancelCallback
} from 'scheduler'
/* eslint-disable camelcase */

import { isArr, isStr, getPathSegments, toArr, clone } from '@uform/utils'
export * from '@uform/utils'

const self = this || global || window

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
