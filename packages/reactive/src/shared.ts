import { isObj, isValid, clone, isFn } from '@formily/shared'
import { ProxyRaw, MakeObservableSymbol, Untracking } from './environment'
import { Annotation } from './types'

export const isObservable = (target: any) => {
  return ProxyRaw.has(target)
}

export const isAnnotation = (target: any): target is Annotation => {
  return !!target[MakeObservableSymbol]
}

export const isSupportObservable = (target: any) => {
  return isValid(target) && isObj(target)
}

export const toJS = (target: any) => clone(target)

export const untracked = <T extends () => any>(callback?: T): ReturnType<T> => {
  Untracking.value = true
  let res: any
  if (isFn(callback)) {
    res = callback()
  }
  Untracking.value = false
  return res
}
