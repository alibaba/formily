import { isFn } from './types'

const BIG_DATA_FLAG = Symbol('__BIG_DATA__')

type BigDataOptions = {
  compare?: (prev: any, current: any, key: string) => boolean
  clone?: (value: any) => any
}

export class BigData {
  private options: BigDataOptions

  constructor(options?: BigDataOptions) {
    this.options = {
      ...options
    }
  }

  create(data: any) {
    if (data !== undefined) {
      if (!data[BIG_DATA_FLAG]) {
        data[BIG_DATA_FLAG] = this.options
      }
    }
    return data
  }

  static isBigData = (data: any) => {
    return data && !!data[BIG_DATA_FLAG]
  }

  static compare = (a: any, b: any) => {
    if (BigData.isBigData(a) && BigData.isBigData(b)) {
      if (a[BIG_DATA_FLAG] === b[BIG_DATA_FLAG]) {
        return isFn(a[BIG_DATA_FLAG].compare)
          ? a[BIG_DATA_FLAG].compare(a, b)
          : a === b
      }
      return false
    }
    return a === b
  }

  static clone = (value: any) => {
    if (BigData.isBigData(value)) {
      if (isFn(value[BIG_DATA_FLAG].clone)) {
        const ctx = value[BIG_DATA_FLAG]
        const result = value[BIG_DATA_FLAG].clone(value)
        result[BIG_DATA_FLAG] = ctx
        return result
      }
    }
    return value
  }
}
