import {
  FormPath,
  isValid,
  FormPathPattern,
  isEmpty,
  toArr,
} from '@formily/shared'
import {
  ValidatorTriggerType,
  parseValidatorDescriptions,
} from '@formily/validator'
import {
  define,
  observable,
  reaction,
  batch,
  toJS,
  action,
} from '@formily/reactive'
import { Form } from './Form'
import {
  JSXComponent,
  LifeCycleTypes,
  IFieldFeedback,
  FeedbackMessage,
  IFieldCaches,
  IFieldRequests,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldValidator,
  FieldDecorator,
  FieldComponent,
  FieldDataSource,
  ISearchFeedback,
  IFieldProps,
  IFieldResetOptions,
  IFieldState,
  IModelSetter,
  IModelGetter,
} from '../types'
import {
  buildNodeIndexes,
  initFieldUpdate,
  updateFeedback,
  queryFeedbacks,
  allowAssignDefaultValue,
  queryFeedbackMessages,
  getValuesFromEvent,
  createReactions,
  createStateSetter,
  createStateGetter,
  isHTMLInputEvent,
  setValidatorRule,
  batchValidate,
  batchSubmit,
  batchReset,
  setValidating,
  setSubmitting,
  setLoading,
  validateSelf,
  getValidFieldDefaultValue,
  initializeStart,
  initializeEnd,
} from '../shared/internals'
import { Query } from './Query'
export class Field<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any,
  ValueType = any
> {
  displayName = 'Field'
  title: TextType
  description: TextType
  selfDisplay: FieldDisplayTypes
  selfPattern: FieldPatternTypes
  loading: boolean
  validating: boolean
  submitting: boolean
  modified: boolean
  active: boolean
  visited: boolean
  inputValue: ValueType
  inputValues: any[]
  initialized: boolean
  dataSource: FieldDataSource
  mounted: boolean
  unmounted: boolean
  content: any
  data: any
  validator: FieldValidator
  decoratorType: Decorator
  decoratorProps: Record<string, any>
  componentType: Component
  componentProps: Record<string, any>
  feedbacks: IFieldFeedback[]
  address: FormPath
  path: FormPath

  form: Form
  designable: boolean
  props: IFieldProps<Decorator, Component, TextType, ValueType>

  caches: IFieldCaches = {}
  requests: IFieldRequests = {}
  disposers: (() => void)[] = []

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form,
    designable: boolean
  ) {
    this.form = form
    this.props = props
    this.designable = designable
    initializeStart()
    this.makeIndexes(address)
    this.initialize()
    this.makeObservable()
    this.makeReactive()
    this.onInit()
    initializeEnd()
  }

  protected makeIndexes(address: FormPathPattern) {
    this.form.fields[address.toString()] = this
    buildNodeIndexes(this, address)
  }

  protected initialize() {
    this.initialized = false
    this.loading = false
    this.validating = false
    this.submitting = false
    this.modified = false
    this.active = false
    this.visited = false
    this.mounted = false
    this.unmounted = false
    this.inputValues = []
    this.inputValue = null
    this.feedbacks = []
    this.title = this.props.title
    this.description = this.props.description
    this.display = this.props.display
    this.pattern = this.props.pattern
    this.editable = this.props.editable
    this.disabled = this.props.disabled
    this.readOnly = this.props.readOnly
    this.readPretty = this.props.readPretty
    this.visible = this.props.visible
    this.hidden = this.props.hidden
    this.dataSource = this.props.dataSource
    this.validator = this.props.validator
    this.required = this.props.required
    this.content = this.props.content
    this.value = getValidFieldDefaultValue(
      this.props.value,
      this.props.initialValue
    )
    this.initialValue = this.props.initialValue
    this.data = this.props.data
    this.decorator = toArr(this.props.decorator)
    this.component = toArr(this.props.component)
  }

  protected makeObservable() {
    if (this.designable) return
    define(this, {
      title: observable.ref,
      description: observable.ref,
      dataSource: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      loading: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      modified: observable.ref,
      active: observable.ref,
      visited: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      inputValue: observable.ref,
      inputValues: observable.ref,
      decoratorType: observable.ref,
      componentType: observable.ref,
      content: observable.ref,
      decoratorProps: observable,
      componentProps: observable,
      validator: observable.shallow,
      feedbacks: observable.shallow,
      data: observable.shallow,
      component: observable.computed,
      decorator: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      valid: observable.computed,
      invalid: observable.computed,
      selfErrors: observable.computed,
      selfWarnings: observable.computed,
      selfSuccesses: observable.computed,
      selfValid: observable.computed,
      selfInvalid: observable.computed,
      validateStatus: observable.computed,
      value: observable.computed,
      initialValue: observable.computed,
      display: observable.computed,
      pattern: observable.computed,
      required: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      disabled: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      editable: observable.computed,
      setDisplay: action,
      setTitle: action,
      setDescription: action,
      setDataSource: action,
      setValue: action,
      setPattern: action,
      setInitialValue: action,
      setLoading: action,
      setValidating: action,
      setFeedback: action,
      setSelfErrors: action,
      setSelfWarnings: action,
      setSelfSuccesses: action,
      setValidator: action,
      setRequired: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      validate: action,
      reset: action,
      onInit: batch,
      onInput: batch,
      onMount: batch,
      onUnmount: batch,
      onFocus: batch,
      onBlur: batch,
    })
  }

  protected makeReactive() {
    if (this.designable) return
    this.disposers.push(
      reaction(
        () => this.value,
        (value) => {
          this.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
          if (isValid(value) && this.modified && !this.caches.inputting) {
            validateSelf(this)
          }
        }
      ),
      reaction(
        () => this.initialValue,
        () => {
          this.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE)
        }
      ),
      reaction(
        () => this.display,
        (display) => {
          if (display === 'visible') {
            if (isEmpty(this.value)) {
              this.setValue(this.caches.value)
              this.caches.value = undefined
            }
          } else {
            this.caches.value = toJS(this.value)
            if (display === 'none') {
              this.form.deleteValuesIn(this.path)
            }
          }
          if (display === 'none' || display === 'hidden') {
            this.setFeedback({
              type: 'error',
              messages: [],
            })
          }
        }
      ),
      reaction(
        () => [this.pattern, this.unmounted],
        ([pattern, unmounted]) => {
          if (pattern !== 'editable' || unmounted) {
            this.setFeedback({
              type: 'error',
              messages: [],
            })
          }
        }
      )
    )
    createReactions(this)
  }

  get parent() {
    let parent = this.address.parent()
    let identifier = parent.toString()
    if (!identifier) return
    while (!this.form.fields[identifier]) {
      parent = parent.parent()
      identifier = parent.toString()
      if (!identifier) return
    }
    return this.form.fields[identifier]
  }

  get component() {
    return [this.componentType, this.componentProps]
  }

  set component(value: FieldComponent<Component>) {
    const component = toArr(value)
    this.componentType = component[0]
    this.componentProps = component[1] || {}
  }

  get decorator() {
    return [this.decoratorType, this.decoratorProps]
  }

  set decorator(value: FieldDecorator<Decorator>) {
    const decorator = toArr(value)
    this.decoratorType = decorator[0]
    this.decoratorProps = decorator[1] || {}
  }

  get selfErrors() {
    return queryFeedbackMessages(this, {
      type: 'error',
    })
  }

  get errors() {
    return this.form.queryFeedbacks({
      address: `${this.address}.**`,
      type: 'error',
    })
  }

  get selfWarnings() {
    return queryFeedbackMessages(this, {
      type: 'warning',
    })
  }

  get warnings() {
    return this.form.queryFeedbacks({
      address: `${this.address}.**`,
      type: 'warning',
    })
  }

  get selfSuccesses() {
    return queryFeedbackMessages(this, {
      type: 'success',
    })
  }

  get successes() {
    return this.form.queryFeedbacks({
      address: `${this.address}.**`,
      type: 'success',
    })
  }

  get selfValid() {
    return !this.selfErrors.length
  }

  get valid() {
    return !this.errors.length
  }

  get selfInvalid() {
    return !this.selfValid
  }

  get invalid() {
    return !this.valid
  }

  get value(): ValueType {
    return this.form.getValuesIn(this.path)
  }

  get initialValue(): ValueType {
    return this.form.getInitialValuesIn(this.path)
  }

  get display(): FieldDisplayTypes {
    const parentDisplay = this.parent?.display
    if (parentDisplay && parentDisplay !== 'visible') {
      if (this.selfDisplay && this.selfDisplay !== 'visible')
        return this.selfDisplay
      return parentDisplay
    }
    if (this.selfDisplay) return this.selfDisplay
    return parentDisplay || this.form.display || 'visible'
  }

  get pattern(): FieldPatternTypes {
    const parentPattern = this.parent?.pattern
    if (this.selfPattern) return this.selfPattern
    return parentPattern || this.form.pattern || 'editable'
  }

  get required() {
    return parseValidatorDescriptions(this.validator).some(
      (desc) => desc.required
    )
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

  get disabled() {
    return this.pattern === 'disabled'
  }

  get readOnly() {
    return this.pattern === 'readOnly'
  }

  get readPretty() {
    return this.pattern === 'readPretty'
  }

  get editable() {
    return this.pattern === 'editable'
  }

  get validateStatus() {
    if (this.validating) return 'validating'
    if (this.selfInvalid) return 'error'
    if (this.selfWarnings.length) return 'warning'
    if (this.selfSuccesses.length) return 'success'
  }

  set readOnly(readOnly: boolean) {
    if (!isValid(readOnly)) return
    if (readOnly) {
      this.pattern = 'readOnly'
    } else {
      this.pattern = 'editable'
    }
  }

  set editable(editable: boolean) {
    if (!isValid(editable)) return
    if (editable) {
      this.pattern = 'editable'
    } else {
      this.pattern = 'readPretty'
    }
  }

  set disabled(disabled: boolean) {
    if (!isValid(disabled)) return
    if (disabled) {
      this.pattern = 'disabled'
    } else {
      this.pattern = 'editable'
    }
  }

  set readPretty(readPretty: boolean) {
    if (!isValid(readPretty)) return
    if (readPretty) {
      this.pattern = 'readPretty'
    } else {
      this.pattern = 'editable'
    }
  }

  set pattern(pattern: FieldPatternTypes) {
    this.selfPattern = pattern
  }

  set display(display: FieldDisplayTypes) {
    this.selfDisplay = display
  }

  set required(required: boolean) {
    if (this.required === required) return
    this.setValidatorRule('required', required)
  }

  set value(value: ValueType) {
    if (!this.initialized) {
      if (this.display === 'none') {
        this.caches.value = value
        return
      }
      if (!allowAssignDefaultValue(this.value, value) && !this.designable) {
        return
      }
    }
    this.form.setValuesIn(this.path, value)
  }

  set initialValue(initialValue: ValueType) {
    if (!this.initialized) {
      if (
        !allowAssignDefaultValue(this.initialValue, initialValue) &&
        !this.designable
      ) {
        return
      }
    }
    this.form.setInitialValuesIn(this.path, initialValue)
  }

  set selfErrors(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'error',
      code: 'EffectError',
      messages,
    })
  }

  set selfWarnings(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'warning',
      code: 'EffectWarning',
      messages,
    })
  }

  set selfSuccesses(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'success',
      code: 'EffectSuccess',
      messages,
    })
  }

  setTitle = (title?: TextType) => {
    this.title = title
  }

  setDescription = (description?: TextType) => {
    this.description = description
  }

  setDataSource = (dataSource?: FieldDataSource) => {
    this.dataSource = dataSource
  }

  setFeedback = (feedback?: IFieldFeedback) => {
    updateFeedback(this, feedback)
  }

  setSelfErrors = (messages?: FeedbackMessage) => {
    this.selfErrors = messages
  }

  setSelfWarnings = (messages?: FeedbackMessage) => {
    this.selfWarnings = messages
  }

  setSelfSuccesses = (messages?: FeedbackMessage) => {
    this.selfSuccesses = messages
  }

  setValidator = (validator?: FieldValidator) => {
    this.validator = validator
  }

  setValidatorRule = (name: string, value: any) => {
    setValidatorRule(this, name, value)
  }

  setRequired = (required?: boolean) => {
    this.required = required
  }

  setValue = (value?: ValueType) => {
    this.value = value
  }

  setInitialValue = (initialValue?: ValueType) => {
    this.initialValue = initialValue
  }

  setDisplay = (type?: FieldDisplayTypes) => {
    this.display = type
  }

  setPattern = (type?: FieldPatternTypes) => {
    this.pattern = type
  }

  setLoading = (loading?: boolean) => {
    setLoading(this, loading)
  }

  setValidating = (validating?: boolean) => {
    setValidating(this, validating)
  }

  setSubmitting = (submitting?: boolean) => {
    setSubmitting(this, submitting)
  }

  setComponent = <C extends JSXComponent, ComponentProps extends object = {}>(
    component?: C,
    props?: ComponentProps
  ) => {
    if (component) {
      this.componentType = component as any
    }
    if (props) {
      this.componentProps = this.componentProps || {}
      Object.assign(this.componentProps, props)
    }
  }

  setComponentProps = <ComponentProps extends object = {}>(
    props?: ComponentProps
  ) => {
    if (props) {
      this.componentProps = this.componentProps || {}
      Object.assign(this.componentProps, props)
    }
  }

  setDecorator = <D extends JSXComponent, ComponentProps extends object = {}>(
    component?: D,
    props?: ComponentProps
  ) => {
    if (component) {
      this.decoratorType = component as any
    }
    if (props) {
      this.decoratorProps = this.decoratorProps || {}
      Object.assign(this.decoratorProps, props)
    }
  }

  setDecoratorProps = <ComponentProps extends object = {}>(
    props?: ComponentProps
  ) => {
    if (props) {
      this.decoratorProps = this.decoratorProps || {}
      Object.assign(this.decoratorProps, props)
    }
  }

  setState: IModelSetter<IFieldState> = createStateSetter(this)

  getState: IModelGetter<IFieldState> = createStateGetter(this)

  onInit = () => {
    this.initialized = true
    initFieldUpdate(this)
    this.notify(LifeCycleTypes.ON_FIELD_INIT)
  }

  onMount = () => {
    this.mounted = true
    this.unmounted = false
    this.notify(LifeCycleTypes.ON_FIELD_MOUNT)
  }

  onUnmount = () => {
    this.mounted = false
    this.unmounted = true
    this.notify(LifeCycleTypes.ON_FIELD_UNMOUNT)
  }

  onInput = async (...args: any[]) => {
    if (args[0]?.target) {
      if (!isHTMLInputEvent(args[0])) return
    }
    const values = getValuesFromEvent(args)
    const value = values[0]
    this.caches.inputting = true
    this.inputValue = value
    this.inputValues = values
    this.value = value
    this.modified = true
    this.form.modified = true
    this.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE)
    this.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form)
    await validateSelf(this, 'onInput')
    this.caches.inputting = false
  }

  onFocus = async (...args: any[]) => {
    if (args[0]?.target) {
      if (!isHTMLInputEvent(args[0], false)) return
    }
    this.active = true
    this.visited = true
    await validateSelf(this, 'onFocus')
  }

  onBlur = async (...args: any[]) => {
    if (args[0]?.target) {
      if (!isHTMLInputEvent(args[0], false)) return
    }
    this.active = false
    await validateSelf(this, 'onBlur')
  }

  validate = (triggerType?: ValidatorTriggerType) => {
    return batchValidate(this, `${this.address}.**`, triggerType)
  }

  submit = <T>(onSubmit?: (values: any) => Promise<T> | void): Promise<T> => {
    return batchSubmit(this, onSubmit)
  }

  reset = (options?: IFieldResetOptions) => {
    return batchReset(this, `${this.address}.**`, options)
  }

  query = (pattern: FormPathPattern) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form,
    })
  }

  queryFeedbacks = (search?: ISearchFeedback): IFieldFeedback[] => {
    return queryFeedbacks(this, search)
  }

  notify = (type: LifeCycleTypes, payload?: any) => {
    return this.form.notify(type, payload ?? this)
  }

  dispose = () => {
    this.disposers.forEach((dispose) => {
      dispose()
    })
    this.form.removeEffects(this)
  }

  destroy = () => {
    this.dispose()
    delete this.form.fields[this.address.toString()]
  }

  match = (pattern: FormPathPattern) => {
    return FormPath.parse(pattern).matchAliasGroup(this.address, this.path)
  }
}
