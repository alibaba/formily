import { action, makeObservable, observable, toJS, runInAction } from 'mobx'
import {
  FormPath,
  FormPathPattern,
  isFn,
  isValid,
  uid,
  globalThisPolyfill,
  clone,
  defaults,
} from '@formily/shared'
import { Heart } from './Heart'
import { Field } from './Field'
import {
  JSXComponent,
  LifeCycleTypes,
  HeartSubscriber,
  FormPatternTypes,
  FormRequests,
  FormFeedback,
  ISearchFeedback,
  IFormGraph,
  IFormProps,
  IFieldResetOptions,
  FormFields,
  IFieldFactoryProps,
  IVoidFieldFactoryProps,
  IFormState,
  IModelGetter,
  IModelSetter,
  IFieldStateGetter,
  IFieldStateSetter,
} from '../types'
import {
  isVoidField,
  getLifeCyclesByEffects,
  createModelStateGetter,
  createModelStateSetter,
  createFieldStateSetter,
  createFieldStateGetter,
} from '../shared'
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
  fields: FormFields = {}
  requests: FormRequests = {}
  indexes: Map<string, string> = new Map()

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
    this.pattern = this.props.pattern || 'editable'
    this.values =
      clone(this.props.values) || clone(this.props.initialValues) || {}
    this.initialValues = clone(this.props.initialValues) || {}
    this.graph = new Graph(this)
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this,
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
      setState: action,
      deleteIntialValuesIn: action,
      deleteValuesIn: action,
      setSubmitting: action,
      setValidating: action,
      setFormGraph: action,
      onMount: action,
      onUnmount: action,
      onInit: action,
    })
  }

  get valid() {
    return !this.invalid
  }

  get invalid() {
    return this.errors.length > 0
  }

  get errors() {
    return this.queryFeedbacks({
      type: 'error',
    })
  }

  get warnings() {
    return this.queryFeedbacks({
      type: 'warning',
    })
  }

  get successes() {
    return this.queryFeedbacks({
      type: 'success',
    })
  }

  get lifecycles() {
    return getLifeCyclesByEffects(this.props.effects, this)
  }

  get editable() {
    return this.pattern === 'editable'
  }

  set editable(editable) {
    if (!isValid(editable)) return
    if (editable) {
      this.pattern = 'editable'
    } else {
      this.pattern = 'readPretty'
    }
  }

  get readOnly() {
    return this.pattern === 'readOnly'
  }

  set readOnly(readOnly) {
    if (!isValid(readOnly)) return
    if (readOnly) {
      this.pattern = 'readOnly'
    } else {
      this.pattern = 'editable'
    }
  }

  get disabled() {
    return this.pattern === 'disabled'
  }

  set disabled(disabled) {
    if (!isValid(disabled)) return
    if (disabled) {
      this.pattern = 'disabled'
    } else {
      this.pattern = 'editable'
    }
  }

  get readPretty() {
    return this.pattern === 'readPretty'
  }

  set readPretty(readPretty) {
    if (!isValid(readPretty)) return
    if (readPretty) {
      this.pattern = 'readPretty'
    } else {
      this.pattern = 'editable'
    }
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
      runInAction(() => {
        this.fields[identifier] = new Field(address, props, this)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
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
      runInAction(() => {
        this.fields[identifier] = new ArrayField(address, props, this)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
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
      runInAction(() => {
        this.fields[identifier] = new ObjectField(address, props, this)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
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
      runInAction(() => {
        this.fields[identifier] = new VoidField(address, props, this)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
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

  clearErrors = (pattern: FormPathPattern = '*') => {
    this.query(pattern).all.getAll((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'error',
          messages: [],
        })
      }
    })
  }

  clearWarnings = (pattern: FormPathPattern = '*') => {
    this.query(pattern).all.getAll((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'warning',
          messages: [],
        })
      }
    })
  }

  clearSuccesses = (pattern: FormPathPattern) => {
    this.query(pattern).all.getAll((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'success',
          messages: [],
        })
      }
    })
  }

  query = (pattern: FormPathPattern) => {
    return new Query({
      pattern,
      base: '',
      form: this,
    })
  }

  queryFeedbacks = (search: ISearchFeedback): FormFeedback[] => {
    return this.query(search.address || search.path || '*')
      .getAll()
      .reduce((messages, field) => {
        return messages.concat(
          field.queryFeedbacks(search).map((feedback) => ({
            ...feedback,
            address: field.address.toString(),
            path: field.path.toString(),
          }))
        )
      }, [])
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
    this.fields = {}
    this.indexes.clear()
    this.query('*').all.get((field) => field.dispose())
    if (globalThisPolyfill[DEV_TOOLS_HOOK]) {
      globalThisPolyfill[DEV_TOOLS_HOOK].unmount(this.id)
    }
  }

  setState: IModelSetter<IFormState> = createModelStateSetter(this)

  getState: IModelGetter<IFormState> = createModelStateGetter(this)

  setFormState: IModelSetter<IFormState> = createModelStateSetter(this)

  getFormState: IModelGetter<IFormState> = createModelStateGetter(this)

  setFieldState: IFieldStateSetter = createFieldStateSetter(this)

  getFieldState: IFieldStateGetter = createFieldStateGetter(this)

  getFormGraph = () => {
    return this.graph.getGraph()
  }

  setFormGraph = (graph: IFormGraph) => {
    this.graph.setGraph(graph)
  }

  validate = async (pattern: FormPathPattern = '*') => {
    this.setValidating(true)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
    const tasks = []
    this.query(pattern).all.getAll((field) => {
      if (!isVoidField(field)) {
        tasks.push(field.validate())
      }
    })
    await Promise.all(tasks)
    this.setValidating(false)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_END)
    if (this.invalid) {
      throw this.errors
    }
  }

  submit = async <T>(
    onSubmit?: (values: any) => Promise<T> | void
  ): Promise<T> => {
    this.setSubmitting(true)
    try {
      await this.validate()
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS)
    } catch (e) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED)
    }
    let results: any
    try {
      if (isFn(onSubmit) && this.valid) {
        results = await onSubmit(toJS(this.values))
      }
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS)
    } catch (e) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_FAILED)
      this.setSubmitting(false)
      throw e
    }
    this.setSubmitting(false)
    return results
  }

  reset = async (pattern: FormPathPattern, options?: IFieldResetOptions) => {
    const tasks = []
    this.query(pattern).all.getAll((field) => {
      if (!isVoidField(field)) {
        tasks.push(field.reset(options))
      }
    })
    this.notify(LifeCycleTypes.ON_FORM_RESET)
    await Promise.all(tasks)
  }

  static defaultProps: IFormProps = {
    initialValues: {},
  }
}
