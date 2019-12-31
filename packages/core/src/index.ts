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
  isObj,
  scheduler
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
      const updateFields = (field: IField | IVirtualField) => {
        if (isField(field)) {
          field.setState(state => {
            if (state.visible) {
              if (valuesChanged) {
                const dataPath = FormPath.parse(state.name)
                const parent = graph.getLatestParent(state.path)
                const parentValue = getFormValuesIn(parent.path)
                const value = getFormValuesIn(state.name)
                /**
                 * https://github.com/alibaba/uform/issues/267 dynamic remove node
                 */
                let removed = false
                if (
                  isArr(parentValue) &&
                  !dataPath.existIn(parentValue, parent.path)
                ) {
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
      }
      if (valuesChanged || initialValuesChanged) {
        if (!env.leadingStage) {
          const userUpdateFieldPath =
            env.userUpdateFields[env.userUpdateFields.length - 1]
          /*
           * 考虑初始化的时候还没生成节点树
           * 两种数据同步策略，
           * 1. 精确更新的时候(mutators/setFieldState)，只遍历父节点与子节点，同时父节点静默处理，子节点通知渲染
           * 2. setFormState批量更新的时候，是会遍历所有节点，同时所有节点只要有变化就会被通知
           */
          if (userUpdateFieldPath && graph.get(userUpdateFieldPath)) {
            graph.eachParentAndChildren(userUpdateFieldPath, updateFields)
          } else {
            graph.eachChildren(updateFields)
          }
        } else {
          graph.eachChildren(updateFields)
        }
      }
      if (valuesChanged) {
        if (isFn(options.onChange)) {
          options.onChange(clone(published.values))
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
      const errorsChanged = field.isDirty('errors')
      const userUpdateFieldPath =
        env.userUpdateFields[env.userUpdateFields.length - 1]
      if (initializedChanged) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
        const isEmptyValue = !isValid(published.value)
        const isEmptyInitialValue = !isValid(published.initialValue)
        if (isEmptyValue || isEmptyInitialValue) {
          field.setSourceState((state: IFieldState<FieldProps>) => {
            if (isEmptyValue) state.value = getFormValuesIn(state.name)
            if (isEmptyInitialValue)
              state.initialValue = getFormInitialValuesIn(state.name)
          })
        }
      }
      if (valueChanged) {
        userUpdating(field, () => {
          setFormValuesIn(path, published.value)
        })
        heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      }
      if (initialValueChanged) {
        setFormInitialValuesIn(path, published.initialValue)
        heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, field)
      }
      if (displayChanged || visibleChanged) {
        if (visibleChanged) {
          if (!published.visible) {
            deleteFormValuesIn(path, true)
          } else {
            setFormValuesIn(path, published.value)
          }
        }
        graph.eachChildren(path, childState => {
          childState.setState((state: IFieldState<FieldProps>) => {
            const { visible, display } = state
            const hiddenNode = env.hiddenNodes[state.path]
            if (visibleChanged) {
              if (
                published.visible &&
                hiddenNode &&
                hiddenNode.visible === false
              ) {
                state.visible = false
                delete hiddenNode.visible
                if (Object.keys(hiddenNode).length === 0) {
                  delete env.hiddenNodes[state.path]
                }
              } else {
                state.visible = published.visible
              }
              if (!published.visible && !visible) {
                if (!hiddenNode) {
                  env.hiddenNodes[state.path] = {}
                }
                env.hiddenNodes[state.path].visible = false
              }
            }
            if (displayChanged) {
              if (
                published.display &&
                hiddenNode &&
                hiddenNode.display === false
              ) {
                state.display = false
                delete hiddenNode.display
                if (Object.keys(hiddenNode).length === 0) {
                  delete env.hiddenNodes[state.path]
                }
              } else {
                state.display = published.display
              }
              if (!published.display && !display) {
                if (!hiddenNode) {
                  env.hiddenNodes[state.path] = {}
                }
                env.hiddenNodes[state.path].display = false
              }
            }
          }, true)
        })
      }
      if (
        unmountedChanged &&
        (published.display !== false || published.visible === false)
      ) {
        userUpdating(field, () => {
          if (published.unmounted) {
            deleteFormValuesIn(path, true)
          } else {
            setFormValuesIn(path, published.value)
          }
        })
        heart.publish(LifeCycleTypes.ON_FIELD_UNMOUNT, field)
      }
      if (mountedChanged && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }

      if (errorsChanged) {
        syncFormMessages('errors', published.name, published.errors)
      }

      if (warningsChanged) {
        syncFormMessages('warnings', published.name, published.warnings)
      }
      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
      if (userUpdateFieldPath && !env.leadingStage) {
        if (FormPath.parse(path).match(userUpdateFieldPath)) {
          return
        }
        if (FormPath.parse(userUpdateFieldPath).includes(path)) {
          return false
        }
      }
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
              const { visible, display } = state
              const hiddenNode = env.hiddenNodes[state.path]
              if (visibleChanged) {
                if (
                  published.visible &&
                  hiddenNode &&
                  hiddenNode.visible === false
                ) {
                  state.visible = false
                  delete hiddenNode.visible
                  if (Object.keys(hiddenNode).length === 0) {
                    delete env.hiddenNodes[state.path]
                  }
                } else {
                  state.visible = published.visible
                }
                if (!published.visible && !visible) {
                  if (!hiddenNode) {
                    env.hiddenNodes[state.path] = {}
                  }
                  env.hiddenNodes[state.path].visible = false
                }
              }
              if (displayChanged) {
                if (
                  published.display &&
                  hiddenNode &&
                  hiddenNode.display === false
                ) {
                  state.display = false
                  delete hiddenNode.display
                  if (Object.keys(hiddenNode).length === 0) {
                    delete env.hiddenNodes[state.path]
                  }
                } else {
                  state.display = published.display
                }
                if (!published.display && !display) {
                  if (!hiddenNode) {
                    env.hiddenNodes[state.path] = {}
                  }
                  env.hiddenNodes[state.path].display = false
                }
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
    let nodePath = FormPath.parse(path || name)
    let dataPath = transformDataPath(nodePath)
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
    useDirty,
    props
  }: Exclude<IFieldStateProps, 'dataPath' | 'nodePath'>): IField {
    let field: IField
    let nodePath = FormPath.parse(path || name)
    let dataPath = transformDataPath(nodePath)
    const createField = (field?: IField) => {
      const alreadyHaveField = !!field
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
      if (!alreadyHaveField) {
        graph.appendNode(nodePath, field)
      }
      field.batch(() => {
        field.setState((state: IFieldState<FieldProps>) => {
          const formValue = getFormValuesIn(dataPath)
          const formInitialValue = getFormInitialValuesIn(dataPath)
          if (isValid(value)) {
            // value > formValue > initialValue
            state.value = value
          } else {
            state.value = existFormValuesIn(dataPath) ? formValue : initialValue
          }
          // initialValue > formInitialValue
          state.initialValue = isValid(initialValue)
            ? initialValue
            : formInitialValue
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
            state.rules = rules
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
          display === false
        )
          return validate(value, [])
        clearTimeout((field as any).validateTimer)
        ;(field as any).validateTimer = setTimeout(() => {
          field.setState(state => {
            state.validating = true
          })
        }, 60)
        return validate(value, rules).then(({ errors, warnings }) => {
          clearTimeout((field as any).validateTimer)
          return new Promise(resolve => {
            const syncState = () => {
              field.setState((state: IFieldState<FieldProps>) => {
                state.validating = false
                state.ruleErrors = errors
                state.ruleWarnings = warnings
              })
              resolve({ errors, warnings })
            }
            if (graph.size < 100) {
              syncState()
            } else {
              applyWithScheduler(syncState)
            }
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
    }
    return field
  }

  //实时同步Form Messages
  function syncFormMessages(type: string, path: string, messages: string[]) {
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

  function existFormValuesIn(path: FormPathPattern) {
    return state.getState(state =>
      FormPath.existIn(state.values, transformDataPath(path))
    )
  }

  function getFormInitialValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'initialValues')
  }

  function createMutators(field: IField) {
    if (!isField(field)) {
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
      const nodePath = field.getSourceState(state => state.path)
      if (isValid(key)) {
        const childNodePath = FormPath.parse(nodePath).concat(key)
        env.userUpdateFields.push(nodePath)
        env.removeNodes[childNodePath.toString()] = true
        deleteFormValuesIn(childNodePath)
        field.notify(field.getState())
        env.userUpdateFields.pop()
      } else {
        const parent = graph.selectParent(nodePath)
        env.removeNodes[nodePath.toString()] = true
        const parentNodePath =
          parent && parent.getSourceState(state => state.path)
        if (parentNodePath) {
          env.userUpdateFields.push(parentNodePath)
        } else {
          env.userUpdateFields.push(nodePath)
        }
        deleteFormValuesIn(nodePath)
        if (parent) {
          parent.notify(parent.getState())
        }
        env.userUpdateFields.pop()
      }
      heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, state)
    }

    function getValue() {
      return field.getSourceState(state => state.value)
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
        const newPath = field.getSourceState(state =>
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
      validate(opts?: IFormExtendedValidateFieldOptions) {
        return validate(
          field.getSourceState(state => state.path),
          opts
        )
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
      const validateResult = await validate('', { throwErrors: false })
      const { errors } = validateResult
      // 校验失败
      if (errors.length) {
        // 由于校验失败导致submit退出
        state.setState(state => {
          state.submitting = false
        })

        // 增加onFormSubmitValidateFailed来明确结束submit的类型
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED, state)
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, state)
        if (isFn(options.onValidateFailed)) {
          options.onValidateFailed(validateResult)
        }

        throw errors
      }

      // 增加onFormSubmitValidateSucces来明确submit引起的校验最终的结果
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS, state)

      // 因为要合并effectErrors/effectWarnings，所以不能直接读validate的结果
      const validated = state.getState(({ errors, warnings }) => ({
        errors,
        warnings
      }))
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT, state)

      let payload,
        values = state.getState(state => clone(state.values))
      if (isFn(onSubmit)) {
        try {
          payload = await Promise.resolve(onSubmit(values))
        } catch (e) {
          if (e) {
            console.error(e)
          }
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
    const { throwErrors = true } = opts || {}
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
    const payload = await validator.validate(path, opts)
    clearTimeout(env.validateTimer)
    state.setState(state => {
      state.validating = false
    })
    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_END, state)

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
      console.warn(warnings)
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
    env.leadingStage = true
    state.setState(callback, silent)
    env.leadingStage = false
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

  function userUpdating(field: IField | IVirtualField, fn?: () => void) {
    if (!field) return
    const nodePath = field.getSourceState(state => state.path)
    if (nodePath)
      env.userUpdateFields.push(field.getSourceState(state => state.path))
    if (isFn(fn)) {
      fn()
    }
    env.userUpdateFields.pop()
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

  const state = new FormState(options)
  const validator = new FormValidator({
    ...options,
    matchStrategy
  })
  const graph = new FormGraph({
    matchStrategy
  })
  const applyWithScheduler = scheduler(options.validateConcurrentTimeMS)
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
    beforeNotify: payload => {
      env.publishing[payload.path || ''] = true
    },
    afterNotify: payload => {
      env.publishing[payload.path || ''] = false
    }
  })
  const env = {
    validateTimer: null,
    graphChangeTimer: null,
    leadingStage: false,
    publishing: {},
    taskQueue: [],
    userUpdateFields: [],
    taskIndexes: {},
    removeNodes: {},
    hiddenNodes: {},
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
