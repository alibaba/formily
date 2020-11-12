import {
  IFieldRegistryProps,
  IField,
  IFieldState,
  IVirtualField,
  LifeCycleTypes,
  IVirtualFieldRegistryProps,
  isField,
  IFormState,
  IVirtualFieldState,
  FormHeartSubscriber,
  IFormSubmitResult,
  IFormValidateResult,
  IFormResetOptions,
  isFormState,
  isFieldState,
  isVirtualFieldState,
  IFormExtendedValidateFieldOptions
} from './types'
import {
  FormPath,
  FormPathPattern,
  isValid,
  isFn,
  isArr,
  isPlainObj,
  each,
  clone,
  log,
  defaults,
  toArr,
  isNum,
  isEqual,
  isEmpty
} from '@formily/shared'
import { createFormInternals } from './internals'
import {
  Field,
  ARRAY_UNIQUE_TAG,
  tagArrayList,
  parseArrayTags
} from './models/field'
import { VirtualField } from './models/virtual-field'

export const createFormExternals = (
  internals: ReturnType<typeof createFormInternals>
) => {
  const {
    options,
    init,
    env,
    form,
    heart,
    graph,
    validator,
    upload,
    hostUpdate,
    afterUnmount,
    nextTick,
    isHostRendering,
    getDataPath,
    getFormValuesIn,
    getFormInitialValuesIn,
    deleteFormValuesIn,
    setFormValuesIn,
    setFormInitialValuesIn,
    updateRecoverableShownState,
    supportUnmountClearStates,
    disableUnmountClearStates,
    enableUnmountClearStates,
    enableUnmountRemoveNode,
    disableUnmountRemoveNode,
    resetFormMessages,
    syncFormMessages,
    batchRunTaskQueue,
    pushTaskQueue
  } = internals

  function eachArrayExchanges(
    prevState: IFieldState,
    currentState: IFieldState,
    eacher: (prevPath: string, currentPath: string, lastResults: any) => void
  ) {
    const exchanged = {}
    const prevValue = prevState.value
    const currentValue = currentState.value
    const maxLengthValue =
      prevValue?.length > currentValue?.length ? prevValue : currentValue
    //删除元素正向循环，添加或移动使用逆向循环
    let lastResults: any
    each(
      maxLengthValue,
      (item, index) => {
        const prev = prevValue?.[index]?.[ARRAY_UNIQUE_TAG]
        const current = currentValue?.[index]?.[ARRAY_UNIQUE_TAG]
        if (prev === current) return
        if (prev === undefined) {
          return
        }
        if (currentValue?.length === prevValue?.length) {
          if (exchanged[prev] || exchanged[current]) return
          exchanged[prev] = true
          exchanged[current] = true
        }
        lastResults = eacher(prev, current, lastResults)
      },
      currentState?.value?.length >= prevState?.value?.length
    )
  }

  function calculateMovePath(name: string, replace: number) {
    const segments = []
    const indexes = []
    FormPath.parse(name).forEach((key: string) => {
      if (/^\d+$/.test(key)) {
        indexes.push(segments.length)
      }
      segments.push(key)
    })
    if (indexes.length) {
      segments[indexes[indexes.length - 1]] = replace
    }
    return segments.join('.')
  }

  function getExchangeState(state: IFieldState) {
    const results = {
      ...state
    }
    delete results.name
    delete results.path
    if (
      results.visible === false ||
      results.unmounted === true ||
      results.mounted === false
    ) {
      delete results.value
      delete results.values
    }
    delete results.mounted
    delete results.unmounted
    return results
  }

  function calculateRemovedTags(prevTags: string[], currentTags: string[]) {
    if (prevTags.length <= currentTags.length) return []
    env.realRemoveTags = prevTags.reduce((buf, tag) => {
      return currentTags.includes(tag) ? buf : buf.concat(tag)
    }, [])
    return prevTags.slice(currentTags.length - prevTags.length)
  }

  function removeArrayNodes(field: IField, tags: string[]) {
    if (tags.length <= 0) return
    const matchTag = (node: IField) => (tag: string) =>
      FormPath.parse(calculateMathTag(tag)).matchAliasGroup(
        node.state.name,
        node.state.path
      )

    graph.eachChildren(field.state.path, node => {
      if (tags.some(matchTag(node))) {
        graph.remove(node.state.path)
      }
    })

    tags.forEach(tag => {
      graph.select(calculateMathTag(tag), (node: IField) => {
        graph.remove(node.state.path)
      })
    })
  }

  function calculateMathTag(tag: FormPathPattern) {
    return `*(${tag},${tag}.*)`
  }

  function exchangeState(
    parentPath: FormPathPattern,
    prevPattern: FormPathPattern,
    currentPattern: FormPathPattern,
    lastCurrentStates: any
  ) {
    const currentIndex = FormPath.transform(
      currentPattern,
      /\d+/,
      (...args) => {
        return Number(args[args.length - 1])
      }
    )
    const exchanged = {}
    const currentStates = {}
    graph.eachChildren(
      parentPath,
      calculateMathTag(prevPattern),
      (prevField: IField) => {
        const prevPath = prevField.state.path
        const prevState = prevField.getState(getExchangeState)
        const currentPath = calculateMovePath(prevPath, currentIndex)
        const currentState = getFieldState(currentPath, getExchangeState)
        const currentField = graph.get(currentPath) as IField
        if (prevField) {
          prevField.setSourceState(state => {
            if (currentState) {
              Object.assign(state, currentState)
            } else {
              //补位交换
              Object.assign(
                state,
                getExchangeState(lastCurrentStates[prevPath])
              )
            }

            if (isField(prevField)) {
              syncFormMessages('errors', state)
              syncFormMessages('warnings', state)
            }
          })
        }
        if (currentField) {
          currentStates[currentPath] = currentField.getState()
          currentField.setSourceState(state => {
            Object.assign(state, prevState)
          })
        }
        exchanged[prevPath + currentPath] = true
      }
    )
    return currentStates
  }

  function eachParentFields(field: IField, callback: (field: IField) => void) {
    graph.eachParent(field.state.path, (node: any) => {
      if (isField(node)) {
        callback(node)
      }
    })
  }

  function onFieldChange({ field, path }: { field: IField; path: FormPath }) {
    return (published: IFieldState) => {
      const { dirtys } = field
      if (dirtys.initialized) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
      }
      if (dirtys.value || dirtys.values) {
        const isArrayList = /array/gi.test(published.dataType)
        if (isArrayList) {
          const prevTags = parseArrayTags(field.prevState.value)
          const currentTags = parseArrayTags(published.value)
          if (!isEqual(prevTags, currentTags)) {
            const removedTags = calculateRemovedTags(prevTags, currentTags)
            if (prevTags.length && currentTags.length) {
              form.batch(() => {
                eachArrayExchanges(
                  field.prevState,
                  published,
                  (prev, current, lastResults = {}) =>
                    exchangeState(path, prev, current, lastResults)
                )
              })
            }
            removeArrayNodes(field, removedTags)
            //重置TAG，保证下次状态交换是没问题的
            setFormValuesIn(
              field.state.name,
              tagArrayList(field.state.value, field.state.name, true),
              true
            )
          }
        }
        heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
        eachParentFields(field, node => {
          heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, node)
        })
      }
      if (dirtys.initialValue) {
        heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, field)
        eachParentFields(field, node => {
          heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, node)
        })
      }
      if (dirtys.visible || dirtys.display) {
        graph.eachChildren(path, childState => {
          childState.setState((state: IFieldState<FormilyCore.FieldProps>) => {
            if (dirtys.visible) {
              updateRecoverableShownState(published, state, 'visible')
            }
            if (dirtys.display) {
              updateRecoverableShownState(published, state, 'display')
            }
          }, true)
        })
      }
      if (dirtys.unmounted && published.unmounted) {
        afterUnmount(() => {
          env.realRemoveTags = []
        })
        heart.publish(LifeCycleTypes.ON_FIELD_UNMOUNT, field)
        if (env.unmountRemoveNode) {
          graph.remove(field.state.path)
        }
      }

      if (dirtys.mounted && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }

      if (dirtys.errors) {
        syncFormMessages('errors', published)
      }

      if (dirtys.warnings) {
        syncFormMessages('warnings', published)
      }

      if (
        dirtys.visible ||
        dirtys.display ||
        dirtys.editable ||
        dirtys.unmounted
      ) {
        //fix #682
        if (dirtys.unmounted) {
          if (supportUnmountClearStates(published.path)) {
            resetFormMessages(published)
          }
        } else {
          resetFormMessages(published)
        }
      }

      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
      return !env.hostRendering
    }
  }

  function onVirtualFieldChange({
    field,
    path
  }: {
    field: IVirtualField
    path: FormPath
  }) {
    return (published: IVirtualFieldState) => {
      const { dirtys } = field
      if (dirtys.initialized) {
        heart.publish(LifeCycleTypes.ON_FIELD_INIT, field)
      }

      if (dirtys.visible || dirtys.display) {
        graph.eachChildren(path, childState => {
          childState.setState(
            (state: IVirtualFieldState<FormilyCore.VirtualFieldProps>) => {
              if (dirtys.visible) {
                updateRecoverableShownState(published, state, 'visible')
              }
              if (dirtys.display) {
                updateRecoverableShownState(published, state, 'display')
              }
            },
            true
          )
        })
      }
      if (dirtys.unmounted && published.unmounted) {
        afterUnmount(() => {
          env.realRemoveTags = []
        })
        heart.publish(LifeCycleTypes.ON_FIELD_UNMOUNT, field)
        if (env.unmountRemoveNode) {
          graph.remove(field.state.path)
        }
      }
      if (dirtys.mounted && published.mounted) {
        heart.publish(LifeCycleTypes.ON_FIELD_MOUNT, field)
      }
      heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
      return !env.hostRendering
    }
  }

  function pickNotEmpty(v1: any, v2: any) {
    if (!isEmpty(v1)) return v1
    if (!isEmpty(v2)) return v2
    if (isValid(v1)) return v1
    if (isValid(v2)) return v2
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
    props
  }: IFieldRegistryProps<FormilyCore.FieldProps>) {
    let field: IField
    const nodePath = FormPath.parse(path || name)
    const dataPath = getDataPath(nodePath)
    const createField = () => {
      const field = new Field({
        nodePath,
        dataPath,
        computeState,
        dataType,
        getValue(name) {
          return getFormValuesIn(name)
        },
        supportUnmountClearStates(path) {
          if (!supportUnmountClearStates(path)) return false
          if (!env.realRemoveTags?.length) return true
          return env.realRemoveTags.every(tag => {
            return !FormPath.parse(calculateMathTag(tag)).match(path)
          })
        },
        getEditable() {
          return form.getState(state => state.editable)
        },
        setValue(name, value) {
          upload(() => {
            setFormValuesIn(name, value)
          })
        },
        setInitialValue(name, value) {
          upload(() => {
            setFormInitialValuesIn(name, value)
          })
        },
        removeValue(name) {
          if (!graph.get(nodePath)) return
          upload(() => {
            deleteFormValuesIn(name)
          })
        },
        getInitialValue(name) {
          return getFormInitialValuesIn(name)
        },
        unControlledValueChanged() {
          nextTick(() => {
            //非受控值变化，需要mock一个dirty信息，否则hasChanged判断会失效
            field.dirtys = {
              value: true,
              values: true,
              modified: true
            }
            field.dirtyCount = 3
            heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
            heart.publish(LifeCycleTypes.ON_FIELD_CHANGE, field)
          })
        }
      })
      field.subscription = {
        notify: onFieldChange({ field, path: nodePath })
      }
      heart.publish(LifeCycleTypes.ON_FIELD_WILL_INIT, field)

      graph.appendNode(field, nodePath, dataPath)

      field.batch(() => {
        field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
          const formValue = getFormValuesIn(state.name)
          const formInitialValue = getFormInitialValuesIn(state.name)
          const syncValue = pickNotEmpty(value, formValue)
          const syncInitialValue = pickNotEmpty(initialValue, formInitialValue)

          if (isValid(syncInitialValue)) {
            state.initialValue = syncInitialValue
          }

          if (isValid(syncValue)) {
            state.value = syncValue
          } else {
            if (isValid(state.initialValue)) {
              state.value = state.initialValue
            }
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

      validator.register(nodePath, validate => {
        const {
          value,
          rules,
          errors,
          warnings,
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
          (field as any).disabledValidate ||
          (rules.length === 0 && errors.length === 0 && warnings.length === 0)
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
            field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
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
    } else {
      field = createField()
    }
    return field
  }

  function registerVirtualField({
    name,
    path,
    display,
    visible,
    computeState,
    props
  }: IVirtualFieldRegistryProps<FormilyCore.VirtualFieldProps>) {
    const nodePath = FormPath.parse(path || name)
    const dataPath = getDataPath(nodePath)
    let field: IVirtualField
    const createField = () => {
      const field = new VirtualField({
        nodePath,
        dataPath,
        computeState
      })
      field.subscription = {
        notify: onVirtualFieldChange({ field, path: nodePath })
      }
      heart.publish(LifeCycleTypes.ON_FIELD_WILL_INIT, field)

      graph.appendNode(field, nodePath, dataPath)

      field.batch(() => {
        field.setState(
          (state: IVirtualFieldState<FormilyCore.VirtualFieldProps>) => {
            state.initialized = true
            state.props = props
            if (isValid(visible)) {
              state.visible = visible
            }
            if (isValid(display)) {
              state.display = display
            }
          }
        )
        batchRunTaskQueue(field, nodePath)
      })

      return field
    }
    if (graph.exist(nodePath)) {
      field = graph.get(nodePath)
    } else {
      field = createField()
    }
    return field
  }

  function getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState<FormilyCore.FieldProps>) => any
  ) {
    const field = graph.select(path)
    return field && field.getState(callback)
  }

  function setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState<FormilyCore.FieldProps>) => void,
    silent?: boolean
  ) {
    if (!isFn(callback)) return
    let matchCount = 0
    const pattern = FormPath.getPath(path)
    graph.select(pattern, field => {
      if (!isFormState(field)) {
        field.setState(callback, silent)
      }
      matchCount++
    })
    if (matchCount === 0 || pattern.isWildMatchPattern) {
      pushTaskQueue(pattern, callback)
    }
  }

  function getFieldValue(path?: FormPathPattern) {
    return getFieldState(path, state => {
      return state.value
    })
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

  function getFieldInitialValue(path?: FormPathPattern) {
    return getFieldState(path, state => {
      return state.initialValue
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

  function getFormState(callback?: (state: IFormState) => any) {
    return form.getState(callback)
  }

  function setFormState(
    callback?: (state: IFormState) => any,
    silent?: boolean
  ) {
    hostUpdate(() => {
      form.setState(callback, silent)
    })
  }

  function getFormGraph() {
    return graph.map(node => {
      return node.getState()
    })
  }

  function setFormGraph(nodes: { [key: string]: any }) {
    each(
      nodes,
      (
        node:
          | IFieldState<FormilyCore.FieldProps>
          | IVirtualFieldState<FormilyCore.VirtualFieldProps>,
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
          nodeState.notify(form.getState())
        }
      }
    )
  }

  function subscribe(callback?: FormHeartSubscriber) {
    return heart.subscribe(callback)
  }

  function unsubscribe(id: number) {
    heart.unsubscribe(id)
  }

  function notify(type: string, payload: any) {
    heart.publish(type, payload)
  }

  async function submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<IFormSubmitResult> {
    // 重复提交，返回前一次的promise
    if (form.getState(state => state.submitting)) return env.submittingTask
    heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_START, form)
    onSubmit = onSubmit || options.onSubmit
    form.setState(state => {
      state.submitting = true
    })

    env.submittingTask = async () => {
      // 增加onFormSubmitValidateStart来明确submit引起的校验开始了
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START, form)
      await validate('', { throwErrors: false, hostRendering: true })
      const validated = form.getState(state => ({
        errors: state.errors,
        warnings: state.warnings
      }))
      const { errors } = validated
      // 校验失败
      if (errors.length) {
        // 由于校验失败导致submit退出
        form.setState(state => {
          state.submitting = false
        })

        // 增加onFormSubmitValidateFailed来明确结束submit的类型
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED, form)
        heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, form)
        if (isFn(options.onValidateFailed) && !form.state.unmounted) {
          options.onValidateFailed(validated)
        }

        throw errors
      }

      // 增加onFormSubmitValidateSucces来明确submit引起的校验最终的结果
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS, form)

      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT, form)

      let payload: any
      const values = form.getState(state => clone(state.values))
      if (isFn(onSubmit) && !form.state.unmounted) {
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

      form.setState(state => {
        state.submitting = false
      })
      heart.publish(LifeCycleTypes.ON_FORM_SUBMIT_END, form)
      return {
        values,
        validated,
        payload
      }
    }

    return env.submittingTask()
  }

  async function reset(
    props: IFormResetOptions = {}
  ): Promise<void | IFormValidateResult> {
    props = defaults(
      {
        selector: '*',
        forceClear: false,
        validate: true,
        clearInitialValue: false
      },
      props
    )
    hostUpdate(() => {
      graph.eachChildren('', props.selector, (field: IField) => {
        ;(field as any).disabledValidate = true
        field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
          state.modified = false
          state.ruleErrors = []
          state.ruleWarnings = []
          state.effectErrors = []
          state.effectWarnings = []
          if (props.clearInitialValue) {
            state.initialValue = undefined
          }
          // forceClear仅对设置initialValues的情况下有意义
          if (props.forceClear || !isValid(state.initialValue)) {
            if (isArr(state.value)) {
              state.value = []
            } else if (isPlainObj(state.value)) {
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
    if (isFn(options.onReset) && !form.state.unmounted) {
      options.onReset()
    }
    heart.publish(LifeCycleTypes.ON_FORM_RESET, form)
    let validateResult: void | IFormValidateResult
    if (props.validate) {
      validateResult = await validate(props.selector, { throwErrors: false })
    }

    return validateResult
  }

  async function validate(
    path?: FormPathPattern,
    opts?: IFormExtendedValidateFieldOptions
  ): Promise<IFormValidateResult> {
    const { throwErrors = true, hostRendering } = opts || {}
    if (!form.getState(state => state.validating)) {
      form.setSourceState(state => {
        state.validating = true
      })
      // 渲染优化
      clearTimeout(env.validateTimer)
      env.validateTimer = setTimeout(() => {
        form.notify()
      }, 60)
    }
    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_START, form)
    if (graph.size > 100 && hostRendering) env.hostRendering = true
    const payload = await validator.validate(path, opts)
    clearTimeout(env.validateTimer)
    form.setState(state => {
      state.validating = false
    })
    heart.publish(LifeCycleTypes.ON_FORM_VALIDATE_END, form)
    if (graph.size > 100 && hostRendering) {
      heart.publish(LifeCycleTypes.ON_FORM_HOST_RENDER, form)
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
      field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
        state.value = values[0]
        state.values = values
        state.inputed = true
      })
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, form)
    }

    function removeValue(key: string | number) {
      const nodePath = field.getSourceState(state => state.path)
      if (isValid(key)) {
        const childNodePath = FormPath.parse(nodePath).concat(key)
        setFieldState(childNodePath, state => {
          state.value = undefined
          state.values = []
          state.inputed = true
        })
        deleteFormValuesIn(childNodePath)
      } else {
        field.setState(state => {
          state.value = undefined
          state.values = []
          state.inputed = true
        })
        deleteFormValuesIn(nodePath)
      }
      heart.publish(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, field)
      heart.publish(LifeCycleTypes.ON_FORM_INPUT_CHANGE, form)
    }

    function getValue() {
      return field.getState(state => state.value)
    }

    const mutators = {
      change(...values: any[]) {
        setValue(...values)
        return values[0]
      },
      focus() {
        field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
          state.active = true
        })
      },
      blur() {
        field.setState((state: IFieldState<FormilyCore.FieldProps>) => {
          state.active = false
          state.visited = true
        })
      },
      push(value?: any) {
        const arr = toArr(getValue()).concat(value)
        setValue(arr)
        return arr
      },
      pop() {
        const origin = toArr(getValue())
        const arr = origin.slice(0, origin.length - 1)
        setValue(arr)
        return arr
      },
      insert(index: number, value: any) {
        const origin = toArr(getValue())
        if (origin.length === 0) {
          const arr = [value]
          setValue(arr)
          return arr
        }
        if (origin.length === index) {
          const arr = origin.concat([value])
          setValue(arr)
          return arr
        }
        const arr = origin.reduce((buf, item, idx) => {
          return idx === index ? buf.concat([value, item]) : buf.concat(item)
        }, [])
        setValue(arr)
        return arr
      },
      remove(index?: number | string) {
        const val = getValue()
        if (isNum(index) && isArr(val)) {
          setValue(val.filter((item, idx) => idx !== index))
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
        return mutators.remove(0)
      },
      swap($from: number, $to: number) {
        const arr = toArr(getValue()).slice()
        const fromItem = arr[$from]
        const toItem = arr[$to]
        arr[$from] = toItem
        arr[$to] = fromItem
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
        const len = toArr(getValue()).length
        return mutators.move(index, index - 1 < 0 ? len - 1 : index - 1)
      },
      moveDown(index: number) {
        const len = toArr(getValue()).length
        return mutators.move(index, index + 1 >= len ? 0 : index + 1)
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

  function hasChanged(target: any, path: FormPathPattern): boolean {
    if (env.publishing[target ? target.path : ''] === false) {
      throw new Error(
        'The watch function must be used synchronously in the subscribe callback.'
      )
    }
    if (isFormState(target)) {
      return form.hasChanged(path)
    } else if (isFieldState(target) || isVirtualFieldState(target)) {
      const node = graph.get(target.path)
      return node && node.hasChanged(path)
    } else {
      throw new Error(
        'Illegal parameter,You must pass the correct state object(FormState/FieldState/VirtualFieldState).'
      )
    }
  }

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
    getFieldValue,
    setFieldInitialValue,
    getFieldInitialValue,
    disableUnmountClearStates,
    enableUnmountClearStates,
    enableUnmountRemoveNode,
    disableUnmountRemoveNode,
    isHostRendering,
    hostUpdate,
    subscribe,
    unsubscribe,
    notify
  }

  init(formApi)

  return formApi
}
