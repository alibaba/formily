import { isArr, isObj, isStr } from '@uform/types'

type EachArrayIterator<T> = (currentValue: T, key: number) => void | boolean
type EachStringIterator = (currentValue: string, key: number) => void | boolean
type EachObjectIterator<T> = (
  currentValue: T[keyof T],
  key: string
) => void | boolean
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
type MemoObjectIterator<T, U> = (
  previousValue: U,
  currentValue: T[keyof T],
  key: string
) => U

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
export function each<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
  revert?: boolean
): void
export function each(val: any, iterator: any, revert?: boolean): object {
  if (isArr(val) || isStr(val)) {
    if (revert) {
      for (let i: number = val.length - 1; i >= 0; i--) {
        if (iterator(val[i], i) === false) {
          return
        }
      }
    } else {
      for (let i = 0, length = val.length; i < length; i++) {
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

export function map(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): string[]
export function map<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): T[]
export function map<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
  revert?: boolean
): object
export function map(val: any, iterator: any, revert?: boolean): any {
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
export function reduce<T extends object, U>(
  val: T,
  iterator: MemoObjectIterator<T, U>,
  accumulator?: U,
  revert?: boolean
): U
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

export function every(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): boolean
export function every<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): boolean
export function every<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
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

export function some(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): boolean
export function some<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): boolean
export function some<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
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

export function findIndex(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): number
export function findIndex<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): number
export function findIndex<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
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

export function find(
  val: string,
  iterator: EachStringIterator,
  revert?: boolean
): any
export function find<T>(
  val: T[],
  iterator: EachArrayIterator<T>,
  revert?: boolean
): T
export function find<T extends object>(
  val: T,
  iterator: EachObjectIterator<T>,
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

export function includes(
  val: string[],
  searchElement: string,
  revert?: boolean
): boolean
export function includes<T>(
  val: T[],
  searchElement: T,
  revert?: boolean
): boolean {
  return some(val, item => item === searchElement, revert)
}
