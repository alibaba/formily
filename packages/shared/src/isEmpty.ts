import { instOf } from './instanceof'
const has = Object.prototype.hasOwnProperty

const toString = Object.prototype.toString

export const isUndef = (val: any) => val === undefined

export const isValid = (val: any) => val !== undefined && val !== null

export function isEmpty(val: any, strict = false): boolean {
  // Null and Undefined...
  if (val == null) {
    return true
  }

  // Booleans...
  if (typeof val === 'boolean') {
    return false
  }

  // Numbers...
  if (typeof val === 'number') {
    return false
  }

  // Strings...
  if (typeof val === 'string') {
    return val.length === 0
  }

  // Functions...
  if (typeof val === 'function') {
    return val.length === 0
  }

  // Arrays...
  if (Array.isArray(val)) {
    if (val.length === 0) {
      return true
    }
    for (let i = 0; i < val.length; i++) {
      if (strict) {
        if (val[i] !== undefined && val[i] !== null) {
          return false
        }
      } else {
        if (
          val[i] !== undefined &&
          val[i] !== null &&
          val[i] !== '' &&
          val[i] !== 0
        ) {
          return false
        }
      }
    }
    return true
  }

  // Errors...
  if (instOf(val, 'Error')) {
    return val.message === ''
  }

  // Objects...
  if (val.toString === toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0
      }

      // Plain objects...
      case '[object Object]': {
        for (const key in val) {
          if (has.call(val, key)) {
            return false
          }
        }

        return true
      }
    }
  }

  // Anything else...
  return false
}
