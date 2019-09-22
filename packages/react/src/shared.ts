import React from 'react'
import { isFn, FormPath } from '@uform/shared'
import { IFormEffect } from './types'
import { Observable } from 'rxjs/internal/Observable'
import { filter } from 'rxjs/internal/operators'
import {
  LifeCycleTypes,
  IFormState,
  FormGraph,
  IFieldState,
  IVirtualFieldState
} from '@uform/core'

export interface IEventTargetOption {
  selected: boolean
  value: any
}

const isEvent = (candidate: React.SyntheticEvent): boolean =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault)

const isReactNative =
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.product &&
  window.navigator.product === 'ReactNative'

const getSelectedValues = (options?: IEventTargetOption[]) => {
  const result = []
  if (options) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.selected) {
        result.push(option.value)
      }
    }
  }
  return result
}

export const getValueFromEvent = (event: any) => {
  if (isEvent(event)) {
    if (
      !isReactNative &&
      event.nativeEvent &&
      event.nativeEvent.text !== undefined
    ) {
      return event.nativeEvent.text
    }
    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text
    }

    const detypedEvent = event
    const {
      target: { type, value, checked, files },
      dataTransfer
    } = detypedEvent

    if (type === 'checkbox') {
      return !!checked
    }

    if (type === 'file') {
      return files || (dataTransfer && dataTransfer.files)
    }

    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options)
    }
    return value
  }
  return event
}

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

export const env = {
  effectStart: false,
  effectSelector: null,
  effectEnd: false
}

export const [raf, caf] = getScheduler()

export const createFormEffects = (
  effects: IFormEffect | null,
  actions: any
) => {
  if (isFn(effects)) {
    return (selector: (type: string) => Observable<any>) => {
      env.effectEnd = false
      env.effectStart = true
      env.effectSelector = <T = any>(
        type: string,
        matcher?: string | ((payload: T) => boolean)
      ) => {
        const observable$: Observable<T> = selector(type)
        if (matcher) {
          return observable$.pipe(
            filter(
              isFn(matcher)
                ? matcher
                : (payload: T): boolean => {
                    return FormPath.parse(matcher).match(
                      payload && (payload as any).name
                    )
                  }
            )
          )
        }
        return observable$
      }
      effects(env.effectSelector, actions)
      env.effectStart = false
      env.effectEnd = true
    }
  } else {
    return () => {}
  }
}

export const createEffectHook = <T>(type: string) => (
  ...args: any[]
): Observable<T> => {
  if (!env.effectStart || env.effectEnd) {
    throw new Error(
      'EffectHook must be called synchronously within the effects callback function.'
    )
  }
  if (!env.effectSelector) {
    throw new Error('Can not found effect hook selector.')
  }
  return env.effectSelector(type, ...args)
}

export const FormEffectHooks = {
  [`${LifeCycleTypes.ON_FORM_WILL_INIT}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_WILL_INIT
  ),
  [`${LifeCycleTypes.ON_FORM_INIT}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INIT
  ),
  [`${LifeCycleTypes.ON_FORM_CHANGE}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_CHANGE
  ),
  [`${LifeCycleTypes.ON_FORM_INPUT_CHANGE}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INPUT_CHANGE
  ),
  [`${LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE}$`]: createEffectHook<
    IFormState
  >(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE),
  [`${LifeCycleTypes.ON_FORM_RESET}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_RESET
  ),
  [`${LifeCycleTypes.ON_FORM_SUBMIT}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT
  ),
  [`${LifeCycleTypes.ON_FORM_SUBMIT_START}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_START
  ),
  [`${LifeCycleTypes.ON_FORM_SUBMIT_END}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_END
  ),
  [`${LifeCycleTypes.ON_FORM_MOUNT}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_MOUNT
  ),
  [`${LifeCycleTypes.ON_FORM_UNMOUNT}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_UNMOUNT
  ),
  [`${LifeCycleTypes.ON_FORM_VALIDATE_START}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALIDATE_END
  ),
  [`${LifeCycleTypes.ON_FORM_VALIDATE_END}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALIDATE_END
  ),
  [`${LifeCycleTypes.ON_FORM_VALUES_CHANGE}$`]: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALUES_CHANGE
  ),

  [`${LifeCycleTypes.ON_FORM_GRAPH_CHANGE}$`]: createEffectHook<FormGraph>(
    LifeCycleTypes.ON_FORM_GRAPH_CHANGE
  ),

  [`${LifeCycleTypes.ON_FIELD_WILL_INIT}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_WILL_INIT),
  [`${LifeCycleTypes.ON_FIELD_INIT}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_INIT),
  [`${LifeCycleTypes.ON_FIELD_CHANGE}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_CHANGE),
  [`${LifeCycleTypes.ON_FIELD_INPUT_CHANGE}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_INPUT_CHANGE),
  [`${LifeCycleTypes.ON_FIELD_VALUE_CHANGE}$`]: createEffectHook<IFieldState>(
    LifeCycleTypes.ON_FIELD_VALUE_CHANGE
  ),
  [`${LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE}$`]: createEffectHook<
    IFieldState
  >(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE),
  [`${LifeCycleTypes.ON_FIELD_MOUNT}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_MOUNT),
  [`${LifeCycleTypes.ON_FIELD_UNMOUNT}$`]: createEffectHook<
    IFieldState | IVirtualFieldState
  >(LifeCycleTypes.ON_FIELD_UNMOUNT)
}
