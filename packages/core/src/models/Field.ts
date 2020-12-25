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
} from '../types'
import {
  buildNodeIndexes,
  validateToFeedbacks,
  updateFeedback,
  queryFeedbacks,
  queryFeedbackMessages,
  getValueFromEvent,
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
    this.selfDisplay = this.props.display
    this.selfPattern = this.props.pattern
    this.dataSource = this.props.dataSource
    this.validator = this.props.validator
    this.decorator = this.props.decorator
    this.component = this.props.component
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
      onInit: action,
      onInput: action,
      onMount: action,
      onUnmount: action,
      onFocus: action,
      onBlur: action,
    })
  }

  protected makeReactive() {
    this.disposers.push(
      reaction(
        () => this.value,
        () => {
          this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
          this.form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE, this.form)
        }
      ),
      reaction(
        () => this.initialValue,
        () => {
          this.form.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, this)
          this.form.notify(
            LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE,
            this.form
          )
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
    const iniialValue = this.form.getInitialValuesIn(this.path)
    return isValid(iniialValue) ? iniialValue : undefined
  }

  get display(): FieldDisplayTypes {
    if (this.selfDisplay) return this.selfDisplay
    return this.parent?.display || 'visible'
  }

  get pattern(): FormPatternTypes {
    if (this.selfPattern) return this.selfPattern
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get required() {
    return parseValidatorDescriptions(this.validator).some(
      (desc) => desc.required
    )
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
      } else {
        this.validator = [
          {
            required,
          },
        ]
      }
    }
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
    this.setFeedback({
      type: 'error',
      code: 'EffectError',
      messages,
    })
  }

  setWarnings = (messages: FeedbackMessage) => {
    this.setFeedback({
      type: 'warning',
      code: 'EffectWarning',
      messages,
    })
  }

  setSuccesses = (messages: FeedbackMessage) => {
    this.setFeedback({
      type: 'success',
      code: 'EffectSuccess',
      messages,
    })
  }

  setValidator = (validator?: FieldValidator) => {
    this.validator = validator
  }

  setRequired = (required?: boolean) => {
    this.required = required
  }

  setValue = (value?: ValueType) => {
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, value)
  }

  setInitialValue = (initialValue?: ValueType) => {
    this.form.setInitialValuesIn(this.path, initialValue)
  }

  setDisplay = (type: FieldDisplayTypes) => {
    this.selfDisplay = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.selfPattern = type
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
    } else {
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

  setState = (state?: Partial<IFieldState>) => {
    this.form.graph.setFieldState(this, state)
  }

  onInit = () => {
    this.initialized = true
    this.form.notify(LifeCycleTypes.ON_FIELD_INIT, this)
  }

  onMount = () => {
    this.mounted = true
    this.unmounted = false
    if (!isValid(this.initialValue)) {
      this.form.setInitialValuesIn(this.path, this.props.initialValue)
    }
    if (isEmpty(this.value)) {
      if (isValid(this.props.value)) {
        if (isEmpty(this.props.value) && !isEmpty(this.initialValue)) {
          this.form.setValuesIn(this.path, this.initialValue)
        } else {
          this.form.setValuesIn(this.path, this.props.value)
        }
      } else {
        this.form.setValuesIn(this.path, this.initialValue)
      }
    }
    this.form.notify(LifeCycleTypes.ON_FIELD_MOUNT, this)
  }

  onUnmount = () => {
    this.mounted = false
    this.unmounted = true
    this.form.notify(LifeCycleTypes.ON_FIELD_UNMOUNT, this)
  }

  onInput = (...args: any[]) => {
    const value = getValueFromEvent(args[0])
    this.inputValue = value
    this.inputValues = [value].concat(args.slice(1))
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, value)
    this.form.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form)
    this.validate('onInput')
  }

  onFocus = () => {
    this.active = true
    this.visited = true
    this.validate('onFocus')
  }

  onBlur = () => {
    this.active = false
    this.validate('onBlur')
  }

  validate = async (triggerType?: ValidatorTriggerType) => {
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
      return results
    }
    this.setValidating(true)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_START, this)
    const results = await validateToFeedbacks(this, triggerType)
    this.setValidating(false)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_END, this)
    return results
  }

  reset = async (options?: IFieldResetOptions) => {
    runInAction(() => {
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
    })
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
}
