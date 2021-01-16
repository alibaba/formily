import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isBool,
  each,
  isFn,
  isPlainObj,
  isEmpty,
  toArr,
} from '@formily/shared'
import {
  ValidatorTriggerType,
  parseValidatorDescriptions,
} from '@formily/validator'
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
  toJS,
  IReactionDisposer,
  autorun,
} from 'mobx'
import { Form } from './Form'
import {
  JSXComponent,
  JSXComponenntProps,
  LifeCycleTypes,
  Feedback,
  FeedbackMessage,
  FieldCaches,
  FieldRequests,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldValidator,
  FieldDecorator,
  FieldComponent,
  FieldDataSource,
  ISearchFeedback,
  IFieldProps,
  IFieldResetOptions,
  FormPatternTypes,
  IFieldState,
  IModelSetter,
  IModelGetter,
} from '../types'
import {
  buildNodeIndexes,
  validateToFeedbacks,
  publishUpdate,
  updateFeedback,
  queryFeedbacks,
  queryFeedbackMessages,
  getValuesFromEvent,
  createModelStateSetter,
  createModelStateGetter,
} from '../shared'
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
  modified: boolean
  active: boolean
  visited: boolean
  inputValue: ValueType
  inputValues: any[]
  initialized: boolean
  dataSource: FieldDataSource
  mounted: boolean
  unmounted: boolean
  validator: FieldValidator
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>
  feedbacks: Feedback[]
  address: FormPath
  path: FormPath

  form: Form
  props: IFieldProps<Decorator, Component, TextType, ValueType>

  private caches: FieldCaches = {}
  private requests: FieldRequests = {}
  private disposers: IReactionDisposer[] = []

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form
  ) {
    this.initialize(props, form)
    this.makeIndexes(address)
    this.makeObservable()
    this.makeReactive()
    this.onInit()
  }

  protected makeIndexes(address: FormPathPattern) {
    buildNodeIndexes(this, address)
  }

  protected initialize(
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form
  ) {
    this.form = form
    this.props = props
    this.initialized = false
    this.loading = false
    this.validating = false
    this.modified = false
    this.active = false
    this.visited = false
    this.mounted = false
    this.unmounted = false
    this.inputValues = []
    this.inputValue = null
    this.feedbacks = []
    this.title = props.title
    this.description = props.description
    this.editable = this.props.editable
    this.disabled = this.props.disabled
    this.readOnly = this.props.readOnly
    this.readPretty = this.props.readPretty
    this.visible = this.props.visible
    this.hidden = this.props.hidden
    this.display = this.props.display
    this.pattern = this.props.pattern
    this.dataSource = this.props.dataSource
    this.validator = this.props.validator
    this.decorator = toArr(this.props.decorator)
    this.component = toArr(this.props.component)
    this.required = this.props.required
  }

  protected makeObservable() {
    makeObservable(this, {
      title: observable.ref,
      description: observable.ref,
      dataSource: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      loading: observable.ref,
      validating: observable.ref,
      modified: observable.ref,
      active: observable.ref,
      visited: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      inputValue: observable.ref,
      inputValues: observable.ref,
      validator: observable.ref,
      decorator: observable.ref,
      component: observable.ref,
      feedbacks: observable.ref,
      errors: computed,
      warnings: computed,
      successes: computed,
      display: computed,
      pattern: computed,
      value: computed,
      initialValue: computed,
      editable: computed,
      disabled: computed,
      readOnly: computed,
      readPretty: computed,
      required: computed,
      hidden: computed,
      visible: computed,
      validateStatus: computed,
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
      setErrors: action,
      setWarnings: action,
      setSuccesses: action,
      setValidator: action,
      setRequired: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      setState: action,
      onInit: action,
      onInput: action,
      onMount: action,
      onUnmount: action,
      onFocus: action,
      onBlur: action,
      reset: action,
    })
  }

  protected makeReactive() {
    this.disposers.push(
      reaction(
        () => this.value,
        () => {
          this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
        }
      ),
      reaction(
        () => this.initialValue,
        () => {
          this.form.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, this)
        }
      ),
      reaction(
        () => this.display,
        (display) => {
          if (display === 'none') {
            this.caches.value = toJS(this.value)
            this.setValue()
          } else if (display === 'visible') {
            if (isEmpty(this.value)) {
              this.setValue(this.caches.value)
              this.caches.value = undefined
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
    if (isArr(this.props.reactions)) {
      this.props.reactions.forEach((reaction) => {
        if (isFn(reaction)) {
          this.disposers.push(autorun(() => reaction(this)))
        }
      })
    }
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

  get errors() {
    return queryFeedbackMessages(this, {
      type: 'error',
    })
  }

  get warnings() {
    return queryFeedbackMessages(this, {
      type: 'warning',
    })
  }

  get successes() {
    return queryFeedbackMessages(this, {
      type: 'success',
    })
  }

  get valid() {
    return !this.errors?.length
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
    if (isValid(this.selfDisplay)) return this.selfDisplay
    return parentDisplay || this.form.display || 'visible'
  }

  get pattern(): FormPatternTypes {
    const parentPattern = this.parent?.pattern
    if (isValid(this.selfPattern)) return this.selfPattern
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
    if (this.invalid) return 'error'
    if (this.validating) return 'validating'
    if (this.warnings?.length) return 'warning'
    if (this.successes?.length) return 'success'
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
    if (!isBool(required)) return
    const hasRequired = parseValidatorDescriptions(this.validator).some(
      (desc) => 'required' in desc
    )
    if (hasRequired) {
      if (isPlainObj(this.validator)) {
        this.validator['required'] = required
      } else if (isArr(this.validator)) {
        this.validator = this.validator.map((desc) => {
          if ('required' in desc) {
            desc.required = required
            return desc
          }
          return desc
        })
      }
    } else {
      if (isPlainObj(this.validator)) {
        this.validator['required'] = required
      } else if (isArr(this.validator)) {
        this.validator.push({
          required,
        })
      } else if (this.validator) {
        this.validator = [
          this.validator,
          {
            required,
          },
        ]
      } else if (required) {
        this.validator = [
          {
            required,
          },
        ]
      }
    }
  }

  set value(value: ValueType) {
    this.form.setValuesIn(this.path, value)
  }

  set initialValue(initialValue: ValueType) {
    this.form.setInitialValuesIn(this.path, initialValue)
  }

  set errors(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'error',
      code: 'EffectError',
      messages,
    })
  }

  set warnings(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'warning',
      code: 'EffectWarning',
      messages,
    })
  }

  set successes(messages: FeedbackMessage) {
    this.setFeedback({
      type: 'success',
      code: 'EffectSuccess',
      messages,
    })
  }

  setTitle = (title: TextType) => {
    this.title = title
  }

  setDescription = (description: TextType) => {
    this.description = description
  }

  setDataSource = (dataSource: FieldDataSource) => {
    this.dataSource = dataSource
  }

  setFeedback = (feedback: Feedback) => {
    updateFeedback(this, feedback)
  }

  setErrors = (messages: FeedbackMessage) => {
    this.errors = messages
  }

  setWarnings = (messages: FeedbackMessage) => {
    this.warnings = messages
  }

  setSuccesses = (messages: FeedbackMessage) => {
    this.successes = messages
  }

  setValidator = (validator?: FieldValidator) => {
    this.validator = validator
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

  setDisplay = (type: FieldDisplayTypes) => {
    this.display = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.pattern = type
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setValidating = (validating: boolean) => {
    clearTimeout(this.requests.validate)
    if (validating) {
      this.requests.validate = setTimeout(() => {
        runInAction(() => {
          this.validating = validating
        })
      }, 100)
    } else if (this.validating !== validating) {
      this.validating = validating
    }
  }

  setComponent = <C extends JSXComponent>(
    component: C,
    props?: JSXComponenntProps<C>
  ) => {
    this.component = [
      component || this.component?.[0],
      { ...this.component?.[1], ...props },
    ]
  }

  setComponentProps = <C extends JSXComponent = Component>(
    props?: JSXComponenntProps<C>
  ) => {
    this.component = [this.component?.[0], { ...this.component?.[1], ...props }]
  }

  setDecorator = <D extends JSXComponent>(
    component: D,
    props?: JSXComponenntProps<D>
  ) => {
    this.decorator = [
      component || this.decorator?.[0],
      { ...this.decorator?.[1], ...props },
    ]
  }

  setDecoratorProps = <D extends JSXComponent = Decorator>(
    props?: JSXComponenntProps<D>
  ) => {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  setState: IModelSetter<IFieldState> = createModelStateSetter(this)

  getState: IModelGetter<IFieldState> = createModelStateGetter(this)

  onInit = () => {
    this.initialized = true
    this.form.notify(LifeCycleTypes.ON_FIELD_INIT, this)
    publishUpdate(this)
  }

  onMount = () => {
    this.mounted = true
    this.unmounted = false
    if (isEmpty(this.initialValue) && isValid(this.props.initialValue)) {
      this.form.setInitialValuesIn(this.path, this.props.initialValue)
    }
    if (isEmpty(this.value) && isValid(this.props.value)) {
      this.form.setValuesIn(this.path, this.props.value)
    }
    this.form.notify(LifeCycleTypes.ON_FIELD_MOUNT, this)
  }

  onUnmount = () => {
    this.mounted = false
    this.unmounted = true
    this.form.notify(LifeCycleTypes.ON_FIELD_UNMOUNT, this)
  }

  onInput = async (...args: any[]) => {
    const values = getValuesFromEvent(args)
    const value = values[0]
    this.inputValue = value
    this.inputValues = values
    this.value = value
    this.modified = true
    this.form.modified = true
    this.form.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form)
    await this.validate('onInput')
  }

  onFocus = async () => {
    this.active = true
    this.visited = true
    await this.validate('onFocus')
  }

  onBlur = async () => {
    this.active = false
    await this.validate('onBlur')
  }

  validate = async (triggerType?: ValidatorTriggerType) => {
    const start = () => {
      this.setValidating(true)
      this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_START, this)
    }
    const end = () => {
      this.setValidating(false)
      if (this.valid) {
        this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS, this)
      } else {
        this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED, this)
      }
      this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_END, this)
    }
    start()
    if (!triggerType) {
      const allTriggerTypes = parseValidatorDescriptions(this.validator).map(
        (desc) => desc.triggerType
      )
      const results = {}
      for (let i = 0; i < allTriggerTypes.length; i++) {
        const payload = await validateToFeedbacks(this, allTriggerTypes[i])
        each(payload, (result, key) => {
          results[key] = results[key] || []
          results[key] = results[key].concat(result)
        })
      }
      end()
      return results
    }
    const results = await validateToFeedbacks(this, triggerType)
    end()
    return results
  }

  reset = async (options?: IFieldResetOptions) => {
    this.modified = false
    this.visited = false
    this.feedbacks = []
    if (options?.clearInitialValue) {
      this.setInitialValue()
    }
    if (options?.forceClear) {
      this.inputValue = undefined
      this.inputValues = []
      this.setValue()
    } else {
      this.setValue(this.initialValue)
    }
    this.form.notify(LifeCycleTypes.ON_FIELD_RESET, this)

    if (options?.validate) {
      return await this.validate()
    }
  }

  query = (pattern: FormPathPattern) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form,
    })
  }

  queryFeedbacks = (search: ISearchFeedback): Feedback[] => {
    return queryFeedbacks(this, search)
  }

  dispose = () => {
    this.disposers.forEach((dispose) => {
      if (isFn(dispose)) {
        dispose()
      }
    })
  }

  match = (pattern: FormPathPattern) => {
    return FormPath.parse(pattern).matchAliasGroup(this.address, this.path)
  }
}
