import { action, makeObservable, observable, toJS, runInAction } from 'mobx'
import {
  each,
  FormPath,
  FormPathPattern,
  isFn,
  isRegExp,
  isValid,
  uid,
  globalThisPolyfill,
  isEqual
} from '@formily/shared'
import { Heart } from './Heart'
import { Field } from './Field'
import {
  JSXComponent,
  LifeCycleTypes,
  HeartSubscriber,
  FormPatternTypes,
  FormRequests,
  IFormGraph,
  IFormState,
  IFormProps,
  IFieldResetOptions,
  GeneralField,
  FormFields,
  IFieldFactoryProps,
  IVirtualFieldFactoryProps
} from '../types'
import {
  isVirtualField,
  isFormState,
  isFieldState,
  isArrayFieldState,
  isObjectFieldState,
  getLifeCyclesByEffects,
  skipVirtualFieldPath
} from '../shared'
import { Feedback } from './Feedback'
import { ArrayField } from './ArrayField'
import { ObjectField } from './ObjectField'
import { VirtualField } from './VirtualField'

const DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'

export class Form {
  displayName = 'Form'
  id: string
  initialized: boolean
  validating: boolean
  submitting: boolean
  modified: boolean
  pattern: FormPatternTypes
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  props: IFormProps
  heart: Heart
  feedback: Feedback
  fields: FormFields = {}
  requests: FormRequests = {}
  constructor(props: IFormProps) {
    this.initialize(props)
    this.makeObservable()
    this.makeSubscrible()
    this.onInit()
  }

  protected initialize(props: IFormProps) {
    this.id = uid()
    this.feedback = new Feedback()
    this.props = { ...Form.defaultProps, ...props }
    this.initialized = false
    this.submitting = false
    this.validating = false
    this.modified = false
    this.mounted = false
    this.unmounted = false
    this.pattern = this.props.pattern
    this.values = this.props.values || {}
    this.initialValues = this.props.initialValues || {}
  }

  protected makeObservable() {
    makeObservable(this, {
      fields: observable,
      initialized: observable,
      validating: observable,
      submitting: observable,
      modified: observable,
      pattern: observable,
      values: observable,
      initialValues: observable,
      mounted: observable,
      unmounted: observable,
      setValues: action,
      setValuesIn: action,
      setInitialValues: action,
      setInitialValuesIn: action,
      setPattern: action,
      deleteIntialValuesIn: action,
      deleteValuesIn: action,
      setSubmitting: action,
      setValidating: action,
      setFormGraph: action,
      createField: action,
      createArrayField: action,
      createObjectField: action,
      createVirtualField: action
    })
  }

  protected makeSubscrible() {
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this
    })
  }

  get valid() {
    return this.feedback.valid
  }

  get invalid() {
    return this.feedback.invalid
  }

  get errors() {
    return this.feedback.errors
  }

  get warnings() {
    return this.feedback.warnings
  }

  get successes() {
    return this.feedback.successes
  }

  get lifecycles() {
    return getLifeCyclesByEffects(this.props.effects, this)
  }

  /** 创建字段 **/

  createField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ) => {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new Field(path, props, this)
    }
    return this.fields[identifier] as Field<Decorator, Component>
  }

  createArrayField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ) => {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ArrayField(path, props, this)
    }
    return this.fields[identifier] as ArrayField<Decorator, Component>
  }

  createObjectField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ) => {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ObjectField(path, props, this)
    }
    return this.fields[identifier] as ObjectField<Decorator, Component>
  }

  createVirtualField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IVirtualFieldFactoryProps<Decorator, Component>
  ) => {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new VirtualField(path, props, this)
    }
    return this.fields[identifier] as VirtualField<Decorator, Component>
  }

  /** 状态操作模型 **/

  setValues = (values: any) => {
    this.modified = true
    this.values = values
    this.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  }

  setValuesIn = (pattern: FormPathPattern, value: any) => {
    FormPath.setIn(this.values, skipVirtualFieldPath(pattern, this), value)
  }

  deleteValuesIn = (pattern: FormPathPattern) => {
    FormPath.deleteIn(this.values, skipVirtualFieldPath(pattern, this))
  }

  existValuesIn = (pattern: FormPathPattern) => {
    return FormPath.existIn(this.values, skipVirtualFieldPath(pattern, this))
  }

  getValuesIn = (pattern: FormPathPattern) => {
    return FormPath.getIn(this.values, skipVirtualFieldPath(pattern, this))
  }

  setInitialValues = (initialValues: any) => {
    this.initialValues = initialValues
    this.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
  }

  setInitialValuesIn = (pattern: FormPathPattern, initialValue: any) => {
    FormPath.setIn(
      this.initialValues,
      skipVirtualFieldPath(pattern, this),
      initialValue
    )
  }

  deleteIntialValuesIn = (pattern: FormPathPattern) => {
    FormPath.deleteIn(this.initialValues, skipVirtualFieldPath(pattern, this))
  }

  existInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.existIn(
      this.initialValues,
      skipVirtualFieldPath(pattern, this)
    )
  }

  getInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.getIn(
      this.initialValues,
      skipVirtualFieldPath(pattern, this)
    )
  }

  setSubmitting = (submitting: boolean) => {
    if (submitting) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_START)
    }
    this.submitting = submitting
    if (!submitting) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_END)
    }
  }

  setValidating = (validating: boolean) => {
    clearTimeout(this.requests.validate)
    if (validating) {
      this.requests.validate = setTimeout(() => {
        runInAction(() => {
          this.validating = validating
          this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
        })
      }, 100)
    } else if (this.validating !== validating) {
      this.validating = validating
      this.notify(LifeCycleTypes.ON_FORM_VALIDATE_END)
    }
  }

  setPattern = (pattern: FormPatternTypes) => {
    this.pattern = pattern
  }

  addEffects = (id: string, effects: IFormProps['effects']) => {
    this.heart.addLifeCycles(id, getLifeCyclesByEffects(effects))
  }

  removeEffects = (id: string) => {
    this.heart.removeLifeCycles(id)
  }

  setEffects = (effects: IFormProps['effects']) => {
    this.heart.setLifeCycles(getLifeCyclesByEffects(effects))
  }

  query = (
    pattern: FormPathPattern | RegExp,
    filter?: (field: GeneralField, path: string) => boolean | void
  ): GeneralField[] => {
    const results = []
    for (let identifier in this.fields) {
      const field = this.fields[identifier]
      if (isRegExp(pattern)) {
        if (pattern.test(field.path.toString())) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) {
              results.push(field)
              break
            }
          } else {
            results.push(field)
          }
        }
      } else {
        if (FormPath.parse(pattern).match(field.path)) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) {
              results.push(field)
              break
            }
          } else {
            results.push(field)
          }
        }
      }
    }
    return results
  }

  notify = (type: LifeCycleTypes, payload?: any) => {
    this.heart.publish(type, isValid(payload) ? payload : this)
  }

  subscribe = (subscriber?: HeartSubscriber) => {
    return this.heart.subscribe(subscriber)
  }

  unsubscribe = (id: number) => {
    this.heart.unsubscribe(id)
  }

  /**事件钩子**/

  onInit = () => {
    this.initialized = true
    this.notify(LifeCycleTypes.ON_FORM_INIT)
  }

  onMount = () => {
    this.mounted = true
    this.notify(LifeCycleTypes.ON_FORM_MOUNT)
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].inject(this.id, this)
    }
  }

  onUnmount = () => {
    this.unmounted = true
    this.notify(LifeCycleTypes.ON_FORM_UNMOUNT)
    this.heart.clear()
    this.query('*', field => {
      if (!isVirtualField(field)) {
        field.dispose()
      }
    })
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].unmount(this.id)
    }
  }

  toJSON = (): IFormState => {
    return {
      displayName: this.displayName,
      id: this.id,
      validating: this.validating,
      values: toJS(this.values),
      initialValues: toJS(this.initialValues),
      submitting: this.submitting,
      valid: this.valid,
      invalid: this.invalid,
      initialized: this.initialized,
      mounted: this.mounted,
      unmounted: this.unmounted,
      modified: this.modified,
      errors: toJS(this.errors),
      warnings: toJS(this.warnings),
      successes: toJS(this.successes),
      pattern: this.pattern
    }
  }

  fromJSON = (state: IFormState) => {
    if (isValid(state.id) && !isEqual(this.id, state.id)) {
      this.id = state.id
    }
    if (
      isValid(state.initialized) &&
      !isEqual(this.initialized, state.initialized)
    ) {
      this.initialized = state.initialized
    }
    if (
      isValid(state.validating) &&
      !isEqual(this.validating, state.validating)
    ) {
      this.validating = state.validating
    }
    if (
      isValid(state.submitting) &&
      !isEqual(this.submitting, state.submitting)
    ) {
      this.submitting = state.submitting
    }
    if (isValid(state.values) && !isEqual(this.values, state.values)) {
      this.values = state.values
    }
    if (
      isValid(state.initialValues) &&
      !isEqual(this.initialValues, state.initialValues)
    ) {
      this.initialValues = state.initialValues
    }
    if (isValid(state.mounted) && !isEqual(this.mounted, state.mounted)) {
      this.mounted = state.mounted
    }
    if (isValid(state.unmounted) && !isEqual(this.unmounted, state.unmounted)) {
      this.unmounted = state.unmounted
    }
    if (isValid(state.modified) && !isEqual(this.modified, state.modified)) {
      this.modified = state.modified
    }
    if (isValid(state.pattern) && !isEqual(this.pattern, state.pattern)) {
      this.pattern = state.pattern
    }
    if (isValid(state.errors) && !isEqual(this.errors, state.errors)) {
      this.feedback.update(...state.errors)
    }
    if (isValid(state.warnings) && !isEqual(this.warnings, state.warnings)) {
      this.feedback.update(...state.warnings)
    }
    if (isValid(state.successes) && !isEqual(this.successes, state.successes)) {
      this.feedback.update(...state.successes)
    }
  }

  getFormGraph = (): IFormGraph => {
    const graph = {}
    graph[''] = this.toJSON()
    this.query('*', (field, path) => {
      graph[path] = field.toJSON()
    })
    return graph
  }

  setFormGraph = (graph: IFormGraph) => {
    each(graph, (state, path) => {
      if (isFormState(state)) {
        this.fromJSON(state)
      } else {
        if (this.fields[path]) {
          this.fields[path].fromJSON(state as any)
        } else {
          if (isFieldState(state)) {
            this.fields[path] = new Field(path, {}, this)
          } else if (isArrayFieldState(state)) {
            this.fields[path] = new ArrayField(path, {}, this)
          } else if (isObjectFieldState(state)) {
            this.fields[path] = new ObjectField(path, {}, this)
          } else {
            this.fields[path] = new VirtualField(path, {}, this)
          }
          this.fields[path].fromJSON(state as any)
        }
      }
    })
  }

  validate = async (pattern: FormPathPattern | RegExp = '*') => {
    this.setValidating(true)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
    const tasks = []
    this.query(pattern, field => {
      if (!isVirtualField(field)) {
        tasks.push(field.validate())
      }
    })
    await Promise.all(tasks)
    this.setValidating(false)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_END)
    if (this.feedback.invalid) {
      throw this.feedback.errors
    }
  }

  submit = async (onSubmit?: (values: any) => Promise<any> | void) => {
    this.setSubmitting(true)
    this.feedback.clear({
      code: 'SubmitError'
    })
    try {
      await this.validate()
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS)
    } catch (e) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED)
    }
    let results: any
    try {
      if (isFn(onSubmit) && this.feedback.valid) {
        results = await onSubmit(toJS(this.values))
      }
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS)
    } catch (e) {
      this.feedback.update({
        code: 'SubmitError',
        type: 'error',
        messages: e
      })
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_FAILED)
      new Promise(() => {
        throw e
      })
    }
    this.setSubmitting(false)
    return results
  }

  reset = async (
    pattern: FormPathPattern | RegExp = '*',
    options?: IFieldResetOptions
  ) => {
    const tasks = []
    this.query(pattern, field => {
      if (!isVirtualField(field)) {
        tasks.push(field.reset(options))
      }
    })
    this.notify(LifeCycleTypes.ON_FORM_RESET)
    await Promise.all(tasks)
  }

  static defaultProps: IFormProps = {
    initialValues: {}
  }
}
