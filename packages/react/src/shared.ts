import { isFn, FormPath, Subscribable, isValid, toArr } from '@formily/shared'
import {
  IFormEffect,
  IFormActions,
  IFormAsyncActions,
  IFieldMergeState,
  IEffectProviderHandler,
  IEffectMiddleware
} from './types'
import { Observable } from 'rxjs/internal/Observable'
import { filter } from 'rxjs/internal/operators/filter'
import { createActions, createAsyncActions } from 'react-eva'
import {
  LifeCycleTypes,
  IFormState,
  FormGraph,
  IFieldState
} from '@formily/core'

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
    'createMutators',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'isHostRendering',
    'hostUpdate',
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
    'isHostRendering',
    'hostUpdate',
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
      isValid(event.nativeEvent.text)
    ) {
      return event.nativeEvent.text
    }
    if (isReactNative && isValid(event.nativeEvent)) {
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
  onFormOnSubmitSuccess$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_ON_SUBMIT_SUCCESS
  ),
  onFormOnSubmitFailed$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_ON_SUBMIT_FAILED
  ),
  onFormInputChange$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INPUT_CHANGE
  ),
  onFormInitialValueChange$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE
  ),
  onFormReset$: createEffectHook<IFormState>(LifeCycleTypes.ON_FORM_RESET),

  onFormSubmitValidateStart$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START
  ),
  onFormSubmitValidateSuccess$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS
  ),
  onFormSubmitValidateFailed$: createEffectHook<IFormState>(
    LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED
  ),

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
  onFieldValidateStart$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_VALIDATE_START
  ),
  onFieldValidateEnd$: createEffectHook<IFieldMergeState>(
    LifeCycleTypes.ON_FIELD_VALIDATE_END
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

export const createEffectsProvider = <TActions = any, TContext = any>(
  callback: IEffectProviderHandler<TActions, TContext>,
  middlewares?: IEffectMiddleware<TActions, TContext>[],
  context?: TContext
) => {
  const promises = {}

  const resolves = {}

  const waitFor = async <TPayload = any>(
    type: string,
    filter: (payload: TPayload) => boolean
  ): Promise<TPayload> => {
    if (!promises[type]) {
      promises[type] = new Promise(resolve => {
        resolves[type] = { resolve, filter }
      })
    }
    return promises[type].then(payload => {
      delete promises[type]
      delete resolves[type]
      return payload
    })
  }

  const triggerTo = async <TPayload = any>(
    type: string,
    payload: TPayload
  ): Promise<TPayload> => {
    if (resolves[type]) {
      if (resolves[type].filter) {
        if (resolves[type].filter(payload)) {
          return resolves[type].resolve(payload)
        } else {
          return
        }
      }
      return resolves[type].resolve(payload)
    } else {
      promises[type] = new Promise(resolve => {
        resolves[type] = { resolve }
      })
      return resolves[type].resolve(payload)
    }
  }

  return ($: (type: string) => Observable<any>, actions: TActions) => {
    const runtime = {
      context,
      actions,
      waitFor
    }
    const queue = toArr(middlewares).reduce((buf, fn) => {
      const spec = fn(runtime)
      for (const key in spec) {
        buf[key] = buf[key] || []
        buf[key] = buf[key].concat(spec[key])
      }
      return buf
    }, {})

    const applyMiddlewares = async <TPayload = any>(
      type: string,
      payload: TPayload
    ): Promise<TPayload> => {
      if (queue[type] && queue[type].length) {
        let i = 0
        const next = (payload: TPayload) => {
          if (!queue[type][i]) return payload
          return Promise.resolve(queue[type][i++](payload, next))
        }
        return await next(payload)
      }
      return payload
    }

    const subscribe = (type: string) => {
      $(type).subscribe(async (payload: any) => {
        await applyMiddlewares(type, payload)
        await triggerTo(type, payload)
      })
    }

    subscribe('onFieldInit')
    subscribe('onFieldChange')
    subscribe('onFieldInputChange')
    subscribe('onFormChange')
    subscribe('onFormMount')
    subscribe('onFormSubmit')
    subscribe('onFormReset')

    callback({ ...runtime, applyMiddlewares, triggerTo, waitFor })($, actions)
  }
}

export const createQueryEffects = <
  TQueryPayload = any,
  TQueryResult = any,
  TActions extends IFormActions = any,
  TContext = any
>(
  query: (payload: TQueryPayload) => TQueryResult | Promise<TQueryResult>,
  middlewares?: IEffectMiddleware<TActions, TContext>[],
  context?: TContext
) => {
  return createEffectsProvider<TActions>(
    ({ applyMiddlewares, actions }) => $ => {
      $('onFormMount').subscribe(async () => {
        let values = await applyMiddlewares(
          'onFormWillQuery',
          actions.getFormState(state => state.values)
        )
        values = await applyMiddlewares('onFormFirstQuery', values)
        try {
          await applyMiddlewares('onFormDidQuery', await query(values))
        } catch (e) {
          await applyMiddlewares('onFormQueryFailed', e)
          throw e
        }
      })

      $('onFormSubmit').subscribe(async () => {
        let values = await applyMiddlewares(
          'onFormWillQuery',
          actions.getFormState(state => state.values)
        )
        values = await applyMiddlewares('onFormSubmitQuery', values)
        try {
          await applyMiddlewares('onFormDidQuery', await query(values))
        } catch (e) {
          await applyMiddlewares('onFormQueryFailed', e)
          throw e
        }
      })

      $('onFormReset').subscribe(async () => {
        let values = await applyMiddlewares(
          'onFormWillQuery',
          actions.getFormState(state => state.values)
        )
        values = await applyMiddlewares('onFormResetQuery', values)
        try {
          await applyMiddlewares('onFormDidQuery', await query(values))
        } catch (e) {
          await applyMiddlewares('onFormQueryFailed', e)
          throw e
        }
      })
    },
    middlewares,
    context
  )
}
