/**
 * copyright by https://github.com/ianstormtaylor/is-empty
 */

/**
 * Has own property.
 *
 * @type {Function}
 */

var has = Object.prototype.hasOwnProperty

/**
 * To string.
 *
 * @type {Function}
 */

var toString = Object.prototype.toString

/**
 * Test whether a value is "empty".
 *
 * @param {Mixed} val
 * @return {Boolean}
 */

export function isEmpty(val) {
  // Null and Undefined...
  if (val == null) return true

  // Booleans...
  if (typeof val === 'boolean') return false

  // Numbers...
  if (typeof val === 'number') return false

  // Strings...
  if (typeof val === 'string') return val.length === 0

  // Functions...
  if (typeof val === 'function') return val.length === 0

  // Arrays...
  if (Array.isArray(val)) {
    if (val.length === 0) return true
    for (let i = 0; i < val.length; i++) {
      if (!isEmpty(val[i])) {
        return false
      }
    }
    return true
  }

  // Errors...
  if (val instanceof Error) return val.message === ''

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
        for (var key in val) {
          if (has.call(val, key)) return false
        }

        return true
      }
    }
  }

  // Anything else...
  return false
}
