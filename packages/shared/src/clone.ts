import { isFn, isPlainObj } from './checkers'

export const shallowClone = (values: any) => {
  if (Array.isArray(values)) {
    return values.slice(0)
  } else if (isPlainObj(values)) {
    if ('$$typeof' in values && '_owner' in values) {
      return values
    }
    if (values['_isBigNumber']) {
      return values
    }
    if (values['_isAMomentObject']) {
      return values
    }

    // >= dayjs@1.11.10 has `$isDayjsObject` check logic
    // following the `moment` convention, return the original object directly
    if (values['$isDayjsObject']) {
      return values
    }
    if (values['_isJSONSchemaObject']) {
      return values
    }
    if (isFn(values['toJS'])) {
      return values
    }
    // < dayjs@1.11.10 has `clone` method, directly return a new object from `clone`, which won't cause logic issues.
    // This check needs to be done before `toJSON` to avoid executing dayjs's `toJSON` method, which could cause type errors
    // This logic check also applies to other similar objects, because the current method expects the return value to be the same as the input
    if (isFn(values['clone'])) {
      return values['clone']()
    }
    if (isFn(values['toJSON'])) {
      return values
    }
    return {
      ...values,
    }
  } else if (typeof values === 'object') {
    return new values.constructor(values)
  }
  return values
}

export const clone = (values: any) => {
  if (Array.isArray(values)) {
    const res = []
    values.forEach((item) => {
      res.push(clone(item))
    })
    return res
  } else if (isPlainObj(values)) {
    if ('$$typeof' in values && '_owner' in values) {
      return values
    }
    if (values['_isBigNumber']) {
      return values
    }
    if (values['_isAMomentObject']) {
      return values
    }

    if (values['$isDayjsObject']) {
      return values
    }

    if (values['_isJSONSchemaObject']) {
      return values
    }
    if (isFn(values['toJS'])) {
      return values['toJS']()
    }
    if (isFn(values['clone'])) {
      return values['clone']()
    }
    if (isFn(values['toJSON'])) {
      return values['toJSON']()
    }
    const res = {}
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        res[key] = clone(values[key])
      }
    }
    return res
  } else {
    return values
  }
}
