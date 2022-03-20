import {
  isValid,
  isEmpty,
  toArr,
  FormPathPattern,
  isArr,
} from '@formily/shared'
import {
  ValidatorTriggerType,
  parseValidatorDescriptions,
} from '@formily/validator'
import { define, observable, batch, toJS, action } from '@formily/reactive'
import {
  JSXComponent,
  LifeCycleTypes,
  IFieldFeedback,
  FeedbackMessage,
  IFieldCaches,
  IFieldRequests,
  FieldValidator,
  FieldDataSource,
  ISearchFeedback,
  IFieldProps,
  IFieldResetOptions,
  IFieldState,
  IModelSetter,
  IModelGetter,
} from '../types'
import {
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
  modifySelf,
  getValidFieldDefaultValue,
  initializeStart,
  initializeEnd,
  createChildrenFeedbackFilter,
  createReaction,
} from '../shared/internals'
import { Form } from './Form'
import { BaseField } from './BaseField'
import { IFormFeedback } from '..'
export class Field<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any,
  ValueType = any
> extends BaseField<Decorator, Component, TextType> {
  displayName = 'Field'

  props: IFieldProps<Decorator, Component, TextType, ValueType>

  loading: boolean
  validating: boolean
  submitting: boolean
  active: boolean
  visited: boolean
  selfModified: boolean
  modified: boolean
  inputValue: ValueType
  inputValues: any[]
  dataSource: FieldDataSource
  validator: FieldValidator
  feedbacks: IFieldFeedback[]
  caches: IFieldCaches = {}
  requests: IFieldRequests = {}

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form,
    designable: boolean
  ) {
    super()
    this.form = form
    this.props = props
    this.designable = designable
    initializeStart()
    this.locate(address)
    this.initialize()
    this.makeObservable()
    this.makeReactive()
    this.onInit()
    initializeEnd()
  }

  protected initialize() {
    this.initialized = false
    this.loading = false
    this.validating = false
    this.submitting = false
    this.selfModified = false
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
      path: observable.ref,
      title: observable.ref,
      description: observable.ref,
      dataSource: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      loading: observable.ref,
      validating: observable.ref,
      submitting: observable.ref,
      selfModified: observable.ref,
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
      indexes: observable.computed,
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
      setData: action,
      setContent: action,
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
      createReaction(
        () => this.value,
        (value) => {
          this.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
          if (isValid(value) && this.selfModified && !this.caches.inputting) {
            validateSelf(this)
          }
        }
      ),
      createReaction(
        () => this.initialValue,
        () => {
          this.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE)
        }
      ),
      createReaction(
        () => this.display,
        (display) => {
          const value = this.value
          if (display === 'visible') {
            if (isEmpty(value)) {
              this.setValue(this.caches.value)
              this.caches.value = undefined
            }
          } else {
            this.caches.value = toJS(value) ?? toJS(this.initialValue)
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
      createReaction(
        () => this.pattern,
        (pattern) => {
          if (pattern !== 'editable') {
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

  get selfErrors(): FeedbackMessage {
    return queryFeedbackMessages(this, {
      type: 'error',
    })
  }

  get errors(): IFormFeedback[] {
    return this.form.errors.filter(createChildrenFeedbackFilter(this))
  }

  get selfWarnings(): FeedbackMessage {
    return queryFeedbackMessages(this, {
      type: 'warning',
    })
  }

  get warnings(): IFormFeedback[] {
    return this.form.warnings.filter(createChildrenFeedbackFilter(this))
  }

  get selfSuccesses(): FeedbackMessage {
    return queryFeedbackMessages(this, {
      type: 'success',
    })
  }

  get successes(): IFormFeedback[] {
    return this.form.successes.filter(createChildrenFeedbackFilter(this))
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

  get required() {
    const validators = isArr(this.validator)
      ? this.validator
      : parseValidatorDescriptions(this.validator)
    return validators.some((desc) => !!desc?.['required'])
  }

  get validateStatus() {
    if (this.validating) return 'validating'
    if (this.selfInvalid) return 'error'
    if (this.selfWarnings.length) return 'warning'
    if (this.selfSuccesses.length) return 'success'
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

  setLoading = (loading?: boolean) => {
    setLoading(this, loading)
  }

  setValidating = (validating?: boolean) => {
    setValidating(this, validating)
  }

  setSubmitting = (submitting?: boolean) => {
    setSubmitting(this, submitting)
  }

  setState: IModelSetter<IFieldState> = createStateSetter(this)

  getState: IModelGetter<IFieldState> = createStateGetter(this)

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
    this.modify()
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

  queryFeedbacks = (search?: ISearchFeedback): IFieldFeedback[] => {
    return queryFeedbacks(this, search)
  }

  modify = () => modifySelf(this)
}
