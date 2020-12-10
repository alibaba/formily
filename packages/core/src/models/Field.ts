import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isObj,
  isBool,
  each,
  isFn
} from '@formily/shared'
import {
  ValidatorTriggerType,
  parseValidatorDescriptions
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
  autorun
} from 'mobx'
import { Form } from './Form'
import {
  JSXComponent,
  JSXComponenntProps,
  LifeCycleTypes,
  FeedbackMessage,
  FieldCaches,
  FieldRequests,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldValidator,
  FieldDecorator,
  FieldComponent,
  FieldDataSource,
  IFieldProps,
  IFieldResetOptions,
  FormPatternTypes,
  IFieldState
} from '../types'
import {
  skipVoidAddress,
  validateToFeedback,
  getValueFromEvent
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

  address: FormPath

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
    this.initialize(address, props, form)
    this.makeObservable()
    this.makeReactive()
    this.onInit()
  }

  protected initialize(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form
  ) {
    this.form = form
    this.address = FormPath.parse(address)
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
    this.title = props.title
    this.description = props.description
    this.selfDisplay = this.props.display
    this.selfPattern = this.props.pattern
    this.dataSource = this.props.dataSource
    this.validator = this.props.validator
    this.decorator = this.props.decorator
    this.component = this.props.component
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
      onBlur: action
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
      )
    )
    if (isArr(this.props.reactions)) {
      this.props.reactions.forEach(reaction => {
        if (isFn(reaction)) {
          this.disposers.push(autorun(() => reaction(this)))
        }
      })
    }
  }

  get path() {
    return skipVoidAddress(this.address, this.form)
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
    return this.form.feedback.query({ address: this.address, type: 'error' })
  }

  get valid() {
    return !this.errors?.length
  }

  get invalid() {
    return !this.valid
  }

  get warnings() {
    return this.form.feedback.query({ address: this.address, type: 'warning' })
  }

  get successes() {
    return this.form.feedback.query({ address: this.address, type: 'success' })
  }

  get value(): ValueType {
    const value = this.form.getValuesIn(this.path)
    if (this.modified) {
      return value
    }
    return isValid(value)
      ? value
      : isValid(this.initialValue)
      ? this.initialValue
      : this.caches.value
  }

  get initialValue(): ValueType {
    const iniialValue = this.form.getInitialValuesIn(this.path)
    return isValid(iniialValue) ? iniialValue : this.caches.initialValue
  }

  get display(): FieldDisplayTypes {
    if (this.selfDisplay) return this.selfDisplay
    return this.parent?.display || 'visibility'
  }

  get pattern(): FormPatternTypes {
    if (this.selfPattern) return this.selfPattern
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get required() {
    return parseValidatorDescriptions(this.validator).some(
      desc => desc.required
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

  setTitle = (title: TextType) => {
    this.title = title
  }

  setDescription = (description: TextType) => {
    this.description = description
  }

  setDataSource = (dataSource: FieldDataSource) => {
    this.dataSource = dataSource
  }

  setErrors = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'error',
      code: 'EffectError',
      address: this.address,
      messages
    })
  }

  setWarnings = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'warning',
      code: 'EffectWarning',
      address: this.address,
      messages
    })
  }

  setSuccesses = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'success',
      code: 'EffectSuccess',
      address: this.address,
      messages
    })
  }

  setValidator = (validator: FieldValidator) => {
    this.validator = validator
  }

  setRequired = (required: boolean) => {
    if (!isBool(required)) return
    const hasRequired = parseValidatorDescriptions(this.validator).some(
      desc => 'required' in desc
    )
    if (hasRequired) {
      if (isObj(this.validator)) {
        this.validator['required'] = required
      } else if (isArr(this.validator)) {
        this.validator = this.validator.map(desc => {
          if ('required' in desc) {
            desc.required = required
            return desc
          }
          return desc
        })
      }
    } else {
      if (isObj(this.validator)) {
        this.validator['required'] = required
      } else if (isArr(this.validator)) {
        this.validator.push({
          required
        })
      } else if (this.validator) {
        this.validator = [
          this.validator,
          {
            required
          }
        ]
      } else {
        this.validator = [
          {
            required
          }
        ]
      }
    }
  }

  setValue = (value?: ValueType) => {
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, value)
  }

  setCacheValue = (value?: ValueType) => {
    this.caches.value = value
  }

  setInitialValue = (initialValue?: ValueType) => {
    this.form.setInitialValuesIn(this.path, initialValue)
  }

  setCacheInitialValue = (initialValue?: ValueType) => {
    this.caches.initialValue = initialValue
  }

  setDisplay = (type: FieldDisplayTypes) => {
    if (type === 'visibility') {
      if (this.display === 'none') {
        this.setValue(this.caches.value)
        this.setCacheValue()
      }
    } else if (type === 'none') {
      this.setCacheValue(toJS(this.value))
      this.setValue()
    }
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
      { ...this.component?.[1], ...props }
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
      { ...this.decorator?.[1], ...props }
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
    if (!isValid(this.initialValue)) {
      this.form.setInitialValuesIn(this.path, this.props.initialValue)
    }
    if (!isValid(this.value)) {
      if (isValid(this.props.value)) {
        this.form.setValuesIn(this.path, this.props.value)
      } else {
        this.form.setValuesIn(this.path, this.initialValue)
      }
    }
    this.setRequired(this.props.required)
    this.form.notify(LifeCycleTypes.ON_FIELD_INIT, this)
  }

  onMount = () => {
    this.mounted = true
    this.unmounted = false
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
    this.form.setValuesIn(this.address, value)
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
        desc => desc.triggerType
      )
      const results = {}
      for (let i = 0; i < allTriggerTypes.length; i++) {
        const payload = await validateToFeedback(this, allTriggerTypes[i])
        each(payload, (result, key) => {
          results[key] = results[key] || []
          results[key] = results[key].concat(result)
        })
      }
      return results
    }
    this.setValidating(true)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_START, this)
    const results = await validateToFeedback(this, triggerType)
    this.setValidating(false)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_END, this)
    return results
  }

  reset = async (options?: IFieldResetOptions) => {
    runInAction(() => {
      this.modified = false
      this.visited = false
      this.form.feedback.clear({
        address: this.address
      })
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

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form
    })
  }

  dispose = () => {
    this.disposers.forEach(dispose => {
      if (isFn(dispose)) {
        dispose()
      }
    })
  }
}
