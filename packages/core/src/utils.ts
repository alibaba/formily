import { Path, IFormPathMatcher } from '@uform/types'
import {
  isArr,
  isStr,
  getPathSegments,
  isEqual,
  toArr,
  clone,
  isFn,
  globalThisPolyfill
} from '@uform/utils'

export * from '@uform/utils'

const self = globalThisPolyfill

const compactScheduler = ([raf, caf, priority], fresh: boolean) => {
  return [fresh ? callback => raf(priority, callback) : raf, caf]
}

const getScheduler = () => {
  if (!self.requestAnimationFrame) {
    return [self.setTimeout, self.clearTimeout]
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const scheduler = require('scheduler') as any
    return compactScheduler(
      [
        scheduler.scheduleCallback || scheduler.unstable_scheduleCallback,
        scheduler.cancelCallback || scheduler.unstable_cancelCallback,
        scheduler.NormalPriority || scheduler.unstable_NormalPriority
      ],
      !!scheduler.unstable_requestPaint
    )
  } catch (err) {
    return [self.requestAnimationFrame, self.cancelAnimationFrame]
  }
}

export const [raf, caf] = getScheduler()

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
  const {
    values,
    valid,
    invalid,
    initialValues,
    errors,
    pristine,
    dirty
  } = state
  return {
    values: clone(values),
    valid,
    invalid,
    errors,
    pristine,
    dirty,
    initialValues: clone(initialValues)
  }
}

export const publishFieldState = state => {
  const {
    value,
    valid,
    invalid,
    errors,
    visible,
    display,
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
    display,
    loading,
    errors: errors.concat(effectErrors),
    pristine,
    initialValue: clone(initialValue),
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
      if (!item.values.some(callback => isEqual(callback, value))) {
        item.values.push(value)
      }
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
