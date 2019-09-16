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
import { FormHeart } from './shared/lifecycle'
import { FormGraph } from './shared/graph'
import { FormState } from './state/form'
import { VirtualFieldState } from './state/virtual-field'
import { FieldState } from './state/field'
import {
  IFormState,
  IFieldState,
  IVirtualFieldState,
  IFormCreatorOptions,
  IFieldStateProps,
  IVirtualFieldStateProps,
  IForm,
  IFormSubmitResult,
  IFormValidateResult,
  IFormResetOptions,
  IField,
  IVirtualField,
  isField,
  isFieldState,
  FormHeartSubscriber,
  LifeCycleTypes
} from './types'
export * from './shared/lifecycle'
export * from './types'
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

export const createForm = (options: IFormCreatorOptions = {}): IForm => {
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
    const initializedChanged = state.hasChanged('initialized')
    const editableChanged = state.hasChanged('editable')
    if (valuesChanged || initialValuesChanged) {
      /**
       * 影子更新：不会触发具体字段的onChange，如果不这样处理，会导致任何值变化都会导致整树rerender
       */
      shadowUpdate(() => {
        graph.eachChildren('', (field: IField | IVirtualField) => {
          if (isField(field)) {
            field.setState(state => {
              if (state.visible) {
                if (valuesChanged) {
                  const path = FormPath.parse(state.name)
                  const parent = graph.getLatestParent(path)
                  const parentValue = getFormValuesIn(parent.path)
                  const parentPath = path.parent()
                  const value = getFormValuesIn(state.name)
                  /**
                   * https://github.com/alibaba/uform/issues/267 dynamic remove node
                   */
                  let removed = false
                  if (
                    isArr(parentValue) &&
                    !path.existIn(parentValue, parent.path)
                  ) {
                    if (
                      !parent.path
                        .getNearestChildPathBy(path)
                        .existIn(parentValue, parent.path)
                    ) {
                      graph.remove(state.name)
                      removed = true
                    }
                  } else {
                    each(env.removeNodes, (_, name) => {
                      if (path.includes(name)) {
                        graph.remove(path)
                        delete env.removeNodes[name]
                        removed = true
                      }
                    })
                  }
                  if (removed) return
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
          }
        })
      })
      if (valuesChanged) {
        heart.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE, state)
      }
      if (initialValuesChanged) {
        heart.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, state)
      }
    }

    if (editableChanged) {
      graph.eachChildren('', (field: IField | IVirtualField) => {
        if (isField(field)) {
          field.setState(state => {
            state.formEditable = published.editable
          })
        }
      })
    }

    if (unmountedChanged && published.unmounted) {
      heart.notify(LifeCycleTypes.ON_FORM_UNMOUNT, state)
    }
    if (mountedChanged && published.mounted) {
      heart.notify(LifeCycleTypes.ON_FORM_MOUNT, state)
    }
    if (initializedChanged) {
      heart.notify(LifeCycleTypes.ON_FORM_INIT, state)
    }
    changeGraph()
  }

  function onFieldChange({ onChange, field, path }) {
    return (published: IFieldState) => {
      const valueChanged = field.hasChanged('value')
      const initialValueChanged = field.hasChanged('initialValue')
      const visibleChanged = field.hasChanged('visible')
      const displayChanged = field.hasChanged('display')
      const unmountedChanged = field.hasChanged('unmounted')
      const mountedChanged = field.hasChanged('mounted')
      const initializedChanged = field.hasChanged('initialized')
      if (initializedChanged) {
        heart.notify(LifeCycleTypes.ON_FIELD_INIT, field)
        const isEmptyValue = !isValid(published.value)
        const isEmptyInitialValue = !isValid(published.initialValue)
        if (isEmptyValue || isEmptyInitialValue) {
          field.setState((state: IFieldState) => {
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
        heart.notify(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }

      if (valueChanged) {
        setFormValuesIn(path, published.value)
        heart.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      }
      if (initialValueChanged) {
        setFormInitialValuesIn(path, published.initialValue)
        heart.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, field)
      }
      changeGraph()
      if (isFn(onChange) && (!env.shadowStage || env.leadingStage)) {
        onChange(field)
      }
      heart.notify(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }
  }

  function onVirtualFieldChange({ onChange, field, path }) {
    return (published: IVirtualFieldState) => {
      const visibleChanged = field.hasChanged('visible')
      const displayChanged = field.hasChanged('display')
      const unmountedChanged = field.hasChanged('unmounted')
      const mountedChanged = field.hasChanged('mounted')
      const initializedChnaged = field.hasChanged('initialized')

      if (initializedChnaged) {
        heart.notify(LifeCycleTypes.ON_FIELD_INIT, field)
      }

      if (visibleChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVirtualFieldState) => {
            state.visible = published.visible
          })
        })
      }

      if (displayChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVirtualFieldState) => {
            state.display = published.display
          })
        })
      }

      if (unmountedChanged) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IVirtualFieldState) => {
            state.unmounted = published.unmounted
          })
        })
      }
      if (mountedChanged && published.mounted) {
        heart.notify(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }
      changeGraph()
      if (isFn(onChange)) onChange(field)
      heart.notify(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }
  }

  function registerVirtualField({
    name,
    path,
    props,
    onChange
  }: IVirtualFieldStateProps): IVirtualField {
    path = FormPath.parse(path || name)
    let field: IVirtualField
    let newPath = FormPath.getPath(path)
    if (graph.exist(newPath)) {
      field = graph.select(newPath)
    } else {
      field = new VirtualFieldState({
        path: newPath,
        useDirty: options.useDirty
      })
      graph.appendNode(newPath, field)
      field.subscribe(onVirtualFieldChange({ onChange, field, path: newPath }))
      field.batch(() => {
        batchRunTaskQueue(field)
        field.setState((state: IVirtualFieldState) => {
          state.initialized = true
          state.props = props
        })
      })
    }
    return field
  }

  function registerField({
    path,
    name,
    value,
    initialValue,
    required,
    rules,
    editable,
    onChange,
    props
  }: IFieldStateProps): IField {
    let field: IField
    path = FormPath.parse(path || name)
    if (graph.exist(path)) {
      field = graph.select(path)
    } else {
      field = new FieldState({
        path,
        useDirty: options.useDirty
      })
      heart.notify(LifeCycleTypes.ON_FIELD_WILL_INIT, field)
      graph.appendNode(path, field)
      graph.appendNode(transformDataPath(path), field)
      field.subscribe(onFieldChange({ onChange, field, path }))
      field.batch(() => {
        batchRunTaskQueue(field)
        field.setState((state: IFieldState) => {
          state.initialized = true
          state.value = isValid(value) ? value : initialValue
          state.initialValue = initialValue
          state.props = props
          state.required = required
          state.rules = rules
          state.editable = editable
          state.formEditable = options.editable
        })
      })
      validator.register(path, validate => {
        const { value, rules, editable, visible, unmounted } = field.getState()
        if (editable === false || visible === true || unmounted === true)
          return validate(value, [])
        clearTimeout((field as any).validateTimer)
        ;(field as any).validateTimer = setTimeout(() => {
          field.setState(state => {
            state.validating = true
          })
        }, 60)
        validate(value, rules).then(({ errors, warnings }) => {
          clearTimeout((field as any).validateTimer)
          field.setState((state: IFieldState) => {
            state.validating = false
            state.errors = errors
            state.warnings = warnings
          })
        })
      })
    }
    return field
  }

  function transformDataPath(path: FormPathPattern) {
    const newPath = FormPath.getPath(path)
    return newPath.reduce((path: FormPath, key: string, index: number) => {
      const realPath = newPath.slice(0, index + 1)
      const dataPath = path.concat(key)
      const selected = graph.select(realPath)
      if (selected && selected.displayName === 'VirtualFieldState') {
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
    const field = graph.select(path)
    if (field) {
      field.setState((state: IFieldState) => {
        state.value = values[0]
        state.values = values
      })
      heart.notify(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
    }
  }

  function removeValue(path: FormPathPattern) {
    const fieldPath = FormPath.parse(path)
    const field: IField = graph.select(fieldPath)
    if (field) {
      field.setState((state: IFieldState) => {
        state.value = undefined
        state.values = []
      }, true)
      deleteFormValuesIn(fieldPath)
      env.removeNodes[fieldPath.toString()] = true
      heart.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      heart.notify(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
      heart.notify(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }
  }

  function getValue(path: FormPathPattern) {
    const field = graph.select(path)
    if (field) {
      return field.getState((state: IFieldState) => state.value)
    }
  }

  function createMutators(path: FormPathPattern) {
    return {
      change(...values: any[]) {
        setValue(path, ...values)
        return values[0]
      },
      focus() {
        const field = graph.select(path)
        if (field) {
          field.setState((state: IFieldState) => {
            state.active = true
            state.visited = true
          })
        }
      },
      blur() {
        const field = graph.select(path)
        if (field) {
          field.setState((state: IFieldState) => {
            state.active = false
          })
        }
      },
      push(value: any) {
        const arr = toArr(getValue(path)).slice()
        arr.push(value)
        setValue(path, arr)
        return arr
      },
      pop() {
        const arr = toArr(getValue(path)).slice()
        arr.pop()
        setValue(path, arr)
        return arr
      },
      insert(index: number, value: any) {
        const arr = toArr(getValue(path)).slice()
        arr.splice(index, 0, value)
        setValue(path, arr)
        return arr
      },
      remove(index?: number | string) {
        const newPath = FormPath.parse(path)
        let val = getValue(path)
        if (isNum(index) && isArr(val)) {
          val = [].concat(val)
          val.splice(index, 1)
          setValue(path, val)
        } else {
          removeValue(index !== undefined ? newPath.concat(index) : newPath)
        }
      },
      unshift(value: any) {
        const arr = toArr(getValue(path)).slice()
        arr.unshift(value)
        setValue(path, arr)
        return arr
      },
      shift() {
        const arr = toArr(getValue(path)).slice()
        arr.shift()
        setValue(path, arr)
        return arr
      },
      move($from: number, $to: number) {
        const arr = toArr(getValue(path)).slice()
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

  function reset({
    forceClear = false,
    validate = true
  }: IFormResetOptions = {}) {
    leadingUpdate(() => {
      graph.eachChildren('', field => {
        field.setState((state: IFieldState) => {
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
      if (isFn(options.onReset)) {
        options.onReset()
      }
      if (validate) {
        formApi.validate()
      }
    })
  }

  async function submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult> {
    onSubmit = onSubmit || options.onSubmit
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
      .then<IFormSubmitResult>(response => {
        const {
          validated: { errors, warnings }
        } = response
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
        return response
      })
  }

  function mergeMessages(
    source: IFormState,
    target: IFormValidateResult,
    key: string
  ) {
    target[key].forEach(({ path, messages }) => {
      let finded = false
      each<{ path: string; message: string[] }>(source[key], (item, index) => {
        if (item.path === path) {
          source[key][index].messages = messages
          finded = true
          return false
        }
      })
      if (!finded) {
        source[key].push({
          path,
          messages
        })
      }
    })
  }

  async function validate(
    path?: FormPathPattern,
    opts?: {}
  ): Promise<IFormValidateResult> {
    clearTimeout(env.validateTimer)
    env.validateTimer = setTimeout(() => {
      state.setState(state => {
        state.validating = true
      })
    }, 60)
    heart.notify(LifeCycleTypes.ON_FORM_VALIDATE_START, state)
    return validator.validate(path, opts).then(payload => {
      state.setState(state => {
        state.validating = false
        mergeMessages(state, payload, 'errors')
        mergeMessages(state, payload, 'warnings')
      })
      if (isFn(options.onValidateFailed)) {
        options.onValidateFailed(
          state.getState(({ errors, warnings }) => ({ errors, warnings }))
        )
      }
      heart.notify(LifeCycleTypes.ON_FORM_VALIDATE_END, state)
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

  function batchRunTaskQueue(field: IField | IVirtualField) {
    env.taskQueue.forEach((task, index) => {
      const { path, callbacks } = task
      if (path.match(field.unsafe_getSourceState(state => state.name))) {
        callbacks.forEach(callback => {
          field.setState(computeUserState(callback, field))
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
    graph.select(newPath, field => {
      field.setState(computeUserState(callback, field))
      matchCount++
    })
    if (matchCount === 0 || newPath.isWildMatchPattern) {
      let taskIndex = env.taskIndexes[newPath.toString()]
      if (isValid(taskIndex)) {
        if (
          !env.taskQueue[taskIndex].callbacks.some(fn => isEqual(fn, callback))
        ) {
          env.taskQueue[taskIndex].callbacks.push(callback)
        }
      } else {
        env.taskIndexes[newPath.toString()] = env.taskQueue.length
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

  function computeUserState<
    State = IFieldState | IVirtualFieldState,
    Field = IField | IVirtualField
  >(callback: (state: State) => void, field: Field) {
    return (draft: State) => {
      if (isFn(callback) && isField(field) && isFieldState(draft)) {
        callback(draft)
        const errors = field.unsafe_getSourceState(state => state.errors)
        const warnings = field.unsafe_getSourceState(state => state.warnings)
        draft.formEditable = field.unsafe_getSourceState(
          state => state.formEditable
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
    const field = graph.select(path)
    return field && field.getState(callback)
  }

  function getFormGraph() {
    return graph.map(node => {
      return node.getState()
    })
  }

  function setFormGraph(nodes: {}) {
    each(nodes, (node: IFieldState | IVirtualFieldState, key) => {
      let nodeState: any
      if (graph.exist(key)) {
        nodeState = graph.select(key)
        nodeState.unsafe_setSourceState(state => {
          Object.assign(state, node)
        })
      } else {
        if (node.displayName === 'VirtualFieldState') {
          nodeState = registerVirtualField({
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
    setFieldState,
    getFieldState,
    registerField,
    registerVirtualField,
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
    subscribe: (callback?: FormHeartSubscriber) => {
      heart.subscribe(callback)
    },
    unsubscribe: (callback?: FormHeartSubscriber) => {
      heart.unsubscribe(callback)
    },
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
    taskIndexes: {},
    removeNodes: {}
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

export {
  setValidationLanguage,
  setValidationLocale,
  FormPath,
  FormPathPattern,
  FormGraph
}

export default createForm
