import { define, observable, batch, action, observe } from '@formily/reactive'
import {
  FormPath,
  FormPathPattern,
  isValid,
  uid,
  globalThisPolyfill,
  merge,
  isPlainObj,
  isArr,
  isObj,
} from '@formily/shared'
import { Heart } from './Heart'
import { Field } from './Field'
import {
  JSXComponent,
  LifeCycleTypes,
  HeartSubscriber,
  FormPatternTypes,
  IFormRequests,
  IFormFeedback,
  ISearchFeedback,
  IFormGraph,
  IFormProps,
  IFieldResetOptions,
  IFormFields,
  IFieldFactoryProps,
  IVoidFieldFactoryProps,
  IFormState,
  IModelGetter,
  IModelSetter,
  IFieldStateGetter,
  IFieldStateSetter,
  FormDisplayTypes,
  IFormMergeStrategy,
} from '../types'
import {
  createStateGetter,
  createStateSetter,
  createBatchStateSetter,
  createBatchStateGetter,
  triggerFormInitialValuesChange,
  triggerFormValuesChange,
  batchValidate,
  batchReset,
  batchSubmit,
  setValidating,
  setSubmitting,
  setLoading,
  getValidFormValues,
} from '../shared/internals'
import { isVoidField } from '../shared/checkers'
import { runEffects } from '../shared/effective'
import { ArrayField } from './ArrayField'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'
import { Query } from './Query'
import { Graph } from './Graph'

const DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'

export class Form<ValueType extends object = any> {
  displayName = 'Form'
  id: string
  initialized: boolean
  validating: boolean
  submitting: boolean
  loading: boolean
  modified: boolean
  pattern: FormPatternTypes
  display: FormDisplayTypes
  values: ValueType
  initialValues: ValueType
  mounted: boolean
  unmounted: boolean
  props: IFormProps<ValueType>
  heart: Heart
  graph: Graph
  fields: IFormFields = {}
  requests: IFormRequests = {}
  indexes: Record<string, string> = {}
  disposers: (() => void)[] = []

  constructor(props: IFormProps<ValueType>) {
    this.initialize(props)
    this.makeObservable()
    this.makeReactive()
    this.makeValues()
    this.onInit()
  }

  protected initialize(props: IFormProps<ValueType>) {
    this.id = uid()
    this.props = { ...props }
    this.initialized = false
    this.submitting = false
    this.validating = false
    this.loading = false
    this.modified = false
    this.mounted = false
    this.unmounted = false
    this.display = this.props.display || 'visible'
    this.pattern = this.props.pattern || 'editable'
    this.editable = this.props.editable
    this.disabled = this.props.disabled
    this.readOnly = this.props.readOnly
    this.readPretty = this.props.readPretty
    this.visible = this.props.visible
    this.hidden = this.props.hidden
    this.graph = new Graph(this)
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this,
    })
  }

  protected makeValues() {
    this.values = getValidFormValues(this.props.values)
    this.initialValues = getValidFormValues(this.props.initialValues)
  }

  protected makeObservable() {
    define(this, {
      fields: observable.shallow,
      indexes: observable.shallow,
      initialized: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      loading: observable.ref,
      modified: observable.ref,
      pattern: observable.ref,
      display: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      values: observable,
      initialValues: observable,
      valid: observable.computed,
      invalid: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      editable: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      disabled: observable.computed,
      setValues: action,
      setValuesIn: action,
      setInitialValues: action,
      setInitialValuesIn: action,
      setPattern: action,
      setDisplay: action,
      setState: action,
      deleteInitialValuesIn: action,
      deleteValuesIn: action,
      setSubmitting: action,
      setValidating: action,
      reset: action,
      submit: action,
      validate: action,
      onMount: batch,
      onUnmount: batch,
      onInit: batch,
    })
  }

  protected makeReactive() {
    this.disposers.push(
      observe(
        this,
        (change) => {
          triggerFormInitialValuesChange(this, change)
          triggerFormValuesChange(this, change)
        },
        true
      )
    )
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
    return runEffects(this, this.props.effects)
  }

  get hidden() {
    return this.display === 'hidden'
  }

  get visible() {
    return this.display === 'visible'
  }

  set hidden(hidden: boolean) {
    if (!isValid(hidden)) return
    if (hidden) {
      this.display = 'hidden'
    } else {
      this.display = 'visible'
    }
  }

  set visible(visible: boolean) {
    if (!isValid(visible)) return
    if (visible) {
      this.display = 'visible'
    } else {
      this.display = 'none'
    }
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
  ): Field<Decorator, Component> => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier] || this.props.designable) {
      batch(() => {
        new Field(address, props, this, this.props.designable)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
    }
    return this.fields[identifier] as any
  }

  createArrayField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ): ArrayField<Decorator, Component> => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier] || this.props.designable) {
      batch(() => {
        new ArrayField(
          address,
          {
            ...props,
            value: isArr(props.value) ? props.value : [],
          },
          this,
          this.props.designable
        )
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
    }
    return this.fields[identifier] as any
  }

  createObjectField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IFieldFactoryProps<Decorator, Component>
  ): ObjectField<Decorator, Component> => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier] || this.props.designable) {
      batch(() => {
        new ObjectField(
          address,
          {
            ...props,
            value: isObj(props.value) ? props.value : {},
          },
          this,
          this.props.designable
        )
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
    }
    return this.fields[identifier] as any
  }

  createVoidField = <
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(
    props: IVoidFieldFactoryProps<Decorator, Component>
  ): VoidField<Decorator, Component> => {
    const address = FormPath.parse(props.basePath).concat(props.name)
    const identifier = address.toString()
    if (!identifier) return
    if (!this.fields[identifier] || this.props.designable) {
      batch(() => {
        new VoidField(address, props, this, this.props.designable)
      })
      this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
    }
    return this.fields[identifier] as any
  }

  /** 状态操作模型 **/

  setValues = (values: any, strategy: IFormMergeStrategy = 'merge') => {
    if (!isPlainObj(values)) return
    if (strategy === 'merge' || strategy === 'deepMerge') {
      merge(this.values, values, {
        // never reach
        arrayMerge: (target, source) => source,
        assign: true,
      })
    } else if (strategy === 'shallowMerge') {
      Object.assign(this.values, values)
    } else {
      this.values = values as any
    }
  }

  setInitialValues = (
    initialValues: any,
    strategy: IFormMergeStrategy = 'merge'
  ) => {
    if (!isPlainObj(initialValues)) return
    if (strategy === 'merge' || strategy === 'deepMerge') {
      merge(this.initialValues, initialValues, {
        // never reach
        arrayMerge: (target, source) => source,
        assign: true,
      })
    } else if (strategy === 'shallowMerge') {
      Object.assign(this.initialValues, initialValues)
    } else {
      this.initialValues = initialValues as any
    }
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

  setInitialValuesIn = (pattern: FormPathPattern, initialValue: any) => {
    FormPath.setIn(this.initialValues, pattern, initialValue)
  }

  deleteInitialValuesIn = (pattern: FormPathPattern) => {
    FormPath.deleteIn(this.initialValues, pattern)
  }

  existInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.existIn(this.initialValues, pattern)
  }

  getInitialValuesIn = (pattern: FormPathPattern) => {
    return FormPath.getIn(this.initialValues, pattern)
  }

  setLoading = (loading: boolean) => {
    setLoading(this, loading)
  }

  setSubmitting = (submitting: boolean) => {
    setSubmitting(this, submitting)
  }

  setValidating = (validating: boolean) => {
    setValidating(this, validating)
  }

  setDisplay = (display: FormDisplayTypes) => {
    this.display = display
  }

  setPattern = (pattern: FormPatternTypes) => {
    this.pattern = pattern
  }

  addEffects = (id: any, effects: IFormProps['effects']) => {
    if (!this.heart.hasLifeCycles(id)) {
      this.heart.addLifeCycles(id, runEffects(this, effects))
    }
  }

  removeEffects = (id: any) => {
    this.heart.removeLifeCycles(id)
  }

  setEffects = (effects: IFormProps['effects']) => {
    this.heart.setLifeCycles(runEffects(this, effects))
  }

  clearErrors = (pattern: FormPathPattern = '*') => {
    this.query(pattern).forEach((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'error',
          messages: [],
        })
      }
    })
  }

  clearWarnings = (pattern: FormPathPattern = '*') => {
    this.query(pattern).forEach((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'warning',
          messages: [],
        })
      }
    })
  }

  clearSuccesses = (pattern: FormPathPattern = '*') => {
    this.query(pattern).forEach((field) => {
      if (!isVoidField(field)) {
        field.setFeedback({
          type: 'success',
          messages: [],
        })
      }
    })
  }

  query = (pattern: FormPathPattern): Query => {
    return new Query({
      pattern,
      base: '',
      form: this,
    })
  }

  queryFeedbacks = (search: ISearchFeedback): IFormFeedback[] => {
    return this.query(search.address || search.path || '*').reduce(
      (messages, field) => {
        if (isVoidField(field)) return messages
        return messages.concat(
          field
            .queryFeedbacks(search)
            .map((feedback) => ({
              ...feedback,
              address: field.address.toString(),
              path: field.path.toString(),
            }))
            .filter((feedback) => feedback.messages.length > 0)
        )
      },
      []
    )
  }

  notify = (type: string, payload?: any) => {
    this.heart.publish(type, payload ?? this)
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
    if (globalThisPolyfill[DEV_TOOLS_HOOK] && !this.props.designable) {
      globalThisPolyfill[DEV_TOOLS_HOOK].inject(this.id, this)
    }
  }

  onUnmount = () => {
    this.notify(LifeCycleTypes.ON_FORM_UNMOUNT)
    this.query('*').forEach((field) => field.destroy(false))
    this.disposers.forEach((dispose) => dispose())
    this.unmounted = true
    this.indexes = {}
    this.heart.clear()
    if (globalThisPolyfill[DEV_TOOLS_HOOK] && !this.props.designable) {
      globalThisPolyfill[DEV_TOOLS_HOOK].unmount(this.id)
    }
  }

  setState: IModelSetter<IFormState<ValueType>> = createStateSetter(this)

  getState: IModelGetter<IFormState<ValueType>> = createStateGetter(this)

  setFormState: IModelSetter<IFormState<ValueType>> = createStateSetter(this)

  getFormState: IModelGetter<IFormState<ValueType>> = createStateGetter(this)

  setFieldState: IFieldStateSetter = createBatchStateSetter(this)

  getFieldState: IFieldStateGetter = createBatchStateGetter(this)

  getFormGraph = () => {
    return this.graph.getGraph()
  }

  setFormGraph = (graph: IFormGraph) => {
    this.graph.setGraph(graph)
  }

  clearFormGraph = (pattern: FormPathPattern = '*', forceClear = true) => {
    this.query(pattern).forEach((field) => {
      field.destroy(forceClear)
    })
  }

  validate = (pattern: FormPathPattern = '*') => {
    return batchValidate(this, pattern)
  }

  submit = <T>(
    onSubmit?: (values: ValueType) => Promise<T> | void
  ): Promise<T> => {
    return batchSubmit(this, onSubmit)
  }

  reset = (pattern: FormPathPattern = '*', options?: IFieldResetOptions) => {
    return batchReset(this, pattern, options)
  }
}
