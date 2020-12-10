import { action, makeObservable, observable, toJS, runInAction } from 'mobx'
import {
  each,
  FormPath,
  FormPathPattern,
  isFn,
  isValid,
  uid,
  globalThisPolyfill,
  clone,
  defaults
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
  IFormProps,
  IFieldResetOptions,
  FormFields,
  IFieldFactoryProps,
  IVoidFieldFactoryProps
} from '../types'
import { isVoidField, getLifeCyclesByEffects } from '../shared'
import { Feedback } from './Feedback'
import { ArrayField } from './ArrayField'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'
import { Query } from './Query'
import { Graph } from './Graph'

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
  graph: Graph
  feedback: Feedback
  fields: FormFields = {}
  requests: FormRequests = {}
  constructor(props: IFormProps) {
    this.initialize(props)
    this.makeObservable()
    this.onInit()
  }

  protected initialize(props: IFormProps) {
    this.id = uid()
    this.props = { ...Form.defaultProps, ...props }
    this.initialized = false
    this.submitting = false
    this.validating = false
    this.modified = false
    this.mounted = false
    this.unmounted = false
    this.pattern = this.props.pattern
    this.values =
      clone(this.props.values) || clone(this.props.initialValues) || {}
    this.initialValues = clone(this.props.initialValues) || {}
    this.feedback = new Feedback()
    this.graph = new Graph(this)
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this
    })
  }

  protected makeObservable() {
    makeObservable(this, {
      fields: observable.shallow,
      initialized: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      modified: observable.ref,
      pattern: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      values: observable,
      initialValues: observable,
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
      createVoidField: action
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
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier]) {
      this.fields[identifier] = new Field(address, props, this)
    }
    return this.fields[identifier] as Field<Decorator, Component>
  }

  createArrayField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ) => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ArrayField(address, props, this)
    }
    return this.fields[identifier] as ArrayField<Decorator, Component>
  }

  createObjectField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ) => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ObjectField(address, props, this)
    }
    return this.fields[identifier] as ObjectField<Decorator, Component>
  }

  createVoidField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IVoidFieldFactoryProps<Decorator, Component>
  ) => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier]) {
      this.fields[identifier] = new VoidField(address, props, this)
    }
    return this.fields[identifier] as VoidField<Decorator, Component>
  }

  /** 状态操作模型 **/

  setValues = (values: any) => {
    this.modified = true
    this.values = values
    this.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  }

  setValuesIn = (pattern: FormPathPattern, value: any) => {
    FormPath.setIn(this.values, pattern, value)
  }

  deleteValuesIn = (pattern: FormPathPattern) => {
    FormPath.deleteIn(this.values, pattern)
  }

  existValuesIn = (pattern: FormPathPattern) => {
    return FormPath.existIn(this.values, pattern)
  }

  getValuesIn = (pattern: FormPathPattern) => {
    return FormPath.getIn(this.values, pattern)
  }

  setInitialValues = (initialValues: any) => {
    this.initialValues = initialValues
    this.values = defaults(this.initialValues, this.values)
    this.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
  }

  setInitialValuesIn = (pattern: FormPathPattern, initialValue: any) => {
    FormPath.setIn(this.initialValues, pattern, initialValue)
  }

  deleteIntialValuesIn = (pattern: FormPathPattern) => {
    FormPath.deleteIn(this.initialValues, pattern)
  }

  existInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.existIn(this.initialValues, pattern)
  }

  getInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.getIn(this.initialValues, pattern)
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

  clearErrors = (pattern: FormPathPattern | RegExp = '*', code?: string) => {
    this.feedback.clear({
      type: 'error',
      address: pattern,
      code
    })
  }

  clearWarnings = (pattern: FormPathPattern | RegExp = '*', code?: string) => {
    this.feedback.clear({
      type: 'warning',
      address: pattern,
      code
    })
  }

  clearSuccesses = (pattern: FormPathPattern | RegExp = '*', code?: string) => {
    this.feedback.clear({
      type: 'success',
      address: pattern,
      code
    })
  }

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: '',
      form: this
    })
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
    each(this.fields, field => {
      field.dispose()
    })
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].unmount(this.id)
    }
  }

  getFormGraph = () => {
    return this.graph.getGraph()
  }

  setFormGraph = (graph: IFormGraph) => {
    this.graph.setGraph(graph)
  }

  validate = async (pattern: FormPathPattern | RegExp = '*') => {
    this.setValidating(true)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
    const tasks = []
    this.query(pattern).all.getAll(field => {
      if (!isVoidField(field)) {
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
    this.query(pattern).all.getAll(field => {
      if (!isVoidField(field)) {
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
