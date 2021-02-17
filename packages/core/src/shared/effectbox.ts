import { isFn, isValid } from '@formily/shared'
import { LifeCycle, Form } from '../models'
import { AnyFunction } from '../types'
import { isForm } from './checkers'

const __FORM_EFFECT_ENVS__ = {
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false,
}

export const createEffectHook = <
  F extends (payload: any, ...ctxs: any[]) => AnyFunction
>(
  type: string,
  callback?: F
) => {
  return (...args: Parameters<ReturnType<F>>) => {
    if (__FORM_EFFECT_ENVS__.effectStart) {
      __FORM_EFFECT_ENVS__.lifecycles.push(
        new LifeCycle(type, (payload, ctx) => {
          if (isFn(callback)) {
            callback(payload, ctx, ...__FORM_EFFECT_ENVS__.context)(...args)
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
  let index: number
  return {
    provide(value?: T) {
      if (__FORM_EFFECT_ENVS__.effectStart) {
        index = __FORM_EFFECT_ENVS__.context.length
        __FORM_EFFECT_ENVS__.context[index] = isValid(value)
          ? value
          : defaultValue
      } else {
        throw new Error(
          'Provide method cannot be used in asynchronous function body'
        )
      }
    },
    consume(): T {
      if (!__FORM_EFFECT_ENVS__.effectStart) {
        throw new Error(
          'Consume method cannot be used in asynchronous function body'
        )
      }
      return __FORM_EFFECT_ENVS__.context[index]
    },
  }
}

const FormEffectContext = createEffectContext<Form>()

export const useEffectForm = FormEffectContext.consume

export const runEffects = <Context>(
  context?: Context,
  ...args: ((context: Context) => void)[]
): LifeCycle[] => {
  __FORM_EFFECT_ENVS__.lifecycles = []
  __FORM_EFFECT_ENVS__.context = []
  __FORM_EFFECT_ENVS__.effectStart = true
  __FORM_EFFECT_ENVS__.effectEnd = false
  if (isForm(context)) {
    FormEffectContext.provide(context)
  }
  args.forEach((effects) => {
    if (isFn(effects)) {
      effects(context)
    }
  })
  __FORM_EFFECT_ENVS__.context = []
  __FORM_EFFECT_ENVS__.effectStart = false
  __FORM_EFFECT_ENVS__.effectEnd = true
  return __FORM_EFFECT_ENVS__.lifecycles
}
