import { isFn, isValid, instOf } from '@formily/shared'
import {
  LifeCycle,
  Form,
  Field,
  ArrayField,
  ObjectField,
  VoidField,
  Query,
} from '../models'
import {
  AnyFunction,
  IFormProps,
  IFormState,
  IFieldState,
  IVoidFieldState,
  GeneralField,
  IGeneralFieldState,
} from '../types'

const __FORM_HOOK_ENVS__ = {
  lifecycles: [],
  context: [],
  effectStart: false,
  effectEnd: false,
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
    },
  }
}

export const getLifeCyclesByEffects = <Context>(
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

export const isForm = (node: any): node is Form => {
  return instOf(node, Form)
}

export const isField = (node: any): node is Field => {
  return instOf(node, Field)
}

export const isGeneralField = (node: any): node is GeneralField => {
  return instOf(node, Field) || instOf(node, VoidField)
}

export const isArrayField = (node: any): node is ArrayField => {
  return instOf(node, ArrayField)
}

export const isObjectField = (node: any): node is ObjectField => {
  return instOf(node, ObjectField)
}

export const isVoidField = (node: any): node is VoidField => {
  return instOf(node, VoidField)
}

export const isFormState = (state: any): state is IFormState => {
  if (isFn(state.initialize)) return false
  return state?.displayName === 'Form'
}

export const isFieldState = (state: any): state is IFieldState => {
  if (isFn(state.initialize)) return false
  return state?.displayName === 'Field'
}

export const isGeneralFieldState = (node: any): node is IGeneralFieldState => {
  if (!isFn(node.initialize)) return false
  return node?.displayName?.indexOf('Field') > -1
}

export const isArrayFieldState = (state: any): state is IFieldState => {
  if (isFn(state.initialize)) return false
  return state?.displayName === 'ArrayField'
}

export const isDataField = (node: any) => {
  return isField(node) || isArrayField(node) || isObjectField(node)
}

export const isDataFieldState = (node: any) => {
  return (
    isFieldState(node) || isObjectFieldState(node) || isArrayFieldState(node)
  )
}

export const isObjectFieldState = (state: any): state is IFieldState => {
  if (isFn(state.initialize)) return false
  return state?.displayName === 'ObjectField'
}

export const isVoidFieldState = (state: any): state is IVoidFieldState => {
  if (isFn(state.initialize)) return false
  return state?.displayName === 'VoidField'
}

export const isQuery = (query: any): query is Query => {
  return query && query instanceof Query
}

export const createForm = (options?: IFormProps) => {
  return new Form(options)
}
