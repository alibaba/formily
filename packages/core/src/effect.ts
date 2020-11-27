import { isFn, isValid } from '@formily/shared'
import { LifeCycle } from './models'
import { AnyFunction } from './types'

const __FORM_HOOK_ENVS__ = {
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false
}

export const createEffect = <
  F extends (payload: any, ...ctxs: any[]) => AnyFunction
>(
  type: string,
  callback: F
) => {
  return (...args: Parameters<ReturnType<F>>) => {
    if (__FORM_HOOK_ENVS__.effectStart) {
      __FORM_HOOK_ENVS__.lifecycles.push(
        new LifeCycle(type, (payload, ctx) => {
          if (isFn(callback)) {
            callback(payload, ctx, ...__FORM_HOOK_ENVS__.context)(...args)
          }
        })
      )
    } else {
      throw new Error(
        'Effect hooks cannot be used in asynchronous function body'
      )
    }
  }
}

export const createEffectContext = <T = any>(defaultValue?: T) => {
  const index = __FORM_HOOK_ENVS__.context.length
  return {
    provide(value?: T) {
      if (__FORM_HOOK_ENVS__.effectStart) {
        __FORM_HOOK_ENVS__.context[index] = isValid(value)
          ? value
          : defaultValue
      } else {
        throw new Error(
          'Provide method cannot be used in asynchronous function body'
        )
      }
    },
    consume(): T {
      if (!__FORM_HOOK_ENVS__.effectStart) {
        throw new Error(
          'Consume method cannot be used in asynchronous function body'
        )
      }
      return __FORM_HOOK_ENVS__.context[index]
    }
  }
}

export const getLifecyclesFromEffects = <Context>(
  effects?: (context: Context) => void,
  context?: Context
): LifeCycle[] => {
  __FORM_HOOK_ENVS__.lifecycles = []
  __FORM_HOOK_ENVS__.context = []
  __FORM_HOOK_ENVS__.effectStart = true
  __FORM_HOOK_ENVS__.effectEnd = false
  if (isFn(effects)) {
    effects(context)
  }
  __FORM_HOOK_ENVS__.effectStart = false
  __FORM_HOOK_ENVS__.effectEnd = true
  return __FORM_HOOK_ENVS__.lifecycles
}
