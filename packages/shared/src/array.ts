import { isArr, isObj, isStr } from './checkers'

type EachArrayIterator<T> = (currentValue: T, key: number) => void | boolean
type EachStringIterator = (currentValue: string, key: number) => void | boolean
type EachObjectIterator<T = any> = (
  currentValue: T,
  key: string
) => void | boolean
type MapArrayIterator<TItem, TResult> = (
  currentValue: TItem,
  key: number
) => TResult
type MapStringIterator<TResult> = (currentValue: string, key: number) => TResult
type MapObjectIterator<TItem, TResult> = (
  currentValue: TItem,
  key: string
) => TResult
type MemoArrayIterator<T, U> = (
  previousValue: U,
  currentValue: T,
  key: number
) => U
type MemoStringIterator<T> = (
  previousValue: T,
  currentValue: string,
  key: number
) => T
type MemoObjectIterator<TValue, TResult> = (
  previousValue: TResult,
  currentValue: TValue,
  key: string
) => TResult

export const toArr = (val: any): any[] => (isArr(val) ? val : val ? [val] : [])
export function each(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): void
export function each<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): void
export function each<T extends {}, TValue extends T[keyof T]>(
  val: T,
  iterator: EachObjectIterator<TValue>,
  revert?: boolean
): void
export function each(val: any, iterator: any, revert?: boolean): void {
  if (isArr(val) || isStr(val)) {
    if (revert) {
      for (let i: number = val.length - 1; i >= 0; i--) {
        if (iterator(val[i], i) === false) {
          return
        }
      }
    } else {
      for (let i = 0; i < val.length; i++) {
        if (iterator(val[i], i) === false) {
          return
        }
      }
    }
  } else if (isObj(val)) {
    let key: string
    for (key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        if (iterator(val[key], key) === false) {
          return
        }
      }
    }
  }
}

export function map<T>(
  val: string,
  iterator: MapStringIterator<T>,
  revert?: boolean
): T[]
export function map<TItem, TResult>(
  val: TItem[],
  iterator: MapArrayIterator<TItem, TResult>,
  revert?: boolean
): TResult[]
export function map<T extends {}, TResult>(
  val: T,
  iterator: MapObjectIterator<T[keyof T], TResult>,
  revert?: boolean
): Record<keyof T, TResult>
export function map(val: any, iterator: any, revert?: any): any {
  const res = isArr(val) || isStr(val) ? [] : {}
  each(
    val,
    (item, key) => {
      const value = iterator(item, key)
      if (isArr(res)) {
        ;(res as any).push(value)
      } else {
        res[key] = value
      }
    },
    revert
  )
  return res
}

export function reduce<T, U>(
  val: T[],
  iterator: MemoArrayIterator<T, U>,
  accumulator?: U,
  revert?: boolean
): U
export function reduce<T>(
  val: string,
  iterator: MemoStringIterator<T>,
  accumulator?: T,
  revert?: boolean
): T
export function reduce<T extends {}, TValue extends T[keyof T], TResult = any>(
  val: T,
  iterator: MemoObjectIterator<TValue, TResult>,
  accumulator?: TResult,
  revert?: boolean
): TResult
export function reduce(
  val: any,
  iterator: any,
  accumulator?: any,
  revert?: boolean
): any {
  let result = accumulator
  each(
    val,
    (item, key) => {
      result = iterator(result, item, key)
    },
    revert
  )
  return result
}

export function every<T extends string>(
  val: T,
  iterator: EachStringIterator,
  revert?: boolean
): boolean
export function every<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): boolean
export function every<T extends {}>(
  val: T,
  iterator: EachObjectIterator,
  revert?: boolean
): boolean
export function every(val: any, iterator: any, revert?: boolean): boolean {
  let res = true
  each(
    val,
    (item, key) => {
      if (!iterator(item, key)) {
        res = false
        return false
      }
    },
    revert
  )
  return res
}

export function some<T extends string>(
  val: T,
  iterator: EachStringIterator,
  revert?: boolean
): boolean
export function some<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): boolean
export function some<T extends {}>(
  val: T,
  iterator: EachObjectIterator,
  revert?: boolean
): boolean
export function some(val: any, iterator: any, revert?: boolean): boolean {
  let res = false
  each(
    val,
    (item, key) => {
      if (iterator(item, key)) {
        res = true
        return false
      }
    },
    revert
  )
  return res
}

export function findIndex<T extends string>(
  val: T,
  iterator: EachStringIterator,
  revert?: boolean
): number
export function findIndex<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): number
export function findIndex<T extends {}>(
  val: T,
  iterator: EachObjectIterator,
  revert?: boolean
): keyof T
export function findIndex(
  val: any,
  iterator: any,
  revert?: boolean
): string | number {
  let res: number | string = -1
  each(
    val,
    (item, key) => {
      if (iterator(item, key)) {
        res = key
        return false
      }
    },
    revert
  )
  return res
}

export function find<T extends string>(
  val: T,
  iterator: EachStringIterator,
  revert?: boolean
): any
export function find<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): T
export function find<T extends {}>(
  val: T,
  iterator: EachObjectIterator,
  revert?: boolean
): T[keyof T]
export function find(val: any, iterator: any, revert?: boolean): any {
  let res: any
  each(
    val,
    (item, key) => {
      if (iterator(item, key)) {
        res = item
        return false
      }
    },
    revert
  )
  return res
}

export function includes<T extends string>(
  val: T,
  searchElement: string,
  revert?: boolean
): boolean
export function includes<T>(
  val: T[],
  searchElement: T,
  revert?: boolean
): boolean
export function includes(val: any, searchElement: any, revert?: boolean) {
  if (isStr(val)) return val.includes(searchElement)
  return some(val, (item) => item === searchElement, revert)
}

export function move<T extends any>(
  array: T[],
  fromIndex: number,
  toIndex: number
) {
  if (fromIndex === toIndex) return array

  if (
    toIndex < 0 ||
    fromIndex < 0 ||
    toIndex > array.length - 1 ||
    fromIndex > array.length - 1
  ) {
    return array
  }

  if (fromIndex < toIndex) {
    const fromItem = array[fromIndex]
    for (let index = fromIndex; index < toIndex; index++) {
      array[index] = array[index + 1]
    }
    array[toIndex] = fromItem
  } else {
    const fromItem = array[fromIndex]
    for (let index = fromIndex; index > toIndex; index--) {
      array[index] = array[index - 1]
    }
    array[toIndex] = fromItem
  }
  return array
}
