import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isObj,
  isFn,
  isBool,
  each,
  isEqual
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
  IReactionDisposer
} from 'mobx'
import { Form } from './Form'
import {
  JSXComponent,
  LifeCycleTypes,
  FeedbackMessage,
  FieldCaches,
  FieldRequests,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldValidator,
  FieldDecorator,
  FieldComponent,
  IFieldProps,
  IFieldState,
  IFieldResetOptions
} from '../types'
import { isNumberIndex, internalValidate } from '../shared'

export class Field<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  ValueType = any
> {
  void: boolean
  display: FieldDisplayTypes
  pattern: FieldPatternTypes
  loading: boolean
  validating: boolean
  modified: boolean
  active: boolean
  visited: boolean
  inputValue: ValueType
  inputValues: any[]
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  validator: FieldValidator
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  form: Form
  path: FormPath
  props: IFieldProps<Decorator, Component>
  caches: FieldCaches = {}
  requests: FieldRequests = {}
  disposers: IReactionDisposer[] = []
  displayName = 'Field'

  constructor(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(path, props, form)
    this.makeObservable()
    this.makeReactive()
  }

  protected getFieldProps(props: IFieldProps<Decorator, Component>) {
    return props
  }

  protected initialize(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.path = path
    this.props = this.getFieldProps({ ...Field.defaultProps, ...props })
    this.initialized = false
    this.loading = false
    this.validating = false
    this.modified = false
    this.active = false
    this.visited = false
    this.mounted = false
    this.unmounted = false
    this.inputValues = []
    this.void = this.props.void
    this.display = this.props.display
    this.pattern = this.props.pattern
    this.validator = this.props.validator
    this.decorator = this.props.decorator
    this.component = this.props.component
    this.setCacheValue(this.props.value)
    this.setCacheInitialValue(this.props.initialValue)
    this.setRequired(this.props.required)
  }

  protected makeObservable() {
    makeObservable(this, {
      void: observable,
      display: observable,
      pattern: observable,
      loading: observable,
      validating: observable,
      modified: observable,
      active: observable,
      visited: observable,
      initialized: observable,
      mounted: observable,
      unmounted: observable,
      inputValue: observable.ref,
      inputValues: observable.ref,
      validator: observable.ref,
      decorator: observable.ref,
      component: observable.ref,
      value: computed,
      initialValue: computed,
      setDisplay: action,
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
      onInput: action,
      onMount: action,
      onUnmount: action,
      onFocus: action,
      onBlur: action,
      fromJSON: action
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
  }

  get parent() {
    let parent = this.path.parent()
    let identifier = parent.toString()
    while (!this.form.fields[identifier]) {
      parent = parent.parent()
      identifier = parent.toString()
      if (!identifier) return
    }
    return this.form.fields[identifier]
  }

  get array() {
    let parent = this.path.parent()
    let identifier = parent.toString()
    while (!isArr(this.form.fields[identifier]?.value)) {
      parent = parent.parent()
      identifier = parent.toString()
      if (!identifier) return
    }
    return this.form.fields[identifier]
  }

  get key() {
    return this.path?.segments[this.path.segments.length - 1]
  }

  get index() {
    for (let i = this.path?.segments.length - 1; i >= 0; i--) {
      const item = this.path.segments[i]
      if (isNumberIndex(item)) return item
    }
  }

  get errors() {
    return this.form.feedback.find({ path: this.path, type: 'error' })
  }

  get warnings() {
    return this.form.feedback.find({ path: this.path, type: 'warning' })
  }

  get successes() {
    return this.form.feedback.find({ path: this.path, type: 'success' })
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

  get computedDisplay() {
    if (this.display) return this.display
    return this.parent?.display || 'visibility'
  }

  get computedPattern() {
    if (this.pattern) return this.pattern
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get required() {
    return parseValidatorDescriptions(this.validator).some(
      desc => desc.required
    )
  }

  getState = (): IFieldState => {
    const baseState = this.toJSON()
    return (
      this.form.props?.middlewares?.reduce((buf, middleware) => {
        if (!isFn(middleware)) return buf
        return { ...buf, ...middleware(buf, this) }
      }, baseState) || baseState
    )
  }

  getSibling = (key: string) => {
    const sibling = this.path?.parent()?.concat(key)
    const identifier = sibling?.toString()
    if (identifier && this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  getArraySibling = (index: number, key?: FormPathPattern) => {
    const array = this.array
    const sibling = array?.path?.concat(index).concat(key)
    const identifier = sibling?.toString()
    if (identifier && this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  getArrayBeforeSibling = (key: FormPathPattern, step: number = 1) => {
    return this.getArraySibling(this.index - step, key)
  }

  getArrayAfterSibling = (key: FormPathPattern, step: number = 1) => {
    return this.getArraySibling(this.index + step, key)
  }

  getChildren = (key: number | string) => {
    const children = this.path?.concat(key)
    const identifier = children.toString()
    if (this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  setErrors = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'error',
      code: 'EffectError',
      path: this.path,
      messages
    })
  }

  setWarnings = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'warning',
      code: 'EffectWarning',
      path: this.path,
      messages
    })
  }

  setSuccesses = (messages: FeedbackMessage) => {
    this.form.feedback.update({
      type: 'success',
      code: 'EffectSuccess',
      path: this.path,
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
    if (this.void) return
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, value)
  }

  setCacheValue = (value?: ValueType) => {
    this.caches.value = value
  }

  setInitialValue = (initialValue?: ValueType) => {
    if (this.void) return
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
    } else {
      this.validating = validating
    }
  }

  setComponent = <C extends JSXComponent>(
    component: C,
    props?: React.ComponentProps<C>
  ) => {
    this.component = [component, { ...this.component?.[1], ...props }]
  }

  setComponentProps = <C extends JSXComponent = Component>(
    props?: React.ComponentProps<C>
  ) => {
    this.component = [this.component?.[0], { ...this.component?.[1], ...props }]
  }

  setDecorator = <D extends JSXComponent>(
    component: D,
    props?: React.ComponentProps<D>
  ) => {
    this.decorator = [component, { ...this.decorator?.[1], ...props }]
  }

  setDecoratorProps = <D extends JSXComponent = Decorator>(
    props?: React.ComponentProps<D>
  ) => {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  onInit = () => {
    this.initialized = true
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
    if (this.void) return
    this.inputValue = args[0]
    this.inputValues = args
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, args[0])
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
        const payload = await internalValidate(this, allTriggerTypes[i])
        each(payload, (result, key) => {
          results[key] = results[key] || []
          results[key] = results[key].concat(result)
        })
      }
      return results
    }
    this.setValidating(true)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_START, this)
    const results = await internalValidate(this, triggerType)
    this.setValidating(false)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_END, this)
    return results
  }

  reset = async (options?: IFieldResetOptions) => {
    runInAction(() => {
      this.modified = false
      this.visited = false
      this.form.feedback.clear({
        path: this.path
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

  toJSON = (): IFieldState => {
    return {
      displayName: this.displayName,
      path: this.path.toString(),
      void: this.void,
      display: this.computedDisplay,
      pattern: this.computedPattern,
      loading: this.loading,
      validating: this.validating,
      modified: this.modified,
      active: this.active,
      visited: this.visited,
      value: this.value,
      initialValue: this.initialValue,
      required: this.required,
      inputValue: this.inputValue,
      inputValues: this.inputValues,
      decorator: this.decorator,
      component: this.component,
      errors: toJS(this.errors),
      warnings: toJS(this.warnings),
      successes: toJS(this.successes)
    }
  }

  fromJSON = (state: IFieldState) => {
    if (!state) return
    if (isValid(state.void) && !isEqual(state.void, this.void)) {
      this.void = state.void
    }
    if (isValid(state.modified) && !isEqual(state.modified, this.modified)) {
      this.modified = state.modified
    }
    if (isValid(state.active) && !isEqual(state.active, this.active)) {
      this.active = state.active
    }
    if (isValid(state.visited) && !isEqual(state.visited, this.visited)) {
      this.visited = state.visited
    }
    if (
      isValid(state.inputValue) &&
      !isEqual(state.inputValue, this.inputValue)
    ) {
      this.inputValue = state.inputValue
    }
    if (
      isValid(state.inputValues) &&
      !isEqual(state.inputValues, this.inputValues)
    ) {
      this.inputValues = state.inputValues
    }
    if (isValid(state.component) && !isEqual(state.component, this.component)) {
      this.component = state.component
    }
    if (isValid(state.decorator) && !isEqual(state.decorator, this.decorator)) {
      this.decorator = state.decorator
    }
    if (isValid(state.value) && !isEqual(state.value, this.value)) {
      this.setValue(state.value)
    }
    if (isValid(state.errors) && isEqual(state.errors, this.errors)) {
      this.form.feedback.update(...state.errors)
    }
    if (isValid(state.warnings) && isEqual(state.warnings, this.warnings)) {
      this.form.feedback.update(...state.warnings)
    }
    if (isValid(state.successes) && isEqual(state.successes, this.successes)) {
      this.form.feedback.update(...state.successes)
    }
    if (
      isValid(state.initialValue) &&
      !isEqual(state.initialValue, this.initialValue)
    ) {
      this.setValue(state.initialValue)
    }
    if (isValid(state.required) && !isEqual(state.required, this.required)) {
      this.setRequired(state.required)
    }
    if (
      isValid(state.display) &&
      !isEqual(state.display, this.computedDisplay)
    ) {
      this.setDisplay(state.display)
    }
    if (
      isValid(state.pattern) &&
      !isEqual(state.pattern, this.computedPattern)
    ) {
      this.setPattern(state.pattern)
    }
    if (isValid(state.loading) && !isEqual(state.loading, this.loading)) {
      this.setLoading(state.loading)
    }
    if (
      isValid(state.validating) &&
      !isEqual(state.validating, this.validating)
    ) {
      this.setValidating(state.validating)
    }
  }

  static defaultProps: IFieldProps = {
    void: false
  }
}
