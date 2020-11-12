import { IFormCreatorOptions } from './types'
import { FormGraph } from './shared/graph'
import { FormHeart } from './shared/lifecycle'
import { Form } from './models/form'
import { FormValidator } from '@formily/validator'
import {
  FormPath,
  FormPathPattern,
  isValid,
  isEqual,
  clone,
  isFn,
  defaults
} from '@formily/shared'
import {
  LifeCycleTypes,
  IFormState,
  isVirtualField,
  IVirtualFieldState,
  IFieldState,
  IField,
  IVirtualField
} from './types'

export const createFormInternals = (options: IFormCreatorOptions = {}) => {
  function onFormChange(published: IFormState) {
    const { dirtys } = form

    if (dirtys.values) {
      notifyFormValuesChange()
    }
    if (dirtys.initialValues) {
      if (!env.uploading) {
        form.setState(state => {
          state.values = defaults(published.initialValues, published.values)
        })
      }
      notifyFormInitialValuesChange()
    }
    if (dirtys.unmounted && published.unmounted) {
      heart.publish(LifeCycleTypes.ON_FORM_UNMOUNT, form)
    }
    if (dirtys.mounted && published.mounted) {
      heart.publish(LifeCycleTypes.ON_FORM_MOUNT, form)
    }
    if (dirtys.initialized) {
      heart.publish(LifeCycleTypes.ON_FORM_INIT, form)
    }
    heart.publish(LifeCycleTypes.ON_FORM_CHANGE, form)
    if (env.hostRendering) {
      env.hostRendering =
        dirtys.values || dirtys.initialValues || dirtys.editable
    }
    return env.hostRendering
  }

  function notifyFormValuesChange() {
    if (isFn(options.onChange) && form.state.mounted && !form.state.unmounted) {
      clearTimeout(env.onChangeTimer)
      env.onChangeTimer = setTimeout(() => {
        if (form.state.unmounted) return
        options.onChange(clone(getFormValuesIn('')))
      })
    }
    heart.publish(LifeCycleTypes.ON_FORM_VALUES_CHANGE, form)
  }

  function notifyFormInitialValuesChange() {
    heart.publish(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, form)
  }

  function onGraphChange({ type, payload }) {
    heart.publish(LifeCycleTypes.ON_FORM_GRAPH_CHANGE, graph)
    if (type === 'GRAPH_NODE_WILL_UNMOUNT') {
      validator.unregister(payload.path.toString())
    }
  }

  function setFormIn(
    path: FormPathPattern,
    key: string,
    value: any,
    silent?: boolean
  ) {
    const method = silent ? 'setSourceState' : 'setState'
    form[method](state => {
      FormPath.setIn(state[key], getDataPath(path), value)
      if (key === 'values') {
        state.modified = true
      }
    }, silent)
  }

  function deleteFormIn(path: FormPathPattern, key: string, silent?: boolean) {
    const method = silent ? 'setSourceState' : 'setState'
    form[method](state => {
      FormPath.deleteIn(state[key], getDataPath(path))
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
    return form.getState(state => FormPath.getIn(state[key], getDataPath(path)))
  }

  function getFormValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'values')
  }

  function existFormValuesIn(path: FormPathPattern) {
    return form.getState(state =>
      FormPath.existIn(state.values, getDataPath(path))
    )
  }

  function getFormInitialValuesIn(path: FormPathPattern) {
    return getFormIn(path, 'initialValues')
  }

  function getDataPath(path: FormPathPattern) {
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

  function matchStrategy(
    pattern: FormPathPattern,
    nodePath: FormPathPattern
  ): boolean {
    const matchPattern = FormPath.parse(pattern)
    const node = graph.get(nodePath)
    if (!node) return false
    return node.getSourceState(state =>
      matchPattern.matchAliasGroup(state.name, state.path)
    )
  }

  function updateRecoverableShownState(
    parentState:
      | IVirtualFieldState<FormilyCore.VirtualFieldProps>
      | IFieldState<FormilyCore.FieldProps>,
    childState:
      | IVirtualFieldState<FormilyCore.VirtualFieldProps>
      | IFieldState<FormilyCore.FieldProps>,
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

  function resetFormMessages(fieldState: IFieldState) {
    const { path, visible, display, unmounted, editable } = fieldState
    if (
      editable === false ||
      visible === false ||
      unmounted === true ||
      display === false
    ) {
      form.setState(state => {
        const newErrors = state.errors?.reduce?.((buf: any, item: any) => {
          if (item.path === path) {
            return buf
          } else {
            return buf.concat(item)
          }
        }, [])
        const newWarnings = state.warnings?.reduce?.((buf: any, item: any) => {
          if (item.path === path) {
            return buf
          } else {
            return buf.concat(item)
          }
        }, [])
        const errorsChanged = !isEqual(state.errors, newErrors)
        const warningsChanged = !isEqual(state.warnings, newWarnings)
        if (warningsChanged) {
          state.warnings = newWarnings
        }
        if (errorsChanged) {
          state.errors = newErrors
        }
      })
    }
  }

  function syncFormMessages(
    type: string,
    fieldState: Partial<IFieldState>,
    silent?: boolean
  ) {
    const { name, path } = fieldState
    const messages = fieldState[type]
    form.setState(state => {
      let foundField = false
      const newMessages = state[type]?.reduce?.((buf: any, item: any) => {
        if (item.path === path) {
          foundField = true
          return messages.length ? buf.concat({ name, path, messages }) : buf
        } else {
          return buf.concat(item)
        }
      }, [])
      const messageChanged = !isEqual(state[type], newMessages)
      if (messageChanged) {
        state[type] = newMessages
      }
      if (!foundField && messages.length) {
        state[type].push({
          name,
          path,
          messages
        })
      }
    }, silent)
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
        !env.taskQueue[taskIndex].callbacks.some((fn: any) =>
          fn.toString() === callback.toString() ? fn === callback : false
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

  function init<T>(actions: T) {
    heart.publish(LifeCycleTypes.ON_FORM_WILL_INIT, form, actions)
    graph.appendNode(form)
    form.setState((state: IFormState) => {
      state.initialized = true
      if (isValid(options.initialValues)) {
        state.initialValues = clone(options.initialValues)
      }
      if (isValid(options.values)) {
        state.values = clone(options.values)
      }
      if (!isValid(state.values)) {
        state.values = state.initialValues
      }
      if (isValid(options.editable)) {
        state.editable = options.editable
      }
    })
  }

  function hostUpdate(callback?: () => any, forceUpdate?: boolean): any {
    if (isFn(callback)) {
      env.hostRendering = true
      const result = callback()
      if (env.hostRendering || forceUpdate) {
        heart.publish(LifeCycleTypes.ON_FORM_HOST_RENDER, form)
      }
      env.hostRendering = false
      return result
    }
  }

  function nextTick(callback?: () => void) {
    setTimeout(callback)
  }

  function afterUnmount(callback?: () => void) {
    clearTimeout(env.unmountTimer)
    env.unmountTimer = setTimeout(callback, 1000)
  }

  function isHostRendering() {
    return env.hostRendering
  }

  function disableUnmountClearStates(pattern: FormPathPattern = '*') {
    const path = FormPath.parse(pattern)
    env.clearStatesPatterns[path.toString()] = false
  }

  function enableUnmountClearStates(pattern: FormPathPattern = '*') {
    const path = FormPath.parse(pattern)
    env.clearStatesPatterns[path.toString()] = true
  }

  function disableUnmountRemoveNode() {
    env.unmountRemoveNode = false
  }

  function enableUnmountRemoveNode() {
    env.unmountRemoveNode = true
  }

  function supportUnmountClearStates(path: FormPathPattern) {
    for (const pattern in env.clearStatesPatterns) {
      const enable = env.clearStatesPatterns[pattern]
      if (matchStrategy(pattern, path)) {
        return enable
      }
    }
    return true
  }

  function upload(callback: () => void) {
    env.uploading = true
    callback()
    env.uploading = false
  }

  const graph = new FormGraph({
    matchStrategy
  })
  const form = new Form()
  const validator = new FormValidator({
    ...options,
    matchStrategy
  })
  const heart = new FormHeart({
    ...options,
    beforeNotify: payload => {
      env.publishing[payload.path || ''] = true
    },
    afterNotify: payload => {
      env.publishing[payload.path || ''] = false
    }
  })
  const env = {
    validateTimer: null,
    unmountTimer: null,
    syncFormStateTimer: null,
    onChangeTimer: null,
    graphChangeTimer: null,
    hostRendering: false,
    publishing: {},
    taskQueue: [],
    uploading: false,
    taskIndexes: {},
    realRemoveTags: [],
    lastShownStates: {},
    clearStatesPatterns: {},
    unmountRemoveNode: false,
    submittingTask: undefined
  }
  form.subscription = {
    notify: onFormChange
  }
  graph.subscribe(onGraphChange)
  return {
    options,
    init,
    form,
    graph,
    validator,
    heart,
    env,
    upload,
    nextTick,
    afterUnmount,
    getDataPath,
    getFormValuesIn,
    getFormInitialValuesIn,
    setFormValuesIn,
    setFormInitialValuesIn,
    existFormValuesIn,
    deleteFormValuesIn,
    updateRecoverableShownState,
    disableUnmountClearStates,
    enableUnmountClearStates,
    supportUnmountClearStates,
    enableUnmountRemoveNode,
    disableUnmountRemoveNode,
    resetFormMessages,
    syncFormMessages,
    batchRunTaskQueue,
    pushTaskQueue,
    hostUpdate,
    isHostRendering
  }
}
