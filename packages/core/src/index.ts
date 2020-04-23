import {
  isFn,
  isEqual,
  toArr,
  isNum,
  isArr,
  clone,
  log,
  isValid,
  FormPath,
  FormPathPattern,
  BigData,
  each,
  isObj,
  isPlainObj
} from '@formily/shared'
import {
  FormValidator,
  setValidationLanguage,
  setValidationLocale
} from '@formily/validator'
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
  isVirtualFieldState,
  IFormExtendedValidateFieldOptions
} from './types'
export * from './shared/lifecycle'
export * from './types'

export function createForm<FieldProps, VirtualFieldProps>(
  options: IFormCreatorOptions = {}
) {
  function onGraphChange({ type, payload }) {
    heart.publish(LifeCycleTypes.ON_FORM_GRAPH_CHANGE, graph)
    if (type === 'GRAPH_NODE_WILL_UNMOUNT') {
      validator.unregister(payload.path.toString())
    }
  }

  function syncFieldValues(state: IFieldState) {
    const dataPath = FormPath.parse(state.name)
    const parent = graph.getLatestParent(state.path)
    const parentValue = getFormValuesIn(parent.path)
    const value = getFormValuesIn(state.name)
    /**
     * https://github.com/alibaba/formily/issues/267 dynamic remove node
     */
    let removed = false
    if (isArr(parentValue) && !dataPath.existIn(parentValue, parent.path)) {
      if (
        !parent.path
          .getNearestChildPathBy(state.path)
          .existIn(parentValue, parent.path)
      ) {
        graph.remove(state.path)
        removed = true
      }
    } else {
      each(env.removeNodes, (_, name) => {
        if (dataPath.includes(name)) {
          graph.remove(state.path)
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

  function syncFieldIntialValues(state: IFieldState) {
    if (state.name === '') return
    const initialValue = getFormInitialValuesIn(state.name)
    if (!isEqual(initialValue, state.initialValue)) {
      state.initialValue = initialValue
      if (!isValid(state.value)) {
        state.value = initialValue
      } else if (
        /array/gi.test(state.dataType) &&
        state.value &&
        state.value.length === 0
      ) {
        state.value = initialValue
      }
    }
  }

  function notifyFormValuesChange() {
    if (
      isFn(options.onChange) &&
      state.state.mounted &&
      !state.state.unmounted
    ) {
      clearTimeout(env.onChangeTimer)
      env.onChangeTimer = setTimeout(() => {
        if (state.state.unmounted) return
        options.onChange(clone(getFormValuesIn('')))
      })
    }
    heart.publish(LifeCycleTypes.ON_FORM_VALUES_CHANGE, state)
  }

  function notifyFormInitialValuesChange() {
    heart.publish(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, state)
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
      const updateFields = (field: IField | IVirtualField) => {
        if (isField(field)) {
          field.setState(state => {
            if (valuesChanged) {
              syncFieldValues(state)
            }
            if (initialValuesChanged) {
              syncFieldIntialValues(state)
            }
          })
        }
      }
      if (valuesChanged || initialValuesChanged) {
        /*
         * 考虑初始化的时候还没生成节点树
         * 2种数据同步策略，
         * 1. 精确同步，基于操作节点，静默更新父子节点，同时不会回流onFormChange
         * 2. 批量同步，但是会采用异步节流方式合并同步任务
         */
        if (graph.size > 20) {
          clearTimeout(env.syncFormStateTimer)
          env.syncFormStateTimer = setTimeout(() => {
            graph.eachChildren(updateFields)
          })
        } else {
          graph.eachChildren(updateFields)
        }
        // }
      }
      if (valuesChanged) {
        notifyFormValuesChange()
      }
      if (initialValuesChanged) {
        notifyFormInitialValuesChange()
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

  function updateRecoverableShownState(
    parentState:
      | IVirtualFieldState<VirtualFieldProps>
      | IFieldState<FieldProps>,
    childState: IVirtualFieldState<VirtualFieldProps> | IFieldState<FieldProps>,
    name: 'visible' | 'display'
  ) {
    const lastShownState = env.lastShownStates[childState.path]
    const lastStateValue = childState[name]
    if (parentState[name] && lastShownState && lastShownState[name] === false) {
      childState[name] = false
      delete lastShownState[name]
      if (
        !lastShownState.hasOwnProperty('visible') &&
        !lastShownState.hasOwnProperty('display')
      ) {
        delete env.lastShownStates[childState.path]
      }
    } else {
      childState[name] = parentState[name]
    }
    if (!parentState[name] && !lastStateValue) {
      if (!lastShownState) {
        env.lastShownStates[childState.path] = {}
      }
      env.lastShownStates[childState.path][name] = false
    }
  }

  function onFieldChange({ field, path }) {
    function notifyTreeFromValues() {
      field.setState(syncFieldValues)
      graph.eachParent(path, (field: IField) => {
        if (isField(field)) {
          field.setState(syncFieldValues, true)
        }
      })
      graph.eachChildren(path, (field: IField) => {
        if (isField(field)) {
          field.setState(syncFieldValues)
        }
      })
      notifyFormValuesChange()
    }
    function notifyTreeFromInitialValues() {
      field.setState(syncFieldIntialValues)
      graph.eachParent(path, (field: IField) => {
        if (isField(field)) {
          field.setState(syncFieldIntialValues, true)
        }
      })
      graph.eachChildren(path, (field: IField) => {
        if (isField(field)) {
          field.setState(syncFieldIntialValues)
        }
      })
      notifyFormInitialValuesChange()
    }
    return (published: IFieldState<FieldProps>) => {
      const valueChanged = field.isDirty('value')
      const initialValueChanged = field.isDirty('initialValue')
      const visibleChanged = field.isDirty('visible')
      const displayChanged = field.isDirty('display')
      const unmountedChanged = field.isDirty('unmounted')
      const mountedChanged = field.isDirty('mounted')
      const initializedChanged = field.isDirty('initialized')
      const warningsChanged = field.isDirty('warnings')
      const errorsChanged = field.isDirty('errors')
      const editableChanged = field.isDirty('editable')

      if (initializedChanged) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
        const isEmptyValue = !isValid(published.value)
        const isEmptyInitialValue = !isValid(published.initialValue)
        if (isEmptyValue || isEmptyInitialValue) {
          field.setSourceState((state: IFieldState<FieldProps>) => {
            if (isEmptyValue) {
              const formValue = getFormValuesIn(state.name)
              state.value = isValid(formValue) ? formValue : state.value
            }
            if (isEmptyInitialValue) {
              const formInitialValue = getFormInitialValuesIn(state.name)
              state.initialValue = isValid(formInitialValue)
                ? formInitialValue
                : state.initialValue
            }
          })
        }
      }
      const wasHidden =
        published.visible == false || published.unmounted === true
      if (valueChanged) {
        if (!wasHidden) {
          setFormValuesIn(path, published.value, true)
          notifyTreeFromValues()
        }
        heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      }
      if (initialValueChanged) {
        if (!wasHidden) {
          setFormInitialValuesIn(path, published.initialValue, true)
          notifyTreeFromInitialValues()
        }
        heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, field)
      }
      if (displayChanged || visibleChanged) {
        if (visibleChanged) {
          if (!published.visible) {
            if (isValid(published.value)) {
              field.setSourceState((state: IFieldState<FieldProps>) => {
                state.visibleCacheValue = published.value
              })
            }
            deleteFormValuesIn(path)
            notifyTreeFromValues()
          } else {
            if (!existFormValuesIn(path)) {
              setFormValuesIn(
                path,
                isValid(published.visibleCacheValue)
                  ? published.visibleCacheValue
                  : published.initialValue,
                true
              )
              notifyTreeFromValues()
            }
          }
        }
        graph.eachChildren(path, childState => {
          childState.setState((state: IFieldState<FieldProps>) => {
            if (visibleChanged) {
              updateRecoverableShownState(published, state, 'visible')
            }
            if (displayChanged) {
              updateRecoverableShownState(published, state, 'display')
            }
          }, true)
        })
      }
      if (
        unmountedChanged &&
        (published.display !== false || published.visible === false) &&
        published.unmountRemoveValue
      ) {
        if (published.unmounted) {
          if (isValid(published.value)) {
            field.setSourceState((state: IFieldState<FieldProps>) => {
              state.visibleCacheValue = published.value
            })
          }
          deleteFormValuesIn(path, true)
          notifyTreeFromValues()
        } else {
          if (!existFormValuesIn(path)) {
            setFormValuesIn(
              path,
              isValid(published.visibleCacheValue)
                ? published.visibleCacheValue
                : published.initialValue,
              true
            )
            notifyTreeFromValues()
          }
        }
        heart.publish(LifeCycleTypes.ON_FIELD_UNMOUNT, field)
      }
      if (mountedChanged && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }

      if (errorsChanged) {
        syncFormMessages('errors', published)
      }

      if (warningsChanged) {
        syncFormMessages('warnings', published)
      }

      if (
        unmountedChanged ||
        visibleChanged ||
        displayChanged ||
        editableChanged
      ) {
        //fix #682
        resetFormMessages(published)
      }

      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
    }
  }

  function onVirtualFieldChange({ field, path }) {
    return (published: IVirtualFieldState<VirtualFieldProps>) => {
      const visibleChanged = field.isDirty('visible')
      const displayChanged = field.isDirty('display')
      const mountedChanged = field.isDirty('mounted')
      const initializedChanged = field.isDirty('initialized')

      if (initializedChanged) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
      }

      if (visibleChanged || displayChanged) {
        graph.eachChildren(path, childState => {
          childState.setState(
            (state: IVirtualFieldState<VirtualFieldProps>) => {
              if (visibleChanged) {
                updateRecoverableShownState(published, state, 'visible')
              }
              if (displayChanged) {
                updateRecoverableShownState(published, state, 'display')
              }
            },
            true
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
    display,
    visible,
    computeState,
    useDirty
  }: IVirtualFieldStateProps): IVirtualField {
    const nodePath = FormPath.parse(path || name)
    const dataPath = transformDataPath(nodePath)
    let field: IVirtualField
    const createField = (field?: IVirtualField) => {
      const alreadyHaveField = !!field
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
      heart.publish(LifeCycleTypes.ON_FIELD_WILL_INIT, field)
      if (!alreadyHaveField) {
        graph.appendNode(nodePath, field)
      }
      heart.batch(() => {
        //fix #766
        field.batch(() => {
          field.setState((state: IVirtualFieldState<VirtualFieldProps>) => {
            state.initialized = true
            state.props = props
            if (isValid(visible)) {
              state.visible = visible
            }
            if (isValid(display)) {
              state.display = display
            }
          })
          batchRunTaskQueue(field, nodePath)
        })
      })
      return field
    }
    if (graph.exist(nodePath)) {
      field = graph.get(nodePath)
      //field = createField(field) 如果重置会导致#565的问题，目前还没想清楚不重置会有啥问题
      if (isField(field)) {
        graph.replace(nodePath, field)
      }
    } else {
      field = createField()
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
    visible,
    display,
    computeState,
    dataType,
    useDirty,
    unmountRemoveValue,
    props
  }: Exclude<IFieldStateProps, 'dataPath' | 'nodePath'>): IField {
    let field: IField
    const nodePath = FormPath.parse(path || name)
    const dataPath = transformDataPath(nodePath)
    const createField = (field?: IField) => {
      const alreadyHaveField = !!field
      field =
        field ||
        new FieldState({
          nodePath,
          dataPath,
          computeState,
          dataType,
          unmountRemoveValue,
          useDirty: isValid(useDirty) ? useDirty : options.useDirty
        })
      field.subscription = {
        notify: onFieldChange({ field, path: nodePath })
      }
      heart.publish(LifeCycleTypes.ON_FIELD_WILL_INIT, field)
      if (!alreadyHaveField) {
        graph.appendNode(nodePath, field)
      }

      heart.batch(() => {
        field.batch(() => {
          field.setState((state: IFieldState<FieldProps>) => {
            const formValue = getFormValuesIn(state.name)
            const formInitialValue = getFormInitialValuesIn(state.name)
            if (isValid(value)) {
              // value > formValue > initialValue
              state.value = value
            } else if (
              existFormValuesIn(state.name) ||
              formValue !== undefined
            ) {
              state.value = formValue
            } else if (isValid(initialValue)) {
              state.value = initialValue
            }

            if (isValid(initialValue)) {
              state.initialValue = initialValue
            } else if (isValid(formInitialValue)) {
              state.initialValue = formInitialValue
            }

            if (isValid(visible)) {
              state.visible = visible
            }
            if (isValid(display)) {
              state.display = display
            }
            if (isValid(props)) {
              state.props = props
            }
            if (isValid(required)) {
              state.required = required
            }
            if (isValid(rules)) {
              state.rules = rules as any
            }
            if (isValid(editable)) {
              state.selfEditable = editable
            }
            if (isValid(options.editable)) {
              state.formEditable = options.editable
            }
            state.initialized = true
          })
          batchRunTaskQueue(field, nodePath)
        })
      })
      validator.register(nodePath, validate => {
        const {
          value,
          rules,
          editable,
          visible,
          unmounted,
          display
        } = field.getState()
        // 不需要校验的情况有: 非编辑态(editable)，已销毁(unmounted), 逻辑上不可见(visible)
        if (
          editable === false ||
          visible === false ||
          unmounted === true ||
          display === false ||
          (field as any).disabledValidate
        )
          return validate(value, [])
        clearTimeout((field as any).validateTimer)
        ;(field as any).validateTimer = setTimeout(() => {
          field.setState(state => {
            state.validating = true
          })
        }, 60)
        heart.publish(LifeCycleTypes.ON_FIELD_VALIDATE_START, field)
        return validate(value, rules).then(({ errors, warnings }) => {
          clearTimeout((field as any).validateTimer)
          return new Promise(resolve => {
            field.setState((state: IFieldState<FieldProps>) => {
              state.validating = false
              state.ruleErrors = errors
              state.ruleWarnings = warnings
            })
            heart.publish(LifeCycleTypes.ON_FIELD_VALIDATE_END, field)
            resolve({
              errors,
              warnings
            })
          })
        })
      })
      return field
    }
    if (graph.exist(nodePath)) {
      field = graph.get(nodePath)
      //field = createField(field) 如果重置会导致#565的问题，目前还没想清楚不重置会有啥问题
      if (isVirtualField(field)) {
        graph.replace(nodePath, field)
      }
    } else {
      field = createField()
    }
    return field
  }

  function resetFormMessages(fieldState: IFieldState) {
    const { path, visible, display, unmounted, editable } = fieldState
    if (
      editable === false ||
      visible === false ||
      unmounted === true ||
      display === false
    ) {
      state.setSourceState(state => {
        state.errors = state.errors || []
        state.warnings = state.warnings || []
        state.errors = state.errors.reduce((buf: any, item: any) => {
          if (item.path === path) {
            return buf
          } else {
            return buf.concat(item)
          }
        }, [])
        state.warnings = state.warnings.reduce((buf: any, item: any) => {
          if (item.path === path) {
            return buf
          } else {
            return buf.concat(item)
          }
        }, [])
        if (state.errors.length) {
          state.invalid = true
          state.valid = false
        } else {
          state.invalid = false
          state.valid = true
        }
      })
    }
  }

  //实时同步Form Messages
  function syncFormMessages(type: string, fieldState: IFieldState) {
    const { name, path } = fieldState
    const messages = fieldState[type]
    state.setSourceState(state => {
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
          name,
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
      if (index >= newPath.length - 1) return path.concat([key])
      const realPath = newPath.slice(0, index + 1)
      const dataPath = path.concat([key])
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
    const method = silent ? 'setSourceState' : 'setState'
    state[method](state => {
      FormPath.setIn(state[key], transformDataPath(path), value)
      if (key === 'values') {
        state.modified = true
      }
    }, silent)
  }

  function deleteFormIn(path: FormPathPattern, key: string, silent?: boolean) {
    const method = silent ? 'setSourceState' : 'setState'
    state[method](state => {
      FormPath.deleteIn(state[key], transformDataPath(path))
      if (key === 'values') {
        state.modified = true
      }
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

  function existFormValuesIn(path: FormPathPattern) {
    return state.getState(state =>
      FormPath.existIn(state.values, transformDataPath(path))
    )
  }

  function getFormInitialValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'initialValues')
  }
  /**
   *
   * @param input IField | FormPathPattern
   */
  function createMutators(input: any) {
    let field: IField
    if (!isField(input)) {
      const selected = graph.select(input)
      if (selected) {
        field = selected
      } else {
        throw new Error(
          'The `createMutators` can only accept FieldState instance or FormPathPattern.'
        )
      }
    } else {
      field = input
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
      const nodePath = field.getSourceState(state => state.path)
      if (isValid(key)) {
        const childNodePath = FormPath.parse(nodePath).concat(key)
        env.removeNodes[childNodePath.toString()] = true
        deleteFormValuesIn(childNodePath)
        field.notify(field.getState())
      } else {
        const parent = graph.selectParent(nodePath)
        env.removeNodes[nodePath.toString()] = true
        deleteFormValuesIn(nodePath)
        if (parent) {
          parent.notify(parent.getState())
        }
      }
      heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
    }

    function getValue() {
      return field.getSourceState(state => state.value)
    }

    function onGraphChange(callback: () => void) {
      let timer = null
      const id = graph.subscribe(() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          graph.unsubscribe(id)
          callback()
        })
      })
    }

    //1. 无法自动交换通过移动来新增删除子列表元素的状态
    //2. 暂时不支持通过setFieldState修改值场景的状态交换
    function swapState($from: number, $to: number) {
      const keys: string[] = ['initialValue', 'visibleCacheValue', 'values']
      const arrayName = field.getSourceState(state => state.name)
      const fromFieldsName = `${arrayName}.${$from}.*`
      const toFieldsName = `${arrayName}.${$to}.*`
      const cache = {}
      const calculatePath = (name: string, $from: number, $to: number) => {
        return name.replace(`${arrayName}.${$from}`, `${arrayName}.${$to}`)
      }
      graph.select(fromFieldsName, field => {
        field.setSourceState((state: IFieldState) => {
          const targetState =
            getFieldState(calculatePath(state.name, $from, $to)) || {}
          keys.forEach(key => {
            cache[state.name] = cache[state.name] || {}
            cache[state.name][key] = state[key]
            state[key] = targetState && targetState[key]
          })
        })
      })
      graph.select(toFieldsName, field => {
        field.setSourceState((state: IFieldState) => {
          const cacheState = cache[calculatePath(state.name, $to, $from)] || {}
          keys.forEach(key => {
            state[key] = cacheState[key]
          })
        })
      })
    }

    function swapAfterState(start: number, arrayLength: number, step = 1) {
      for (let i = arrayLength - 1; i >= start + 1; i -= step) {
        swapState(i, i - 1)
      }
    }

    const mutators = {
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
        onGraphChange(() => {
          swapAfterState(index, arr.length)
        })
        return arr
      },
      remove(index?: number | string) {
        let val = getValue()
        if (isNum(index) && isArr(val)) {
          val = [].concat(val)
          const lastIndex = val.length - 1
          val.splice(index, 1)
          if (index < lastIndex) {
            swapState(Number(index), Number(index) + 1)
          }
          setValue(val)
        } else {
          removeValue(index)
        }
      },
      exist(index?: number | string) {
        const newPath = field.getSourceState(state =>
          FormPath.parse(state.path)
        )
        const val = getValue()
        return (isValid(index) ? newPath.concat(index) : newPath).existIn(
          val,
          newPath
        )
      },
      unshift(value: any) {
        return mutators.insert(0, value)
      },
      shift() {
        const arr = toArr(getValue()).slice()
        arr.shift()
        swapState(0, 1)
        setValue(arr)
        return arr
      },
      move($from: number, $to: number) {
        const arr = toArr(getValue()).slice()
        const item = arr[$from]
        arr.splice($from, 1)
        arr.splice($to, 0, item)
        swapState($from, $to)
        setValue(arr)
        return arr
      },
      moveUp(index: number) {
        const len = toArr(getValue()).length
        return mutators.move(index, index - 1 < 0 ? len - 1 : index - 1)
      },
      moveDown(index: number) {
        const len = toArr(getValue()).length
        return mutators.move(index, index + 1 > len ? 0 : index + 1)
      },
      validate(opts?: IFormExtendedValidateFieldOptions) {
        return validate(
          field.getSourceState(state => state.path),
          {
            ...opts,
            hostRendering: false
          }
        )
      }
    }
    return mutators
  }

  function clearErrors(pattern: FormPathPattern = '*') {
    // 1. 指定路径或全部子路径清理
    hostUpdate(() => {
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
    })
  }

  async function reset({
    selector = '*',
    forceClear = false,
    validate = true,
    clearInitialValue = false
  }: IFormResetOptions = {}): Promise<void | IFormValidateResult> {
    hostUpdate(() => {
      graph.eachChildren('', selector, (field: IField) => {
        ;(field as any).disabledValidate = true
        field.setState((state: IFieldState<FieldProps>) => {
          state.modified = false
          state.ruleErrors = []
          state.ruleWarnings = []
          state.effectErrors = []
          state.effectWarnings = []
          if (clearInitialValue) {
            state.initialValue = undefined
          }
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
            } else if (isPlainObj(state.value)) {
              if (isPlainObj(value)) {
                state.value = value
              } else {
                state.value = {}
              }
            } else {
              state.value = value
            }
          }
        })
        ;(field as any).disabledValidate = false
      })
    })
    if (isFn(options.onReset) && !state.state.unmounted) {
      options.onReset()
    }
    heart.publish(LifeCycleTypes.ON_FORM_RESET, state)
    let validateResult: void | IFormValidateResult
    if (validate) {
      validateResult = await formApi.validate(selector, { throwErrors: false })
    }

    return validateResult
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

    env.submittingTask = async () => {
      // 增加onFormSubmitValidateStart来明确submit引起的校验开始了
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START, state)
      await validate('', { throwErrors: false, hostRendering: true })
      const validated: IFormValidateResult = state.getState(state => ({
        errors: state.errors,
        warnings: state.warnings
      }))
      const { errors } = validated
      // 校验失败
      if (errors.length) {
        // 由于校验失败导致submit退出
        state.setState(state => {
          state.submitting = false
        })

        // 增加onFormSubmitValidateFailed来明确结束submit的类型
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED, state)
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
        if (isFn(options.onValidateFailed) && !state.state.unmounted) {
          options.onValidateFailed(validated)
        }

        throw errors
      }

      // 增加onFormSubmitValidateSucces来明确submit引起的校验最终的结果
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS, state)

      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT, state)

      let payload,
        values = state.getState(state => clone(state.values))
      if (isFn(onSubmit) && !state.state.unmounted) {
        try {
          payload = await Promise.resolve(onSubmit(values))
          heart.publish(LifeCycleTypes.ON_FORM_ON_SUBMIT_SUCCESS, payload)
        } catch (e) {
          heart.publish(LifeCycleTypes.ON_FORM_ON_SUBMIT_FAILED, e)
          new Promise(() => {
            throw e
          })
        }
      }

      state.setState(state => {
        state.submitting = false
      })
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
      return {
        values,
        validated,
        payload
      }
    }

    return env.submittingTask()
  }

  async function validate(
    path?: FormPathPattern,
    opts?: IFormExtendedValidateFieldOptions
  ): Promise<IFormValidateResult> {
    const { throwErrors = true, hostRendering } = opts || {}
    if (!state.getState(state => state.validating)) {
      state.setSourceState(state => {
        state.validating = true
      })
      // 渲染优化
      clearTimeout(env.validateTimer)
      env.validateTimer = setTimeout(() => {
        state.notify()
      }, 60)
    }

    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_START, state)
    if (graph.size > 100 && hostRendering) env.hostRendering = true
    const payload = await validator.validate(path, opts)
    clearTimeout(env.validateTimer)
    state.setState(state => {
      state.validating = false
    })
    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_END, state)
    if (graph.size > 100 && hostRendering) {
      heart.publish(LifeCycleTypes.ON_FORM_HOST_RENDER, state)
      env.hostRendering = false
    }
    // 增加name透出真实路径，和0.x保持一致
    const result = {
      errors: payload.errors.map(item => ({
        ...item,
        name: getFieldState(item.path).name
      })),
      warnings: payload.warnings.map(item => ({
        ...item,
        name: getFieldState(item.path).name
      }))
    }

    const { errors, warnings } = result

    // 打印warnings日志从submit挪到这里
    if (warnings.length) {
      log.warn(warnings)
    }
    if (errors.length > 0) {
      if (throwErrors) {
        throw result
      } else {
        return result
      }
    } else {
      return result
    }
  }

  function setFormState(
    callback?: (state: IFormState) => any,
    silent?: boolean
  ) {
    state.setState(callback, silent)
  }

  function getFormState(callback?: (state: IFormState) => any) {
    return state.getState(callback)
  }

  function batchRunTaskQueue(
    field: IField | IVirtualField,
    nodePath: FormPath
  ) {
    for (let index = 0; index < env.taskQueue.length; index++) {
      const { pattern, callbacks } = env.taskQueue[index]
      let removed = false
      if (matchStrategy(pattern, nodePath)) {
        callbacks.forEach(callback => {
          field.setState(callback)
        })
        if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
          env.taskQueue.splice(index--, 1)
          removed = true
        }
      }
      if (!removed) {
        env.taskIndexes[pattern.toString()] = index
      } else {
        delete env.taskIndexes[pattern.toString()]
      }
    }
  }

  function pushTaskQueue(pattern: FormPath, callback: () => void) {
    const id = pattern.toString()
    const taskIndex = env.taskIndexes[id]
    if (isValid(taskIndex)) {
      if (
        env.taskQueue[taskIndex] &&
        !env.taskQueue[taskIndex].callbacks.some(fn =>
          isEqual(fn, callback) ? fn === callback : false
        )
      ) {
        env.taskQueue[taskIndex].callbacks.push(callback)
      }
    } else {
      env.taskIndexes[id] = env.taskQueue.length
      env.taskQueue.push({
        pattern,
        callbacks: [callback]
      })
    }
  }

  function setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState<FieldProps>) => void,
    silent?: boolean
  ) {
    if (!isFn(callback)) return
    let matchCount = 0
    const pattern = FormPath.getPath(path)
    graph.select(pattern, field => {
      field.setState(callback, silent)
      matchCount++
    })
    if (matchCount === 0 || pattern.isWildMatchPattern) {
      pushTaskQueue(pattern, callback)
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
          nodeState.setSourceState(state => {
            Object.assign(state, node)
          })
        } else {
          if (node.displayName === 'VirtualFieldState') {
            nodeState = registerVirtualField({
              path: key
            })
            nodeState.setSourceState(state => {
              Object.assign(state, node)
            })
          } else if (node.displayName === 'FieldState') {
            nodeState = registerField({
              path: key
            })
            nodeState.setSourceState(state => {
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

  function matchStrategy(pattern: FormPathPattern, nodePath: FormPathPattern) {
    const matchPattern = FormPath.parse(pattern)
    const node = graph.get(nodePath)
    if (!node) return false
    return node.getSourceState(state =>
      matchPattern.matchAliasGroup(state.name, state.path)
    )
  }

  //在subscribe中必须同步使用，否则会监听不到变化
  function hasChanged(target: any, path: FormPathPattern): boolean {
    if (env.publishing[target ? target.path : ''] === false) {
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

  function isHostRendering() {
    return env.hostRendering
  }

  function hostUpdate(callback?: () => any): any {
    if (isFn(callback)) {
      if (graph.size > 100) env.hostRendering = true
      const result = callback()
      if (graph.size > 100) {
        heart.publish(LifeCycleTypes.ON_FORM_HOST_RENDER, state)
        env.hostRendering = false
      }
      return result
    }
  }

  const state = new FormState(options)
  const validator = new FormValidator({
    ...options,
    matchStrategy
  })
  const graph: FormGraph = new FormGraph({
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
    isHostRendering,
    hostUpdate,
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
    beforeNotify: payload => {
      env.publishing[payload.path || ''] = true
    },
    afterNotify: payload => {
      env.publishing[payload.path || ''] = false
    }
  })
  const env = {
    validateTimer: null,
    syncFormStateTimer: null,
    onChangeTimer: null,
    graphChangeTimer: null,
    hostRendering: false,
    publishing: {},
    taskQueue: [],
    taskIndexes: {},
    removeNodes: {},
    lastShownStates: {},
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
  BigData,
  FormPath,
  FormPathPattern,
  FormGraph
}

export default createForm
