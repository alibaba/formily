import { isFn, isPlainObj } from './types'

export const shallowClone = (values: any) => {
  if (Array.isArray(values)) {
    return values.slice(0)
  } else if (isPlainObj(values)) {
    return {
      ...values,
    }
  } else if (typeof values === 'object') {
    return values
  }
}

export const clone = (values: any) => {
  if (Array.isArray(values)) {
    const res = []
    values.forEach((item)=>{
      res.push(clone(item))
    })
    return res
  } else if (isPlainObj(values)) {
    if ('$$typeof' in values && '_owner' in values) {
      return values
    }
    if (values['_isAMomentObject']) {
      return values
    }
    if (values['_isJSONSchemaObject']) {
      return values
    }
    if (isFn(values['toJS'])) {
      return values['toJS']()
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
