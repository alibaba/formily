import { isFn, isValid } from '@formily/shared'
import { LifeCycle, Form } from '../models'
import { AnyFunction } from '../types'
import { isForm } from './checkers'

const FormEffectState = {
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
    if (FormEffectState.effectStart) {
      FormEffectState.lifecycles.push(
        new LifeCycle(type, (payload, ctx) => {
          if (isFn(callback)) {
            callback(payload, ctx, ...FormEffectState.context)(...args)
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
      if (FormEffectState.effectStart) {
        index = FormEffectState.context.length
        FormEffectState.context[index] = isValid(value) ? value : defaultValue
      } else {
        throw new Error(
          'Provide method cannot be used in asynchronous function body'
        )
      }
    },
    consume(): T {
      if (!FormEffectState.effectStart) {
        throw new Error(
          'Consume method cannot be used in asynchronous function body'
        )
      }
      return FormEffectState.context[index]
    },
  }
}

const FormEffectContext = createEffectContext<Form>()

export const useEffectForm = FormEffectContext.consume

export const runEffects = <Context>(
  context?: Context,
  ...args: ((context: Context) => void)[]
): LifeCycle[] => {
  FormEffectState.lifecycles = []
  FormEffectState.context = []
  FormEffectState.effectStart = true
  FormEffectState.effectEnd = false
  if (isForm(context)) {
    FormEffectContext.provide(context)
  }
  args.forEach((effects) => {
    if (isFn(effects)) {
      effects(context)
    }
  })
  FormEffectState.context = []
  FormEffectState.effectStart = false
  FormEffectState.effectEnd = true
  return FormEffectState.lifecycles
}
