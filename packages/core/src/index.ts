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
  isObj
} from '@uform/shared'
import {
  FormValidator,
  setValidationLanguage,
  setValidationLocale,
  ValidateFieldOptions
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
  FormHeartSubscriber,
  LifeCycleTypes,
  isVirtualField,
  isFormState,
  isFieldState,
  isVirtualFieldState
} from './types'
export * from './shared/lifecycle'
export * from './types'

export function createForm<FieldProps, VirtualFieldProps>(
  options: IFormCreatorOptions = {}
): IForm {
  function onGraphChange({ type, payload }) {
    heart.publish(LifeCycleTypes.ON_FORM_GRAPH_CHANGE, graph)
    if (type === 'GRAPH_NODE_WILL_UNMOUNT') {
      validator.unregister(payload.path.toString())
    }
  }

  function onFormChange(published: IFormState) {
    heart.publish(LifeCycleTypes.ON_FORM_CHANGE, state)
    const valuesChanged = state.isDirty('values')
    const initialValuesChanged = state.isDirty('initialValues')
    const unmountedChanged = state.isDirty('unmounted')
    const mountedChanged = state.isDirty('mounted')
    const initializedChanged = state.isDirty('initialized')
    const editableChanged = state.isDirty('editable')
    if (valuesChanged || initialValuesChanged) {
      /**
       * 影子更新：不会触发具体字段的onChange，如果不这样处理，会导致任何值变化都会导致整树rerender
       */
      shadowUpdate(() => {
        graph.eachChildren((field: IField | IVirtualField) => {
          if (isField(field)) {
            field.setState(state => {
              if (state.visible) {
                if (valuesChanged) {
                  const path = FormPath.parse(state.name)
                  const parent = graph.getLatestParent(path)
                  const parentValue = getFormValuesIn(parent.path)
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
                    state.value = isValid(value) ? value : state.initialValue
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
        if (isFn(options.onChange)) {
          options.onChange(published.values)
        }
        heart.publish(LifeCycleTypes.ON_FORM_VALUES_CHANGE, state)
      }
      if (initialValuesChanged) {
        heart.publish(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, state)
      }
    }

    if (editableChanged) {
      graph.eachChildren((field: IField | IVirtualField) => {
        if (isField(field)) {
          field.setState(state => {
            state.formEditable = published.editable
          })
        }
      })
    }

    if (unmountedChanged && published.unmounted) {
      heart.publish(LifeCycleTypes.ON_FORM_UNMOUNT, state)
    }
    if (mountedChanged && published.mounted) {
      heart.publish(LifeCycleTypes.ON_FORM_MOUNT, state)
    }
    if (initializedChanged) {
      heart.publish(LifeCycleTypes.ON_FORM_INIT, state)
    }
  }

  function onFieldChange({ field, path }) {
    return (published: IFieldState<FieldProps>) => {
      const valueChanged = field.isDirty('value')
      const initialValueChanged = field.isDirty('initialValue')
      const visibleChanged = field.isDirty('visible')
      const displayChanged = field.isDirty('display')
      const unmountedChanged = field.isDirty('unmounted')
      const mountedChanged = field.isDirty('mounted')
      const initializedChanged = field.isDirty('initialized')
      const warningsChanged = field.isDirty('warnings')
      const errorsChanges = field.isDirty('errors')
      if (initializedChanged) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
        const isEmptyValue = !isValid(published.value)
        const isEmptyInitialValue = !isValid(published.initialValue)
        if (isEmptyValue || isEmptyInitialValue) {
          field.setState((state: IFieldState<FieldProps>) => {
            if (isEmptyValue) state.value = getFormValuesIn(state.name)
            if (isEmptyInitialValue)
              state.initialValue = getFormInitialValuesIn(state.name)
          }, true)
        }
      }
      if (displayChanged || visibleChanged) {
        if (visibleChanged) {
          if (!published.visible) {
            deleteFormValuesIn(path, true)
          } else {
            setFormValuesIn(path, published.value)
          }
        }
        graph.eachChildren(
          path,
          childState => {
            childState.setState((state: IFieldState<FieldProps>) => {
              if (visibleChanged) {
                state.visible = published.visible
              }
              if (displayChanged) {
                state.display = published.display
              }
            })
          },
          false
        )
      }
      if (
        unmountedChanged &&
        (published.display !== false || published.visible === false)
      ) {
        if (published.unmounted) {
          deleteFormValuesIn(path, true)
        } else {
          setFormValuesIn(path, published.value)
        }
      }
      if (mountedChanged && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }
      if (valueChanged) {
        setFormValuesIn(path, published.value)
        heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      }
      if (initialValueChanged) {
        setFormInitialValuesIn(path, published.initialValue)
        heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, field)
      }

      if (errorsChanges) {
        syncFormMessages('errors', published.name, published.errors)
      }

      if (warningsChanged) {
        syncFormMessages('warnings', published.name, published.warnings)
      }
      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
      if (env.leadingStage) return
      if (env.shadowStage) return false
    }
  }

  function onVirtualFieldChange({ field, path }) {
    return (published: IVirtualFieldState<VirtualFieldProps>) => {
      const visibleChanged = field.isDirty('visible')
      const displayChanged = field.isDirty('display')
      const unmountedChanged = field.isDirty('unmounted')
      const mountedChanged = field.isDirty('mounted')
      const initializedChnaged = field.isDirty('initialized')

      if (initializedChnaged) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
      }

      if (visibleChanged) {
        graph.eachChildren(path, childState => {
          childState.setState(
            (state: IVirtualFieldState<VirtualFieldProps>) => {
              state.visible = published.visible
            }
          )
        })
      }

      if (displayChanged) {
        graph.eachChildren(path, childState => {
          childState.setState(
            (state: IVirtualFieldState<VirtualFieldProps>) => {
              state.display = published.display
            }
          )
        })
      }

      if (unmountedChanged) {
        graph.eachChildren(path, childState => {
          childState.setState(
            (state: IVirtualFieldState<VirtualFieldProps>) => {
              state.unmounted = published.unmounted
            }
          )
        })
      }
      if (mountedChanged && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }
      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }
  }

  function registerVirtualField({
    name,
    path,
    props,
    computeState,
    useDirty
  }: IVirtualFieldStateProps): IVirtualField {
    let nodePath = FormPath.parse(path || name)
    let dataPath = transformDataPath(nodePath)
    let field: IVirtualField
    const createField = (field?: IVirtualField) => {
      field =
        field ||
        new VirtualFieldState({
          nodePath,
          dataPath,
          computeState,
          useDirty: isValid(useDirty) ? useDirty : options.useDirty
        })
      field.subscription = {
        notify: onVirtualFieldChange({ field, path: nodePath })
      }
      field.batch(() => {
        field.setState((state: IVirtualFieldState<VirtualFieldProps>) => {
          state.initialized = true
          state.props = props
        })
        batchRunTaskQueue(field, nodePath)
      })
      return field
    }
    if (graph.exist(nodePath)) {
      field = graph.get(nodePath)
      field = createField(field)
      if (isField(field)) {
        graph.replace(nodePath, field)
      }
    } else {
      field = createField()
      graph.appendNode(nodePath, field)
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
    computeState,
    useDirty,
    props
  }: Exclude<IFieldStateProps, 'dataPath' | 'nodePath'>): IField {
    let field: IField
    let nodePath = FormPath.parse(path || name)
    let dataPath = transformDataPath(nodePath)
    const createField = (field?: IField) => {
      field =
        field ||
        new FieldState({
          nodePath,
          dataPath,
          computeState,
          useDirty: isValid(useDirty) ? useDirty : options.useDirty
        })
      field.subscription = {
        notify: onFieldChange({ field, path: nodePath })
      }
      heart.publish(LifeCycleTypes.ON_FIELD_WILL_INIT, field)
      field.batch(() => {
        field.setState((state: IFieldState<FieldProps>) => {
          const formValue = getFormValuesIn(dataPath)
          const formInitialValue = getFormInitialValuesIn(dataPath)
          state.initialized = true
          if (isValid(value)) {
            // value > formValue > initialValue
            state.value = value
          } else {
            state.value = isValid(formValue) ? formValue : initialValue
          }
          // initialValue > formInitialValue
          state.initialValue = isValid(initialValue)
            ? initialValue
            : formInitialValue

          state.props = props
          state.required = required
          state.rules = rules as any
          state.selfEditable = editable
          state.formEditable = options.editable
        })
        batchRunTaskQueue(field, nodePath)
      })
      validator.register(nodePath, validate => {
        const { value, rules, editable, visible, unmounted } = field.getState()
        // 不需要校验的情况有: 非编辑态(editable)，已销毁(unmounted), 逻辑上不可见(visible)
        if (editable === false || visible === false || unmounted === true)
          return validate(value, [])
        clearTimeout((field as any).validateTimer)
        ;(field as any).validateTimer = setTimeout(() => {
          field.setState(state => {
            state.validating = true
          })
        }, 60)
        validate(value, rules).then(({ errors, warnings }) => {
          clearTimeout((field as any).validateTimer)
          field.setState((state: IFieldState<FieldProps>) => {
            state.validating = false
            state.ruleErrors = errors
            state.ruleWarnings = warnings
          })
        })
      })
      return field
    }
    if (graph.exist(nodePath)) {
      field = graph.get(nodePath)
      field = createField(field)
      if (isVirtualField(field)) {
        graph.replace(nodePath, field)
      }
    } else {
      field = createField()
      graph.appendNode(nodePath, field)
    }
    return field
  }

  //实时同步Form Messages
  function syncFormMessages(type: string, path: string, messages: string[]) {
    state.unsafe_setSourceState(state => {
      let foundField = false
      state[type] = state[type] || []
      state[type] = state[type].reduce((buf: any, item: any) => {
        if (item.path === path) {
          foundField = true
          return messages.length ? buf.concat({ path, messages }) : buf
        } else {
          return buf.concat(item)
        }
      }, [])
      if (!foundField && messages.length) {
        state[type].push({
          path,
          messages
        })
      }
      if (state.errors.length) {
        state.invalid = true
        state.valid = false
      } else {
        state.invalid = false
        state.valid = true
      }
    })
  }

  function transformDataPath(path: FormPathPattern) {
    const newPath = FormPath.getPath(path)
    return newPath.reduce((path: FormPath, key: string, index: number) => {
      if (index >= newPath.length - 1) return path.concat(key)
      const realPath = newPath.slice(0, index + 1)
      const dataPath = path.concat(key)
      const selected = graph.get(realPath)
      if (isVirtualField(selected)) {
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
      FormPath.setIn(state[key], path, value)
    }, silent)
  }

  function deleteFormIn(path: FormPathPattern, key: string, silent?: boolean) {
    state.setState(state => {
      FormPath.deleteIn(state[key], path)
    }, silent)
  }

  function deleteFormValuesIn(path: FormPathPattern, silent?: boolean) {
    deleteFormIn(transformDataPath(path), 'values', silent)
  }

  function setFormValuesIn(
    path: FormPathPattern,
    value?: any,
    silent?: boolean
  ) {
    return setFormIn(transformDataPath(path), 'values', value, silent)
  }

  function setFormInitialValuesIn(
    path: FormPathPattern,
    value?: any,
    silent?: boolean
  ) {
    return setFormIn(transformDataPath(path), 'initialValues', value, silent)
  }

  function getFormIn(path: FormPathPattern, key?: string) {
    return state.getState(state => FormPath.getIn(state[key], path))
  }

  function getFormValuesIn(path: FormPathPattern) {
    return getFormIn(transformDataPath(path), 'values')
  }

  function getFormInitialValuesIn(path: FormPathPattern) {
    return getFormIn(transformDataPath(path), 'initialValues')
  }

  function createMutators(field: IField) {
    if (!(field instanceof FieldState)) {
      throw new Error(
        'The `createMutators` can only accept FieldState instance.'
      )
    }

    function setValue(...values: any[]) {
      field.setState((state: IFieldState<FieldProps>) => {
        state.value = values[0]
        state.values = values
      })
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
    }

    function removeValue(key: string | number) {
      const name = field.unsafe_getSourceState(state => state.name)
      leadingUpdate(() => {
        if (isValid(key)) {
          const childPath = FormPath.parse(name).concat(key)
          const child = graph.get(childPath)
          env.removeNodes[childPath.toString()] = true
          deleteFormValuesIn(childPath)
          child.setState((fieldState: IFieldState<FieldProps>) => {
              fieldState.value = undefined
              fieldState.values = []
          }, true)
        } else {
          env.removeNodes[name] = true
          deleteFormValuesIn(name)
          field.setState((fieldState: IFieldState<FieldProps>) => {
            fieldState.value = undefined
            fieldState.values = []
          }, true)
        }
      })
      heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }

    function getValue() {
      return field.unsafe_getSourceState(state => state.value)
    }
    return {
      change(...values: any[]) {
        setValue(...values)
        return values[0]
      },
      focus() {
        field.setState((state: IFieldState<FieldProps>) => {
          state.active = true
        })
      },
      blur() {
        field.setState((state: IFieldState<FieldProps>) => {
          state.active = false
          state.visited = true
        })
      },
      push(value?: any) {
        const arr = toArr(getValue()).slice()
        arr.push(value)
        setValue(arr)
        return arr
      },
      pop() {
        const arr = toArr(getValue()).slice()
        arr.pop()
        setValue(arr)
        return arr
      },
      insert(index: number, value: any) {
        const arr = toArr(getValue()).slice()
        arr.splice(index, 0, value)
        setValue(arr)
        return arr
      },
      remove(index?: number | string) {
        let val = getValue()
        if (isNum(index) && isArr(val)) {
          val = [].concat(val)
          val.splice(index, 1)
          setValue(val)
        } else {
          removeValue(index)
        }
      },
      exist(index?: number | string) {
        const newPath = field.unsafe_getSourceState(state =>
          FormPath.parse(state.path)
        )
        let val = getValue()
        return (index !== undefined ? newPath.concat(index) : newPath).existIn(
          val,
          newPath
        )
      },
      unshift(value: any) {
        const arr = toArr(getValue()).slice()
        arr.unshift(value)
        setValue(arr)
        return arr
      },
      shift() {
        const arr = toArr(getValue()).slice()
        arr.shift()
        setValue(arr)
        return arr
      },
      move($from: number, $to: number) {
        const arr = toArr(getValue()).slice()
        const item = arr[$from]
        arr.splice($from, 1)
        arr.splice($to, 0, item)
        setValue(arr)
        return arr
      },
      moveUp(index: number) {
        const arr = toArr(getValue()).slice()
        const item = arr[index]
        const len = arr.length
        arr.splice(index, 1)
        arr.splice(index - 1 < 0 ? len - 1 : index - 1, 0, item)
        setValue(arr)
        return arr
      },
      moveDown(index: number) {
        const arr = toArr(getValue()).slice()
        const item = arr[index]
        const len = arr.length
        arr.splice(index, 1)
        arr.splice(index + 1 > len ? 0 : index + 1, 0, item)
        setValue(arr)
        return arr
      },
      validate() {
        return validate(field.unsafe_getSourceState(state => state.path))
      }
    }
  }

  function clearErrors(pattern: FormPathPattern = '*') {
    // 1. 指定路径或全部子路径清理
    graph.eachChildren('', pattern, field => {
      if (isField(field)) {
        field.setState(state => {
          state.ruleErrors = []
          state.ruleWarnings = []
          state.effectErrors = []
          state.effectWarnings = []
        })
      }
    })
  }

  async function reset({
    selector = '*',
    forceClear = false,
    validate = true
  }: IFormResetOptions = {}): Promise<void | IFormValidateResult> {
    let result: Promise<void | IFormValidateResult>
    leadingUpdate(() => {
      graph.eachChildren('', selector, field => {
        field.setState((state: IFieldState<FieldProps>) => {
          state.modified = false
          state.ruleErrors = []
          state.ruleWarnings = []
          state.effectErrors = []
          state.effectWarnings = []
          // forceClear仅对设置initialValues的情况下有意义
          if (forceClear || !isValid(state.initialValue)) {
            if (isArr(state.value)) {
              state.value = []
            } else if (!isObj(state.value)) {
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
        result = formApi.validate()
      }
    })

    return result
  }

  async function submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<IFormSubmitResult> {
    // 重复提交，返回前一次的promise
    if (state.getState(state => state.submitting)) return env.submittingTask
    heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_START, state)
    onSubmit = onSubmit || options.onSubmit
    state.setState(state => {
      state.submitting = true
    })
    env.submittingTask = validate()
      .then(() => {
        const validated = state.getState(({ errors, warnings }) => ({
          errors,
          warnings
        })) //因为要合并effectErrors/effectWarnings，所以不能直接读validate的结果
        if (validated.errors.length) {
          state.setState(state => {
            state.submitting = false
          })
          heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
          return Promise.reject(validated.errors)
        }
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
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
        if (errors.length) {
          return Promise.reject(errors)
        }
        if (warnings.length) {
          console.warn(warnings)
        }
        return response
      })
    return env.submittingTask
  }

  async function validate(
    path?: FormPathPattern,
    opts?: ValidateFieldOptions
  ): Promise<IFormValidateResult> {
    if (!state.getState(state => state.validating)) {
      state.unsafe_setSourceState(state => {
        state.validating = true
      })
      // 渲染优化
      clearTimeout(env.validateTimer)
      env.validateTimer = setTimeout(() => {
        state.notify()
      }, 60)
    }

    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_START, state)
    return validator.validate(path, opts).then(payload => {
      clearTimeout(env.validateTimer)
      state.setState(state => {
        state.validating = false
      })
      if (isFn(options.onValidateFailed) && payload.errors.length) {
        options.onValidateFailed(payload)
      }
      heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_END, state)
      return payload
    })
  }

  function setFormState(
    callback?: (state: IFormState) => any,
    silent?: boolean
  ) {
    leadingUpdate(() => {
      state.setState(callback, silent)
    })
  }

  function getFormState(callback?: (state: IFormState) => any) {
    return state.getState(callback)
  }

  function batchRunTaskQueue(field: IField | IVirtualField, path: FormPath) {
    env.taskQueue.forEach((task, index) => {
      const { pattern, callbacks } = task
      if (matchStrategy(pattern, field)) {
        callbacks.forEach(callback => {
          field.setState(callback)
        })
        if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
          env.taskQueue.splice(index, 1)
          env.taskQueue.forEach(({ pattern }, index) => {
            if (pattern.toString() === path.toString()) {
              env.taskIndexes[path.toString()] = index
            }
          })
        }
      }
    })
  }

  function setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState<FieldProps>) => void,
    silent?: boolean
  ) {
    if (!isFn(callback)) return
    let matchCount = 0
    let pattern = FormPath.getPath(path)
    graph.select(pattern, field => {
      field.setState(callback, silent)
      matchCount++
    })
    if (matchCount === 0 || pattern.isWildMatchPattern) {
      let taskIndex = env.taskIndexes[pattern.toString()]
      if (isValid(taskIndex)) {
        if (
          env.taskQueue[taskIndex] &&
          !env.taskQueue[taskIndex].callbacks.some(fn => isEqual(fn, callback))
        ) {
          env.taskQueue[taskIndex].callbacks.push(callback)
        }
      } else {
        env.taskIndexes[pattern.toString()] = env.taskQueue.length
        env.taskQueue.push({
          pattern,
          callbacks: [callback]
        })
      }
    }
  }

  function setFieldValue(path: FormPathPattern, value?: any, silent?: boolean) {
    setFieldState(
      path,
      state => {
        state.value = value
      },
      silent
    )
  }

  function getFieldValue(path?: FormPathPattern) {
    return getFieldState(path, state => {
      return state.value
    })
  }

  function setFieldInitialValue(
    path?: FormPathPattern,
    value?: any,
    silent?: boolean
  ) {
    setFieldState(
      path,
      state => {
        state.initialValue = value
      },
      silent
    )
  }

  function getFieldInitialValue(path?: FormPathPattern) {
    return getFieldState(path, state => {
      return state.initialValue
    })
  }

  function getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState<FieldProps>) => any
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
    each(
      nodes,
      (
        node: IFieldState<FieldProps> | IVirtualFieldState<VirtualFieldProps>,
        key
      ) => {
        let nodeState: any
        if (graph.exist(key)) {
          nodeState = graph.get(key)
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
      }
    )
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

  function matchStrategy(
    pattern: FormPathPattern,
    node: IField | IVirtualField
  ) {
    const matchPattern = FormPath.parse(pattern)
    return node.unsafe_getSourceState(
      state => matchPattern.match(state.name) || matchPattern.match(state.path)
    )
  }

  //在subscribe中必须同步使用，否则会监听不到变化
  function hasChanged(target: any, path: FormPathPattern): boolean {
    if (!env.publishing) {
      throw new Error(
        'The watch function must be used synchronously in the subscribe callback.'
      )
    }
    if (isFormState(target)) {
      return state.hasChanged(path)
    } else if (isFieldState(target) || isVirtualFieldState(target)) {
      const node = graph.get(target.path)
      return node && node.hasChanged(path)
    } else {
      throw new Error(
        'Illegal parameter,You must pass the correct state object(FormState/FieldState/VirtualFieldState).'
      )
    }
  }

  const state = new FormState(options)
  const validator = new FormValidator(options)
  const graph = new FormGraph({
    matchStrategy
  })
  const formApi = {
    submit,
    reset,
    hasChanged,
    clearErrors,
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
    unsafe_do_not_use_transform_data_path: transformDataPath, //eslint-disable-line
    getFieldValue,
    setFieldInitialValue,
    getFieldInitialValue,
    subscribe: (callback?: FormHeartSubscriber) => {
      return heart.subscribe(callback)
    },
    unsubscribe: (id: number) => {
      heart.unsubscribe(id)
    },
    notify: <T>(type: string, payload: T) => {
      heart.publish(type, payload)
    }
  }
  const heart = new FormHeart({
    ...options,
    context: formApi,
    beforeNotify: () => {
      env.publishing = true
    },
    afterNotify: () => {
      env.publishing = false
    }
  })
  const env = {
    validateTimer: null,
    graphChangeTimer: null,
    shadowStage: false,
    leadingStage: false,
    publishing: false,
    taskQueue: [],
    taskIndexes: {},
    removeNodes: {},
    submittingTask: undefined
  }
  heart.publish(LifeCycleTypes.ON_FORM_WILL_INIT, state)
  state.subscription = {
    notify: onFormChange
  }

  graph.appendNode('', state)
  state.setState((state: IFormState) => {
    state.initialized = true
  })
  graph.subscribe(onGraphChange)
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
