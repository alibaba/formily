import { isFn, FormPath, Subscribable } from '@uform/shared'
import {
  IFormEffect,
  IFormActions,
  IFormAsyncActions,
  IFieldMergeState
} from './types'
import { Observable } from 'rxjs/internal/Observable'
import { filter } from 'rxjs/internal/operators/filter'
import { createActions, createAsyncActions } from 'react-eva'
import { LifeCycleTypes, IFormState, FormGraph, IFieldState } from '@uform/core'

export const createFormActions = (): IFormActions => {
  if (env.currentActions) {
    return env.currentActions
  }
  return createActions(
    'submit',
    'reset',
    'hasChanged',
    'validate',
    'clearErrors',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'notify',
    'dispatch',
    'setFieldValue',
    'getFieldValue',
    'setFieldInitialValue',
    'getFieldInitialValue'
  ) as IFormActions
}

export const createAsyncFormActions = (): IFormAsyncActions =>
  createAsyncActions(
    'submit',
    'reset',
    'hasChanged',
    'clearErrors',
    'validate',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'notify',
    'dispatch',
    'setFieldValue',
    'getFieldValue',
    'setFieldInitialValue',
    'getFieldInitialValue'
  ) as IFormAsyncActions

export interface IEventTargetOption {
  selected: boolean
  value: any
}

const isEvent = (candidate: any): boolean =>
  candidate &&
  (candidate.stopPropagation || candidate.preventDefault || candidate.bubbles)

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

export class Broadcast extends Subscribable {
  context: any

  setContext(context: any) {
    this.context = context
  }
  getContext() {
    return this.context
  }
}

export const env = {
  effectStart: false,
  effectSelector: null,
  effectEnd: false,
  currentActions: null
}

export const createFormEffects = <Payload = any, Actions = any>(
  effects: IFormEffect<Payload, Actions> | null,
  actions: Actions
) => {
  if (isFn(effects)) {
    return (selector: (type: string) => Observable<any>) => {
      env.effectEnd = false
      env.effectStart = true
      env.currentActions = actions
      env.effectSelector = <T = any>(
        type: string,
        matcher?: string | ((payload: T) => boolean)
      ) => {
        const observable$: Observable<T> = selector(type)
        if (matcher) {
          return observable$.pipe(
            filter<T>(
              isFn(matcher) && !matcher['path']
                ? matcher
                : (payload: T): boolean => {
                    return FormPath.parse(matcher as any).matchAliasGroup(
                      payload && (payload as any).name,
                      payload && (payload as any).path
                    )
                  }
            )
          )
        }
        return observable$
      }
      Object.assign(env.effectSelector, actions)
      effects(env.effectSelector, actions)
      env.effectStart = false
      env.effectEnd = true
      env.currentActions = null
    }
  } else {
    return () => {}
  }
}

export const createEffectHook = <TResult, Props extends Array<any> = any[]>(
  type: string
) => (...args: Props): Observable<TResult> => {
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
  onFormWillInit$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_WILL_INIT
  ),
  onFormInit$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_INIT),
  onFormChange$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_CHANGE),
  onFormInputChange$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INPUT_CHANGE
  ),
  onFormInitialValueChange$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE
  ),
  onFormReset$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_RESET),
  onFormSubmit$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_SUBMIT),
  onFormSubmitStart$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_START
  ),
  onFormSubmitEnd$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_END
  ),
  onFormMount$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_MOUNT),
  onFormUnmount$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_UNMOUNT),
  onFormValidateStart$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALIDATE_START
  ),
  onFormValidateEnd$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALIDATE_END
  ),
  onFormValuesChange$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_VALUES_CHANGE
  ),

  onFormGraphChange$: createEffectHook<FormGraph>(
    LifeCycleTypes.ON_FORM_GRAPH_CHANGE
  ),

  onFieldWillInit$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_WILL_INIT
  ),
  onFieldInit$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_INIT
  ),
  onFieldChange$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_CHANGE
  ),
  onFieldMount$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_MOUNT
  ),
  onFieldUnmount$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_UNMOUNT
  ),
  onFieldInputChange$: createEffectHook<IFieldState>(
    LifeCycleTypes.ON_FIELD_INPUT_CHANGE
  ),
  onFieldValueChange$: createEffectHook<IFieldState>(
    LifeCycleTypes.ON_FIELD_VALUE_CHANGE
  ),
  onFieldInitialValueChange$: createEffectHook<IFieldState>(
    LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE
  )
}
