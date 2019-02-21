import {
  each,
  reduce,
  isFn,
  toArr,
  getIn,
  isArr,
  isEqual,
  clone,
  format
} from './utils'
import { validate } from './validators'
export * from './message'

const flatArr = arr => {
  return reduce(
    arr,
    (buf, item) => {
      return isArr(item)
        ? buf.concat(flatArr(item))
        : item
          ? buf.concat(item)
          : buf
    },
    []
  )
}

export { format }

export const runValidation = (values, fieldMap, forceUpdate, callback) => {
  const queue = []
  if (isFn(forceUpdate)) {
    callback = forceUpdate
    forceUpdate = false
  }
  each(fieldMap, (field, name) => {
    const value = getIn(values, name)
    if (field.visible === false || field.editable === false) return
    if (isEqual(field.__lastValidateValue, value) && !forceUpdate) return
    const title = field.props && field.props.title
    let rafId = setTimeout(() => {
      field.loading = true
      field.dirty = true
      if (field.notify) field.notify()
    }, 100)
    queue.push(
      Promise.all(
        toArr(field.rules).map(rule => {
          return validate(value, rule, values, title || name)
        })
      ).then(errors => {
        clearTimeout(rafId)
        let lastFieldErrors = field.errors
        const lastValid = field.valid
        const lastLoading = field.loading
        field.loading = false
        if (forceUpdate) {
          if (errors) field.errors = flatArr(toArr(errors))
          if (field.errors.length) {
            field.valid = false
            field.invalid = true
          } else {
            field.valid = true
            field.invalid = false
          }
          if (field.errors && field.errors.length) {
            field.dirty = true
          }
        } else {
          if (!field.pristine) {
            if (errors) field.errors = flatArr(toArr(errors))
            if (field.errors.length) {
              field.valid = false
              field.invalid = true
            } else {
              field.valid = true
              field.invalid = false
            }
            if (
              !isEqual(lastValid, field.valid) ||
              !isEqual(lastFieldErrors, field.errors)
            ) {
              field.dirty = true
            }
          }
        }

        if (field.loading !== lastLoading) {
          field.dirty = true
        }

        if (field.dirty && field.notify) {
          field.notify()
        }
        field.__lastValidateValue = clone(value)
        return {
          name,
          value,
          field,
          invalid: field.invalid,
          valid: field.valid,
          errors: field.errors
        }
      })
    )
  })

  return Promise.all(queue).then(response => {
    if (isFn(callback)) {
      callback(response)
    }
    return response
  })
}

export default runValidation
