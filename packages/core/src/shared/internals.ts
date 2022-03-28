import {
  FormPath,
  FormPathPattern,
  each,
  pascalCase,
  isFn,
  isValid,
  isUndef,
  isEmpty,
  isPlainObj,
  isNumberLike,
  clone,
  toArr,
} from '@formily/shared'
import {
  ValidatorTriggerType,
  validate,
  parseValidatorDescriptions,
} from '@formily/validator'
import {
  autorun,
  batch,
  contains,
  toJS,
  isObservable,
  DataChange,
  reaction,
  untracked,
} from '@formily/reactive'
import { Field, ArrayField, Form, ObjectField } from '../models'
import {
  ISpliceArrayStateProps,
  IExchangeArrayStateProps,
  IFieldResetOptions,
  ISearchFeedback,
  IFieldFeedback,
  INodePatch,
  GeneralField,
  IFormFeedback,
  LifeCycleTypes,
  FieldMatchPattern,
} from '../types'
import {
  isArrayField,
  isObjectField,
  isGeneralField,
  isDataField,
  isForm,
  isQuery,
  isVoidField,
} from './externals'
import {
  RESPONSE_REQUEST_DURATION,
  ReservedProperties,
  MutuallyExclusiveProperties,
  NumberIndexReg,
  GlobalState,
  ReadOnlyProperties,
} from './constants'

const hasOwnProperty = Object.prototype.hasOwnProperty

const notify = (
  target: Form | Field,
  formType: LifeCycleTypes,
  fieldType: LifeCycleTypes
) => {
  if (isForm(target)) {
    target.notify(formType)
  } else {
    target.notify(fieldType)
  }
}

export const isHTMLInputEvent = (event: any, stopPropagation = true) => {
  if (event?.target) {
    if (isValid(event.target.value) || isValid(event.target.checked))
      return true
    if (
      event.target.tagName &&
      event.target.tagName !== 'INPUT' &&
      event.target.tagName !== 'TEXTAREA' &&
      event.target.tagName !== 'SELECT'
    ) {
      return false
    }
    if (stopPropagation) event.stopPropagation?.()
    return true
  }
  return false
}

export const getValuesFromEvent = (args: any[]) => {
  return args.map((event) => {
    if (event?.target) {
      if (isValid(event.target.value)) return event.target.value
      if (isValid(event.target.checked)) return event.target.checked
      return
    }
    return event
  })
}

export const getTypedDefaultValue = (field: Field) => {
  if (isArrayField(field)) return []
  if (isObjectField(field)) return {}
}

export const buildFieldPath = (field: GeneralField) => {
  return buildDataPath(field.form.fields, field.address)
}

export const buildDataPath = (
  fields: Record<string, GeneralField>,
  pattern: FormPath
) => {
  let prevArray = false
  const segments = pattern.segments
  const path = segments.reduce((path: string[], key: string, index: number) => {
    const currentPath = path.concat(key)
    const currentAddress = segments.slice(0, index + 1)
    const current = fields[currentAddress.join('.')]
    if (prevArray) {
      if (!isVoidField(current)) {
        prevArray = false
      }
      return path
    }
    if (index >= segments.length - 1) {
      return currentPath
    }
    if (isVoidField(current)) {
      const parentAddress = segments.slice(0, index)
      const parent = fields[parentAddress.join('.')]
      if (isArrayField(parent) && isNumberLike(key)) {
        prevArray = true
        return currentPath
      }
      return path
    } else {
      prevArray = false
    }
    return currentPath
  }, [])
  return new FormPath(path)
}

export const locateNode = (field: GeneralField, address: FormPathPattern) => {
  field.address = FormPath.parse(address)
  field.path = buildFieldPath(field)
  field.form.indexes[field.path.toString()] = field.address.toString()
  return field
}

export const patchFieldStates = (
  target: Record<string, GeneralField>,
  patches: INodePatch<GeneralField>[]
) => {
  patches.forEach(({ type, address, oldAddress, payload }) => {
    if (type === 'remove') {
      destroy(target, address, false)
    } else if (type === 'update') {
      if (payload) {
        target[address] = payload
        if (target[oldAddress] === payload) {
          target[oldAddress]?.dispose()
          delete target[oldAddress]
        }
      }
      if (address && payload) {
        locateNode(payload, address)
      }
    }
  })
}

export const destroy = (
  target: Record<string, GeneralField>,
  address: string,
  removeValue = true
) => {
  const field = target[address]
  field?.dispose()
  if (isDataField(field) && removeValue) {
    const form = field.form
    const path = field.path
    form.deleteValuesIn(path)
    form.deleteInitialValuesIn(path)
  }
  delete target[address]
}

export const patchFormValues = (
  form: Form,
  path: Array<string | number>,
  source: any
) => {
  const update = (path: Array<string | number>, source: any) => {
    if (path.length) {
      form.setValuesIn(path, clone(source))
    } else {
      Object.assign(form.values, clone(source))
    }
  }

  const patch = (source: any, path: Array<string | number> = []) => {
    const targetValue = form.getValuesIn(path)
    const targetField = form.query(path).take()
    if (allowAssignDefaultValue(targetValue, source)) {
      update(path, source)
    } else {
      if (isEmpty(source)) return
      if (GlobalState.initializing) return
      if (isPlainObj(targetValue) && isPlainObj(source)) {
        each(source, (value, key) => {
          patch(value, path.concat(key))
        })
      } else {
        if (targetField) {
          if (!isVoidField(targetField) && !targetField.selfModified) {
            update(path, source)
          }
        } else if (form.initialized) {
          update(path, source)
        }
      }
    }
  }
  patch(source, path)
}

export const matchFeedback = (
  search?: ISearchFeedback,
  feedback?: IFormFeedback
) => {
  if (!search || !feedback) return false
  if (search.type && search.type !== feedback.type) return false
  if (search.code && search.code !== feedback.code) return false
  if (search.path && feedback.path) {
    if (!FormPath.parse(search.path).match(feedback.path)) return false
  }
  if (search.address && feedback.address) {
    if (!FormPath.parse(search.address).match(feedback.address)) return false
  }
  if (search.triggerType && search.triggerType !== feedback.triggerType)
    return false
  return true
}

export const queryFeedbacks = (field: Field, search?: ISearchFeedback) => {
  return field.feedbacks.filter((feedback) => {
    if (!feedback.messages?.length) return false
    return matchFeedback(search, {
      ...feedback,
      address: field.address?.toString(),
      path: field.path?.toString(),
    })
  })
}

export const queryFeedbackMessages = (
  field: Field,
  search: ISearchFeedback
) => {
  if (!field.feedbacks.length) return []
  return queryFeedbacks(field, search).reduce(
    (buf, info) => (isEmpty(info.messages) ? buf : buf.concat(info.messages)),
    []
  )
}

export const updateFeedback = (field: Field, feedback?: IFieldFeedback) => {
  if (!feedback) return
  return batch(() => {
    if (!field.feedbacks.length) {
      if (!feedback.messages?.length) {
        return
      }
      field.feedbacks = [feedback]
    } else {
      const searched = queryFeedbacks(field, feedback)
      if (searched.length) {
        field.feedbacks = field.feedbacks.reduce((buf, item) => {
          if (searched.includes(item)) {
            if (feedback.messages?.length) {
              item.messages = feedback.messages
              return buf.concat(item)
            } else {
              return buf
            }
          } else {
            return buf.concat(item)
          }
        }, [])
        return
      } else if (feedback.messages?.length) {
        field.feedbacks = field.feedbacks.concat(feedback)
      }
    }
  })
}

export const validateToFeedbacks = async (
  field: Field,
  triggerType: ValidatorTriggerType = 'onInput'
) => {
  const results = await validate(field.value, field.validator, {
    triggerType,
    validateFirst: field.props.validateFirst || field.form.props.validateFirst,
    context: { field, form: field.form },
  })

  batch(() => {
    each(results, (messages, type) => {
      field.setFeedback({
        triggerType,
        type,
        code: pascalCase(`validate-${type}`),
        messages: messages,
      } as any)
    })
  })
  return results
}

export const setValidatorRule = (field: Field, name: string, value: any) => {
  if (!isValid(value)) return
  const validators = parseValidatorDescriptions(field.validator)
  const hasRule = validators.some((desc) => name in desc)
  const rule = {
    [name]: value,
  }
  if (hasRule) {
    field.validator = validators.map((desc: any) => {
      if (isPlainObj(desc) && hasOwnProperty.call(desc, name)) {
        desc[name] = value
        return desc
      }
      return desc
    })
  } else {
    if (name === 'required') {
      field.validator = [rule].concat(validators)
    } else {
      field.validator = validators.concat(rule)
    }
  }
}

export const spliceArrayState = (
  field: ArrayField,
  props?: ISpliceArrayStateProps
) => {
  const { startIndex, deleteCount, insertCount } = {
    startIndex: 0,
    deleteCount: 0,
    insertCount: 0,
    ...props,
  }
  const address = field.address.toString()
  const addrLength = address.length
  const form = field.form
  const fields = form.fields
  const fieldPatches: INodePatch<GeneralField>[] = []
  const offset = insertCount - deleteCount
  const isArrayChildren = (identifier: string) => {
    return identifier.indexOf(address) === 0 && identifier.length > addrLength
  }
  const isAfterNode = (identifier: string) => {
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return false
    const index = Number(number)
    return index > startIndex + deleteCount - 1
  }
  const isInsertNode = (identifier: string) => {
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return false
    const index = Number(number)
    return index >= startIndex && index < startIndex + insertCount
  }
  const isDeleteNode = (identifier: string) => {
    const preStr = identifier.substring(0, addrLength)
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return false
    const index = Number(number)
    return (
      index >= startIndex &&
      !fields[
        `${preStr}${afterStr.replace(/^\.\d+/, `.${index + deleteCount}`)}`
      ]
    )
  }
  const moveIndex = (identifier: string) => {
    if (offset === 0) return identifier
    const preStr = identifier.substring(0, addrLength)
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return identifier
    const index = Number(number) + offset
    return `${preStr}${afterStr.replace(/^\.\d+/, `.${index}`)}`
  }

  batch(() => {
    each(fields, (field, identifier) => {
      if (isArrayChildren(identifier)) {
        if (isAfterNode(identifier)) {
          const newIdentifier = moveIndex(identifier)
          fieldPatches.push({
            type: 'update',
            address: newIdentifier,
            oldAddress: identifier,
            payload: field,
          })
        }
        if (isInsertNode(identifier) || isDeleteNode(identifier)) {
          if (isDataField(field)) {
            form.deleteInitialValuesIn(field.path)
          }
          fieldPatches.push({ type: 'remove', address: identifier })
        }
      }
    })
    patchFieldStates(fields, fieldPatches)
  })
  field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
}

export const exchangeArrayState = (
  field: ArrayField,
  props: IExchangeArrayStateProps
) => {
  const { fromIndex, toIndex } = {
    fromIndex: 0,
    toIndex: 0,
    ...props,
  }
  const address = field.address.toString()
  const fields = field.form.fields
  const addrLength = address.length
  const fieldPatches: INodePatch<GeneralField>[] = []
  const isArrayChildren = (identifier: string) => {
    return identifier.indexOf(address) === 0 && identifier.length > addrLength
  }

  const isDown = fromIndex < toIndex

  const isMoveNode = (identifier: string) => {
    const afterStr = identifier.slice(address.length)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return false
    const index = Number(number)
    return isDown
      ? index > fromIndex && index <= toIndex
      : index < fromIndex && index >= toIndex
  }

  const isFromNode = (identifier: string) => {
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)?.[1]
    if (number === undefined) return false
    const index = Number(number)
    return index === fromIndex
  }

  const moveIndex = (identifier: string) => {
    const preStr = identifier.substring(0, addrLength)
    const afterStr = identifier.substring(addrLength)
    const number = afterStr.match(NumberIndexReg)[1]
    const current = Number(number)
    let index = current
    if (index === fromIndex) {
      index = toIndex
    } else {
      index += isDown ? -1 : 1
    }

    return `${preStr}${afterStr.replace(/^\.\d+/, `.${index}`)}`
  }

  batch(() => {
    each(fields, (field, identifier) => {
      if (isArrayChildren(identifier)) {
        if (isMoveNode(identifier) || isFromNode(identifier)) {
          const newIdentifier = moveIndex(identifier)
          fieldPatches.push({
            type: 'update',
            address: newIdentifier,
            oldAddress: identifier,
            payload: field,
          })
          if (!fields[newIdentifier]) {
            fieldPatches.push({
              type: 'remove',
              address: identifier,
            })
          }
        }
      }
    })
    patchFieldStates(fields, fieldPatches)
  })
  field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
}

export const cleanupArrayChildren = (field: ArrayField, start: number) => {
  const address = field.address.toString()
  const fields = field.form.fields

  const isArrayChildren = (identifier: string) => {
    return (
      identifier.indexOf(address) === 0 && identifier.length > address.length
    )
  }

  const isNeedCleanup = (identifier: string) => {
    const afterStr = identifier.slice(address.length)
    const numStr = afterStr.match(NumberIndexReg)?.[1]
    if (numStr === undefined) return false
    const index = Number(numStr)
    return index >= start
  }

  batch(() => {
    each(fields, (field, identifier) => {
      if (isArrayChildren(identifier) && isNeedCleanup(identifier)) {
        field.destroy()
      }
    })
  })
}

export const cleanupObjectChildren = (field: ObjectField, keys: string[]) => {
  if (keys.length === 0) return
  const address = field.address.toString()
  const fields = field.form.fields

  const isObjectChildren = (identifier: string) => {
    return (
      identifier.indexOf(address) === 0 && identifier.length > address.length
    )
  }

  const isNeedCleanup = (identifier: string) => {
    const afterStr = identifier.slice(address.length)
    const key = afterStr.match(/^\.([^.]+)/)?.[1]
    if (key === undefined) return false
    return keys.includes(key)
  }

  batch(() => {
    each(fields, (field, identifier) => {
      if (isObjectChildren(identifier) && isNeedCleanup(identifier)) {
        field.destroy()
      }
    })
  })
}

export const initFieldUpdate = batch.scope.bound((field: GeneralField) => {
  const form = field.form
  const updates = FormPath.ensureIn(form, 'requests.updates', [])
  const indexes = FormPath.ensureIn(form, 'requests.updateIndexes', {})
  for (let index = 0; index < updates.length; index++) {
    const { pattern, callbacks } = updates[index]
    let removed = false
    if (field.match(pattern)) {
      callbacks.forEach((callback) => {
        field.setState(callback)
      })
      if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
        updates.splice(index--, 1)
        removed = true
      }
    }
    if (!removed) {
      indexes[pattern.toString()] = index
    } else {
      delete indexes[pattern.toString()]
    }
  }
})

export const subscribeUpdate = (
  form: Form,
  pattern: FormPath,
  callback: (...args: any[]) => void
) => {
  const updates = FormPath.ensureIn(form, 'requests.updates', [])
  const indexes = FormPath.ensureIn(form, 'requests.updateIndexes', {})
  const id = pattern.toString()
  const current = indexes[id]
  if (isValid(current)) {
    if (
      updates[current] &&
      !updates[current].callbacks.some((fn: any) =>
        fn.toString() === callback.toString() ? fn === callback : false
      )
    ) {
      updates[current].callbacks.push(callback)
    }
  } else {
    indexes[id] = updates.length
    updates.push({
      pattern,
      callbacks: [callback],
    })
  }
}

export const deserialize = (model: any, setter: any) => {
  if (!model) return
  if (isFn(setter)) {
    setter(model)
  } else {
    for (let key in setter) {
      if (!hasOwnProperty.call(setter, key)) continue
      if (ReadOnlyProperties[key] || ReservedProperties[key]) continue
      const MutuallyExclusiveKey = MutuallyExclusiveProperties[key]
      if (
        MutuallyExclusiveKey &&
        hasOwnProperty.call(setter, MutuallyExclusiveKey) &&
        !isValid(setter[MutuallyExclusiveKey])
      )
        continue
      const value = setter[key]
      if (isFn(value)) continue
      model[key] = value
    }
  }
  return model
}

export const serialize = (model: any, getter?: any) => {
  if (isFn(getter)) {
    return getter(model)
  } else {
    const results = {}
    for (let key in model) {
      if (!hasOwnProperty.call(model, key)) continue
      if (ReservedProperties[key]) continue
      if (key === 'address' || key === 'path') {
        results[key] = model[key].toString()
        continue
      }
      const value = model[key]
      if (isFn(value)) continue
      results[key] = toJS(value)
    }
    return results
  }
}

export const createChildrenFeedbackFilter = (field: Field) => {
  const identifier = field.address?.toString()
  return ({ address }: IFormFeedback) => {
    return address.indexOf(identifier) === 0
  }
}

export const createStateSetter = (model: any) => {
  return batch.bound((setter?: any) => deserialize(model, setter))
}

export const createStateGetter = (model: any) => {
  return (getter?: any) => serialize(model, getter)
}

export const createBatchStateSetter = (form: Form) => {
  return batch.bound((pattern: FieldMatchPattern, payload?: any) => {
    if (isQuery(pattern)) {
      pattern.forEach((field) => {
        field.setState(payload)
      })
    } else if (isGeneralField(pattern)) {
      pattern.setState(payload)
    } else {
      let matchCount = 0,
        path = FormPath.parse(pattern)
      form.query(path).forEach((field) => {
        field.setState(payload)
        matchCount++
      })

      if (matchCount === 0 || path.isWildMatchPattern) {
        subscribeUpdate(form, path, payload)
      }
    }
  })
}

export const createBatchStateGetter = (form: Form) => {
  return (pattern: FieldMatchPattern, payload?: any) => {
    if (isQuery(pattern)) {
      return pattern.take(payload)
    } else if (isGeneralField(pattern)) {
      return (pattern as any).getState(payload)
    } else {
      return form.query(pattern).take((field: any) => {
        return field.getState(payload)
      })
    }
  }
}

export const triggerFormInitialValuesChange = (
  form: Form,
  change: DataChange
) => {
  const path = change.path
  if (Array.isArray(change.object) && change.key === 'length') return
  if (
    contains(form.initialValues, change.object) ||
    contains(form.initialValues, change.value)
  ) {
    if (change.type === 'add' || change.type === 'set') {
      patchFormValues(form, path.slice(1), change.value)
    }
    if (form.initialized) {
      form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
    }
  }
}

export const triggerFormValuesChange = (form: Form, change: DataChange) => {
  if (Array.isArray(change.object) && change.key === 'length') return
  if (
    (contains(form.values, change.object) ||
      contains(form.values, change.value)) &&
    form.initialized
  ) {
    form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  }
}

export const setValidating = (target: Form | Field, validating: boolean) => {
  clearTimeout(target.requests.validate)
  if (validating) {
    target.requests.validate = setTimeout(() => {
      batch(() => {
        target.validating = validating
        notify(
          target,
          LifeCycleTypes.ON_FORM_VALIDATING,
          LifeCycleTypes.ON_FIELD_VALIDATING
        )
      })
    }, RESPONSE_REQUEST_DURATION)
    notify(
      target,
      LifeCycleTypes.ON_FORM_VALIDATE_START,
      LifeCycleTypes.ON_FIELD_VALIDATE_START
    )
  } else {
    if (target.validating !== validating) {
      target.validating = validating
    }
    notify(
      target,
      LifeCycleTypes.ON_FORM_VALIDATE_END,
      LifeCycleTypes.ON_FIELD_VALIDATE_END
    )
  }
}

export const setSubmitting = (target: Form | Field, submitting: boolean) => {
  clearTimeout(target.requests.submit)
  if (submitting) {
    target.requests.submit = setTimeout(() => {
      batch(() => {
        target.submitting = submitting
        notify(
          target,
          LifeCycleTypes.ON_FORM_SUBMITTING,
          LifeCycleTypes.ON_FIELD_SUBMITTING
        )
      })
    }, RESPONSE_REQUEST_DURATION)
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_START,
      LifeCycleTypes.ON_FIELD_SUBMIT_START
    )
  } else {
    if (target.submitting !== submitting) {
      target.submitting = submitting
    }
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_END,
      LifeCycleTypes.ON_FIELD_SUBMIT_END
    )
  }
}

export const setLoading = (target: Form | Field, loading: boolean) => {
  clearTimeout(target.requests.loading)
  if (loading) {
    target.requests.loading = setTimeout(() => {
      batch(() => {
        target.loading = loading
        notify(
          target,
          LifeCycleTypes.ON_FORM_LOADING,
          LifeCycleTypes.ON_FIELD_LOADING
        )
      })
    }, RESPONSE_REQUEST_DURATION)
  } else if (target.loading !== loading) {
    target.loading = loading
  }
}

export const batchSubmit = async <T>(
  target: Form | Field,
  onSubmit?: (values: any) => Promise<T> | void
): Promise<T> => {
  const getValues = (target: Form | Field) => {
    if (isForm(target)) {
      return toJS(target.values)
    }
    return toJS(target.value)
  }
  target.setSubmitting(true)
  try {
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START,
      LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START
    )
    await target.validate()
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS,
      LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS
    )
  } catch (e) {
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED,
      LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED
    )
  }
  notify(
    target,
    LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END,
    LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END
  )
  let results: any
  try {
    if (target.invalid) {
      throw target.errors
    }
    if (isFn(onSubmit)) {
      results = await onSubmit(getValues(target))
    } else {
      results = getValues(target)
    }
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS,
      LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS
    )
  } catch (e) {
    target.setSubmitting(false)
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT_FAILED,
      LifeCycleTypes.ON_FIELD_SUBMIT_FAILED
    )
    notify(
      target,
      LifeCycleTypes.ON_FORM_SUBMIT,
      LifeCycleTypes.ON_FIELD_SUBMIT
    )
    throw e
  }
  target.setSubmitting(false)
  notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT)
  return results
}

export const batchValidate = async (
  target: Form | Field,
  pattern: FormPathPattern,
  triggerType?: ValidatorTriggerType
) => {
  if (isForm(target)) target.setValidating(true)
  else {
    if (target.pattern !== 'editable' || target.display !== 'visible') return
  }
  const tasks = []
  target.query(pattern).forEach((field) => {
    if (!isVoidField(field)) {
      tasks.push(validateSelf(field, triggerType, field === target))
    }
  })
  await Promise.all(tasks)
  if (isForm(target)) target.setValidating(false)
  if (target.invalid) {
    notify(
      target,
      LifeCycleTypes.ON_FORM_VALIDATE_FAILED,
      LifeCycleTypes.ON_FIELD_VALIDATE_FAILED
    )
    throw target.errors
  }
  notify(
    target,
    LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS,
    LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS
  )
}

export const batchReset = async (
  target: Form | Field,
  pattern: FormPathPattern,
  options?: IFieldResetOptions
) => {
  const tasks = []
  target.query(pattern).forEach((field) => {
    if (!isVoidField(field)) {
      tasks.push(resetSelf(field, options, target === field))
    }
  })
  if (isForm(target)) {
    target.modified = false
  }
  notify(target, LifeCycleTypes.ON_FORM_RESET, LifeCycleTypes.ON_FIELD_RESET)
  await Promise.all(tasks)
}

export const validateSelf = batch.bound(
  async (target: Field, triggerType?: ValidatorTriggerType, noEmit = false) => {
    const start = () => {
      setValidating(target, true)
    }
    const end = () => {
      setValidating(target, false)
      if (noEmit) return
      if (target.selfValid) {
        target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS)
      } else {
        target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED)
      }
    }

    if (target.pattern !== 'editable' || target.display !== 'visible') return {}
    start()
    if (!triggerType) {
      const allTriggerTypes = parseValidatorDescriptions(
        target.validator
      ).reduce(
        (types, desc) =>
          types.indexOf(desc.triggerType) > -1
            ? types
            : types.concat(desc.triggerType),
        []
      )
      const results = {}
      for (let i = 0; i < allTriggerTypes.length; i++) {
        const payload = await validateToFeedbacks(target, allTriggerTypes[i])
        each(payload, (result, key) => {
          results[key] = results[key] || []
          results[key] = results[key].concat(result)
        })
      }
      end()
      return results
    }
    const results = await validateToFeedbacks(target, triggerType)
    end()
    return results
  }
)

export const resetSelf = batch.bound(
  async (target: Field, options?: IFieldResetOptions, noEmit = false) => {
    const typedDefaultValue = getTypedDefaultValue(target)
    target.modified = false
    target.selfModified = false
    target.visited = false
    target.feedbacks = []
    target.inputValue = typedDefaultValue
    target.inputValues = []
    target.caches = {}
    if (!isUndef(target.value)) {
      if (options?.forceClear) {
        target.value = typedDefaultValue
      } else {
        target.value = toJS(
          !isUndef(target.initialValue)
            ? target.initialValue
            : typedDefaultValue
        )
      }
    }
    if (!noEmit) {
      target.notify(LifeCycleTypes.ON_FIELD_RESET)
    }
    if (options?.validate) {
      return await validateSelf(target)
    }
  }
)

export const modifySelf = (target: Field) => {
  if (target.selfModified) return
  target.selfModified = true
  target.modified = true
  let parent = target.parent
  while (parent) {
    if (isDataField(parent)) {
      if (parent.modified) return
      parent.modified = true
    }
    parent = parent.parent
  }
  target.form.modified = true
}

export const getValidFormValues = (values: any) => {
  if (isObservable(values)) return values
  return clone(values || {})
}

export const getValidFieldDefaultValue = (value: any, initialValue: any) => {
  if (allowAssignDefaultValue(value, initialValue)) return clone(initialValue)
  return value
}

export const allowAssignDefaultValue = (target: any, source: any) => {
  const isEmptyTarget = target !== null && isEmpty(target)
  const isEmptySource = source !== null && isEmpty(source)
  const isValidTarget = !isUndef(target)
  const isValidSource = !isUndef(source)
  if (!isValidTarget) {
    if (isValidSource) {
      return true
    }
    return false
  }

  if (typeof target === typeof source) {
    if (target === '') return false
    if (target === 0) return false
  }

  if (isEmptyTarget) {
    if (isEmptySource) {
      return false
    } else {
      return true
    }
  }
  return false
}

export const createReactions = (field: GeneralField) => {
  const reactions = toArr(field.props.reactions)
  field.form.addEffects(field, () => {
    reactions.forEach((reaction) => {
      if (isFn(reaction)) {
        field.disposers.push(autorun(batch.scope.bound(() => reaction(field))))
      }
    })
  })
}

export const createReaction = <T>(
  tracker: () => T,
  scheduler?: (value: T) => void
) => {
  return reaction(tracker, untracked.bound(scheduler))
}

export const initializeStart = () => {
  GlobalState.initializing = true
}

export const initializeEnd = () => {
  batch.endpoint(() => {
    GlobalState.initializing = false
  })
}
