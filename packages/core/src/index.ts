import {
  isFn,
  isEqual,
  toArr,
  isNum,
  isArr,
  clone,
  isValid,
  FormPath,
  FormPathPattern,
  each,
  deprecate,
  isObj
} from '@uform/shared'
import {
  FormValidator,
  setValidationLanguage,
  setValidationLocale
} from '@uform/validator'
import { FormHeart, LifeCycleTypes } from './shared/lifecycle'
import { FormGraph } from './shared/graph'
import { FormState } from './state/form'
import { VFieldState } from './state/vfield'
import { FieldState } from './state/field'
import {
  IFormState,
  IFieldState,
  IVFieldState,
  FormCreatorOptions,
  IFieldProps,
  IVFieldProps
} from './types'
import { Model } from './shared/model'

/**
 *
 * {
 *    intialValues:any,
 *    values:any,
 *    lifecycles:LifeCycle[],
 *    validateFirst:boolean,
 *    useDirty:boolean
 * }
 */

export const createForm = (options: FormCreatorOptions = {}) => {
  function changeGraph() {
    clearTimeout(env.graphChangeTimer)
    env.graphChangeTimer = setTimeout(() => {
      heart.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE, graph)
    })
  }

  function onFormChange(published: IFormState) {
    heart.notify(LifeCycleTypes.ON_FORM_CHANGE, state)
    const valuesChanged = state.hasChanged('values')
    const initialValuesChanged = state.hasChanged('initialValues')
    const unmountedChanged = state.hasChanged('unmounted')
    const mountedChanged = state.hasChanged('mounted')
    const initialized = state.hasChanged('initialized')
    if (initialized) {
      heart.notify(LifeCycleTypes.ON_FORM_INIT, state)
    }
    if (valuesChanged || initialValuesChanged) {
      /**
       * 影子更新：不会触发具体字段的onChange，如果不这样处理，会导致任何值变化都会导致整树rerender
       */
      shadowUpdate(() => {
        graph.eachChildren('', (fieldState: Model) => {
          if (fieldState.displayName === 'VFieldState') {
            return
          }
          fieldState.setState((state: IFieldState) => {
            if (state.visible) {
              if (valuesChanged) {
                const path = FormPath.parse(state.name)
                const index = path.segments[path.segments.length - 1]
                const parentValue = getFormValuesIn(path.parent())
                const value = getFormValuesIn(state.name)
                /**
                 * https://github.com/alibaba/uform/issues/267 dynamic remove node
                 */
                if (isArr(parentValue) && parentValue.length <= Number(index)) {
                  graph.remove(state.name)
                  return
                }
                if (!isEqual(value, state.value)) {
                  state.value = value
                }
              }
              if (initialValuesChanged) {
                const initialValue = getFormInitialValuesIn(state.name)
                if (!isEqual(initialValue, state.initialValue)) {
                  state.initialValue = initialValue
                  if (!isValid(state.value)) {
                    state.value = initialValue
                  }
                }
              }
            }
          })
        })
      })
      if (valuesChanged) {
        heart.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE, state)
      }
      if (initialValuesChanged) {
        heart.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, state)
      }
    }
    if (unmountedChanged && published.unmounted) {
      heart.notify(LifeCycleTypes.ON_FORM_UNMOUNT, state)
    }
    if (mountedChanged && published.mounted) {
      heart.notify(LifeCycleTypes.ON_FORM_MOUNT, state)
    }

    changeGraph()
  }

  function onFieldChange({ onChange, fieldState, path }) {
    return (published: IFieldState) => {
      const valueChanged = fieldState.hasChanged('value')
      const initialValueChanged = fieldState.hasChanged('initialValue')
      const visibleChanged = fieldState.hasChanged('visible')
      const displayChanged = fieldState.hasChanged('display')
      const unmountedChanged = fieldState.hasChanged('unmounted')
      const mountedChanged = fieldState.hasChanged('mounted')
      const initializedChanged = fieldState.hasChanged('initialized')
      if (initializedChanged) {
        heart.notify(LifeCycleTypes.ON_FIELD_INIT, fieldState)
        const isEmptyValue = !isValid(published.value)
        const isEmptyInitialValue = !isValid(published.initialValue)
        if (isEmptyValue || isEmptyInitialValue) {
          fieldState.setState((state: IFieldState) => {
            if (isEmptyValue) state.value = getFormValuesIn(state.name)
            if (isEmptyInitialValue)
              state.initialValue = getFormInitialValuesIn(state.name)
          }, true)
        }
      }

      if (visibleChanged) {
        if (!published.visible) {
          deleteFormValuesIn(path, true)
        } else {
          setFormValuesIn(path, published.value)
        }
        graph.eachChildren(
          path,
          childState => {
            childState.setState((state: IFieldState) => {
              state.visible = published.visible
            })
          },
          false
        )
      }
      if (displayChanged) {
        graph.eachChildren(
          path,
          childState => {
            childState.setState((state: IFieldState) => {
              state.display = published.display
            })
          },
          false
        )
      }

      if (unmountedChanged) {
        if (published.unmounted) {
          deleteFormValuesIn(path, true)
        } else {
          setFormValuesIn(path, published.value)
        }
        graph.eachChildren(
          path,
          childState => {
            childState.setState((state: IFieldState) => {
              state.unmounted = published.unmounted
            })
          },
          false
        )
      }
      if (mountedChanged && published.mounted) {
        heart.notify(LifeCycleTypes.ON_FIELD_MOUNT, fieldState)
      }

      if (valueChanged) {
        setFormValuesIn(path, published.value)
        heart.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, fieldState)
      }
      if (initialValueChanged) {
        setFormInitialValuesIn(path, published.initialValue)
        heart.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, fieldState)
      }
      changeGraph()
      if (isFn(onChange) && (!env.shadowStage || env.leadingStage)) {
        onChange(fieldState)
      }
      heart.notify(LifeCycleTypes.ON_FIELD_CHANGE, fieldState)
    }
  }

  function onVFieldChange({ onChange, fieldState, path }) {
    return (published: IVFieldState) => {
      const visibleChanged = fieldState.hasChanged('visible')
      const displayChanged = fieldState.hasChanged('display')
      const unmountedChanged = fieldState.hasChanged('unmounted')
      const mountedChanged = fieldState.hasChanged('mounted')
      const initializedChnaged = fieldState.hasChanged('initialized')

      if (initializedChnaged) {
        heart.notify(LifeCycleTypes.ON_FIELD_INIT, fieldState)
      }

      if (visibleChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVFieldState) => {
            state.visible = published.visible
          })
        })
      }

      if (displayChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVFieldState) => {
            state.display = published.display
          })
        })
      }

      if (unmountedChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVFieldState) => {
            state.unmounted = published.unmounted
          })
        })
      }
      if (mountedChanged && published.mounted) {
        heart.notify(LifeCycleTypes.ON_FIELD_MOUNT, fieldState)
      }
      changeGraph()
      if (isFn(onChange)) onChange(fieldState)
      heart.notify(LifeCycleTypes.ON_FIELD_CHANGE, fieldState)
    }
  }

  function registerVField({
    path,
    props,
    onChange
  }: IVFieldProps): typeof VFieldState.prototype {
    let fieldState: typeof VFieldState.prototype
    let newPath = FormPath.getPath(path)
    if (graph.exist(newPath)) {
      fieldState.unsubscribe()
      fieldState = graph.select(newPath)
      fieldState.subscribe(
        onVFieldChange({ onChange, fieldState, path: newPath })
      )
    } else {
      fieldState = new VFieldState({
        path: newPath,
        useDirty: options.useDirty
      })
      graph.appendNode(newPath, fieldState)
      fieldState.subscribe(
        onVFieldChange({ onChange, fieldState, path: newPath })
      )
      fieldState.batch(() => {
        batchRunTaskQueue(fieldState)
        fieldState.setState((state: IVFieldState) => {
          state.initialized = true
          state.props = props
        })
      })
    }
    return fieldState
  }

  function registerField({
    path,
    value,
    initialValue,
    required,
    rules,
    onChange,
    props
  }: IFieldProps): typeof FieldState.prototype {
    let fieldState: typeof FieldState.prototype
    if (graph.exist(path)) {
      fieldState.unsubscribe()
      fieldState = graph.select(path)
      fieldState.subscribe(onFieldChange({ onChange, fieldState, path }))
    } else {
      fieldState = new FieldState({
        path,
        useDirty: options.useDirty
      })
      heart.notify(LifeCycleTypes.ON_FIELD_WILL_INIT, fieldState)
      graph.appendNode(path, fieldState)
      graph.appendNode(transformDataPath(path), fieldState)
      fieldState.subscribe(onFieldChange({ onChange, fieldState, path }))
      fieldState.batch(() => {
        batchRunTaskQueue(fieldState)
        fieldState.setState((state: IFieldState) => {
          state.initialized = true
          state.value = isValid(value) ? value : initialValue
          state.initialValue = initialValue
          state.props = props
          state.required = required
          state.rules = rules
        })
      })
      validator.register(path, validate => {
        const { value, rules } = fieldState.getState()
        clearTimeout((fieldState as any).validateTimer)
        ;(fieldState as any).validateTimer = setTimeout(() => {
          fieldState.setState(state => {
            state.validating = true
          })
        }, 60)
        validate(value, rules).then(({ errors, warnings }) => {
          clearTimeout((fieldState as any).validateTimer)
          fieldState.setState((state: IFieldState) => {
            state.validating = false
            state.errors = errors
            state.warnings = warnings
          })
        })
      })
    }
    return fieldState
  }

  function unsubscribe(callback?: (state: IFormState) => void) {
    if (callback) state.unsubscribe(callback)
  }

  function subscribe(callback?: (state: IFormState) => void) {
    state.subscribe(callback)
  }

  function transformDataPath(path: FormPathPattern) {
    const newPath = FormPath.getPath(path)
    return newPath.reduce((path: FormPath, key: string, index: number) => {
      const realPath = newPath.slice(0, index + 1)
      const dataPath = path.concat(key)
      const selected = graph.select(realPath)
      if (selected && selected.displayName === 'VFieldState') {
        return path
      }
      return dataPath
    }, FormPath.getPath(''))
  }

  function setFormIn(
    path: FormPathPattern,
    key: string,
    value: any,
    silent?: boolean
  ) {
    state.setState(state => {
      FormPath.setIn(state[key], transformDataPath(path), value)
    }, silent)
  }

  function deleteFormIn(path: FormPathPattern, key: string, silent?: boolean) {
    state.setState(state => {
      FormPath.deleteIn(state[key], transformDataPath(path))
    }, silent)
  }

  function deleteFormValuesIn(path: FormPathPattern, silent?: boolean) {
    deleteFormIn(path, 'values', silent)
  }

  function setFormValuesIn(
    path: FormPathPattern,
    value?: any,
    silent?: boolean
  ) {
    return setFormIn(path, 'values', value, silent)
  }

  function setFormInitialValuesIn(
    path: FormPathPattern,
    value?: any,
    silent?: boolean
  ) {
    return setFormIn(path, 'initialValues', value, silent)
  }

  function getFormIn(path: FormPathPattern, key?: string) {
    return state.getState(state =>
      FormPath.getIn(state[key], transformDataPath(path))
    )
  }

  function getFormValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'values')
  }

  function getFormInitialValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'initialValues')
  }

  function setValue(path: FormPathPattern, ...values: any[]) {
    const fieldState = graph.select(path)
    if (fieldState) {
      fieldState.setState((state: IFieldState) => {
        state.value = values[0]
        state.values = values
      })
    }
  }

  function getValue(path: FormPathPattern) {
    const fieldState = graph.select(path)
    if (fieldState) {
      return fieldState.getState((state: IFieldState) => state.value)
    }
  }

  function createMutators(path: FormPathPattern) {
    return {
      change(...values: any[]) {
        setValue(path, ...values)
        return values[0]
      },
      focus() {
        const fieldState = graph.select(path)
        if (fieldState) {
          fieldState.setState((state: IFieldState) => {
            state.active = true
            state.visited = true
          })
        }
      },
      blur() {
        const fieldState = graph.select(path)
        if (fieldState) {
          fieldState.setState((state: IFieldState) => {
            state.active = false
          })
        }
      },
      push(value: any) {
        const arr = toArr(getValue(path))
        arr.push(value)
        setValue(path, arr)
        return arr
      },
      pop() {
        const arr = toArr(getValue(path))
        arr.pop()
        setValue(path, arr)
        return arr
      },
      insert(index: number, value: any) {
        const arr = toArr(getValue(path))
        arr.splice(index, 0, value)
        setValue(path, arr)
        return arr
      },
      remove(index: number | string) {
        let val = getValue(path)
        if (isNum(index) && isArr(val)) {
          val = [].concat(val)
          val.splice(index, 1)
          setValue(path, val)
        } else {
          setValue(path, undefined)
        }
        return val
      },
      unshift(value: any) {
        const arr = toArr(getValue(path))
        arr.unshift(value)
        setValue(path, arr)
        return arr
      },
      shift() {
        const arr = toArr(getValue(path))
        arr.shift()
        setValue(path, arr)
        return arr
      },
      move($from: number, $to: number) {
        const arr = toArr(getValue(path))
        const item = arr[$from]
        arr.splice($from, 1)
        arr.splice($to, 0, item)
        setValue(path, arr)
        return arr
      },
      validate() {
        return validate(path)
      }
    }
  }

  function reset({ forceClear = false, validate = true } = {}) {
    leadingUpdate(() => {
      graph.eachChildren('', fieldState => {
        fieldState.setState((state: IFieldState) => {
          state.modified = false
          state.errors = []
          state.effectErrors = []
          state.warnings = []
          state.effectWarnings = []
          if (forceClear) {
            if (isArr(state.value)) {
              state.value = []
            } else if (isObj(state.value)) {
              state.value = {}
            } else {
              state.value = undefined
            }
          } else {
            const value = clone(state.initialValue)
            if (isArr(state.value)) {
              if (isArr(value)) {
                state.value = value
              } else {
                state.value = []
              }
            } else if (isObj(state.value)) {
              if (isObj(value)) {
                state.value = value
              } else {
                state.value = {}
              }
            } else {
              state.value = value
            }
          }
        })
      })

      if (validate) {
        formApi.validate()
      }
    })
  }

  async function submit(
    onSubmit: (values: IFormState['values']) => Promise<any>
  ) {
    if (state.getState(state => state.submitting)) return new Promise(() => {})
    state.setState(state => {
      state.submitting = true
    })
    heart.notify(LifeCycleTypes.ON_FORM_SUBMIT_START, state)
    return validate()
      .then(validated => {
        if (isFn(onSubmit)) {
          return Promise.resolve(
            onSubmit(state.getState(state => state.values))
          ).then(payload => ({ validated, payload }))
        }
        return { validated, payload: undefined }
      })
      .then(({ validated: { errors, warnings }, payload }) => {
        state.setState(state => {
          state.submitting = false
        })
        heart.notify(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
        if (errors.length) {
          return Promise.reject(errors)
        }
        if (warnings.length) {
          console.warn(warnings)
        }
        return payload
      })
  }

  async function validate(path?: FormPathPattern, options?: {}) {
    clearTimeout(env.validateTimer)
    env.validateTimer = setTimeout(() => {
      state.setState(state => {
        state.validating = true
      })
    }, 60)
    return validator.validate(path, options).then((payload: any) => {
      state.setState(state => {
        state.validating = false
      })
      return payload
    })
  }

  function setFormState(callback?: (state: IFormState) => any) {
    leadingUpdate(() => {
      state.setState(computeUserFormState(callback, state))
    })
  }

  function getFormState(callback?: (state: IFormState) => any) {
    return state.getState(callback)
  }

  function batchRunTaskQueue(fieldState: typeof FieldState.prototype) {
    env.taskQueue.forEach((task, index) => {
      const { path, callbacks } = task
      if (path.match(fieldState.unsafe_getSourceState(state => state.name))) {
        callbacks.forEach(callback => {
          fieldState.setState(computeUserState(callback, fieldState))
        })
        if (!path.isWildMatchPattern && !path.isMatchPattern) {
          env.taskQueue.splice(index, 1)
          env.taskQueue.forEach(({ path: newPath }, index) => {
            if (newPath.toString() === path.toString()) {
              env.taskIndexes[path] = index
            }
          })
        }
      }
    })
  }

  function setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ) {
    if (!isFn(callback)) return
    let matchCount = 0
    let newPath = FormPath.getPath(path)
    graph.select(newPath, fieldState => {
      fieldState.setState(computeUserState(callback, fieldState))
      matchCount++
    })
    if (matchCount === 0 || newPath.isWildMatchPattern) {
      let taskIndex = env.taskIndexes[newPath]
      if (isValid(taskIndex)) {
        if (
          !env.taskQueue[taskIndex].callbacks.some(fn => isEqual(fn, callback))
        ) {
          env.taskQueue[taskIndex].callbacks.push(callback)
        }
      } else {
        env.taskIndexes[newPath] = env.taskQueue.length
        env.taskQueue.push({
          path: newPath,
          callbacks: [callback]
        })
      }
    }
  }

  function setFieldValue(path: FormPathPattern, value?: any) {
    setFieldState(path, state => {
      state.value = value
    })
  }

  function getFieldValue(path?: FormPathPattern) {
    return getFormValuesIn(path)
  }

  function setFieldInitialValue(path?: FormPathPattern, value?: any) {
    setFieldState(path, state => {
      state.initialValue = value
    })
  }

  function getFieldInitialValue(path?: FormPathPattern) {
    return getFormInitialValuesIn(path)
  }

  function computeUserState(
    callback: (state: IFieldState) => void,
    fieldState: typeof FieldState.prototype
  ) {
    return (draft: IFieldState) => {
      if (isFn(callback)) {
        callback(draft)
        const errors = fieldState.unsafe_getSourceState(state => state.errors)
        const warnings = fieldState.unsafe_getSourceState(
          state => state.warnings
        )
        draft.effectErrors = draft.errors
        draft.effectWarnings = draft.warnings
        draft.errors = errors
        draft.warnings = warnings
      }
    }
  }

  function computeUserFormState(
    callback?: (state: IFormState) => void,
    state?: typeof FormState.prototype
  ) {
    return (draft: IFormState) => {
      if (isFn(callback)) {
        callback(draft)
        const errors = state.unsafe_getSourceState(state => state.errors)
        const warnings = state.unsafe_getSourceState(state => state.warnings)
        draft.errors = errors
        draft.warnings = warnings
      }
    }
  }

  function getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ) {
    const fieldState = graph.select(path)
    return fieldState && fieldState.getState(callback)
  }

  function getFormGraph() {
    return graph.map(node => {
      return node.getState()
    })
  }

  function setFormGraph(nodes: {}) {
    each(nodes, (node: IFieldState | IVFieldState, key) => {
      let nodeState: any
      if (graph.exist(key)) {
        nodeState = graph.select(key)
        nodeState.unsafe_setSourceState(state => {
          Object.assign(state, node)
        })
      } else {
        if (node.displayName === 'VFieldState') {
          nodeState = registerVField({
            path: key
          })
          nodeState.unsafe_setSourceState(state => {
            Object.assign(state, node)
          })
        } else if (node.displayName === 'FieldState') {
          nodeState = registerField({
            path: key
          })
          nodeState.unsafe_setSourceState(state => {
            Object.assign(state, node)
          })
        }
      }
      if (nodeState) {
        nodeState.notify(state.getState())
      }
    })
  }

  function shadowUpdate(callback: () => void) {
    env.shadowStage = true
    if (isFn(callback)) {
      callback()
    }
    env.shadowStage = false
  }

  function leadingUpdate(callback: () => void) {
    env.leadingStage = true
    if (isFn(callback)) {
      callback()
    }
    env.leadingStage = false
  }

  const state = new FormState(options)
  const validator = new FormValidator(options)
  const graph = new FormGraph()
  const formApi = {
    submit,
    reset,
    validate,
    setFormState,
    getFormState,
    subscribe,
    unsubscribe,
    setFieldState,
    getFieldState,
    registerField,
    registerVField,
    createMutators,
    getFormGraph,
    setFormGraph,
    setFieldValue,
    setValue: deprecate(setValue, 'setValue', 'Please use the setFieldValue.'),
    getFieldValue,
    getValue: deprecate(getValue, 'getValue', 'Please use the getFieldValue.'),
    setFieldInitialValue,
    setInitialValue: deprecate(
      setValue,
      'setInitialValue',
      'Please use the setFieldInitialValue.'
    ),
    getFieldInitialValue,
    getInitialValue: deprecate(
      getFieldInitialValue,
      'getInitialValue',
      'Please use the getFieldInitialValue.'
    ),
    notify: <T>(type: string, payload: T) => {
      heart.notify(type, payload)
    }
  }
  const heart = new FormHeart({ ...options, context: formApi })
  const env = {
    validateTimer: null,
    graphChangeTimer: null,
    shadowStage: false,
    leadingStage: false,
    taskQueue: [],
    taskIndexes: {}
  }
  heart.notify(LifeCycleTypes.ON_FORM_WILL_INIT, state)
  state.subscribe(onFormChange)
  graph.appendNode('', state)
  state.setState((state: IFormState) => {
    state.initialized = true
  })
  return formApi
}

export const registerValidationFormats = FormValidator.registerFormats

export const registerValidationRules = FormValidator.registerRules

export const registerValidationMTEngine = FormValidator.registerMTEngine

export { setValidationLanguage, setValidationLocale }

export default createForm
