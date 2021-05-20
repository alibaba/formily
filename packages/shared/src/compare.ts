import { isArr } from './checkers'
import { instOf } from './instanceof'
const isArray = isArr
const keyList = Object.keys
const hasProp = Object.prototype.hasOwnProperty

/* eslint-disable */
function equal(a: any, b: any) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) {
    return true
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const arrA = isArray(a)
    const arrB = isArray(b)
    let i: number
    let length: number
    let key: string | number

    if (arrA && arrB) {
      length = a.length
      if (length !== b.length) {
        return false
      }
      for (i = length; i-- !== 0; ) {
        if (!equal(a[i], b[i])) {
          return false
        }
      }
      return true
    }

    if (arrA !== arrB) {
      return false
    }
    const momentA = a && a._isAMomentObject
    const momentB = b && b._isAMomentObject
    if (momentA !== momentB) return false
    if (momentA && momentB) return a.isSame(b)
    const immutableA = a && a.toJS
    const immutableB = b && b.toJS
    if (immutableA !== immutableB) return false
    if (immutableA) return a.is ? a.is(b) : a === b
    const dateA = instOf(a, 'Date')
    const dateB = instOf(b, 'Date')
    if (dateA !== dateB) {
      return false
    }
    if (dateA && dateB) {
      return a.getTime() === b.getTime()
    }
    const regexpA = instOf(a, 'RegExp')
    const regexpB = instOf(b, 'RegExp')
    if (regexpA !== regexpB) {
      return false
    }
    if (regexpA && regexpB) {
      return a.toString() === b.toString()
    }
    const urlA = instOf(a, 'URL')
    const urlB = instOf(b, 'URL')

    if (urlA !== urlB) {
      return false
    }

    if (urlA && urlB) {
      return a.href === b.href
    }

    const schemaA = a && a.toJSON
    const schemaB = b && b.toJSON
    if (schemaA !== schemaB) return false
    if (schemaA && schemaB) return equal(a.toJSON(), b.toJSON())

    const keys = keyList(a)
    length = keys.length

    if (length !== keyList(b).length) {
      return false
    }

    for (i = length; i-- !== 0; ) {
      if (!hasProp.call(b, keys[i])) {
        return false
      }
    }
    // end fast-deep-equal

    // Custom handling for React
    for (i = length; i-- !== 0; ) {
      key = keys[i]

      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) {
          return false
        }
      }
    }

    // fast-deep-equal index.js 2.0.1
    return true
  }

  return a !== a && b !== b
}
// end fast-deep-equal

export const isEqual = function exportedEqual(a: any, b: any) {
  try {
    return equal(a, b)
  } catch (error) {
    /* istanbul ignore next */ 
    if (
      (error.message && error.message.match(/stack|recursion/i)) ||
      error.number === -2146828260
    ) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn(
        'Warning: react-fast-compare does not handle circular references.',
        error.name,
        error.message
      )
      return false
    }
    // some other error. we should definitely know about these
    /* istanbul ignore next */ 
    throw error
  }
}
