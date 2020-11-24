import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isNum,
  isObj,
  isFn
} from '@formily/shared'
import {
  validate,
  ValidatorTriggerType,
  Validator,
  parseDescriptions
} from '@formily/validator'
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS
} from 'mobx'
import { IReactComponent, LifeCycleTypes } from '../types'
import { FeedbackInformation, FeedbackMessage } from './Feedback'
import { Form } from './Form'

type FieldRequests = {
  validate?: NodeJS.Timeout
}

type FieldCaches = {
  value?: any
  initialValue?: any
}

const isNumberIndex = (index: any): index is Number =>
  isNum(index) || /^\d+$/.test(index)

export type FieldDecorator<Decorator extends IReactComponent> =
  | [Decorator]
  | [Decorator, React.ComponentProps<Decorator>]
  | boolean

export type FieldComponent<Component extends IReactComponent> =
  | [Component]
  | [Component, React.ComponentProps<Component>]
  | boolean

export type FieldDisplayTypes = 'none' | 'hidden' | 'visibility'

export type FieldPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'

export type FieldValidator = Validator

export interface IFieldProps<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any
> {
  value?: any
  initialValue?: any
  void?: boolean
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  validator?: Validator
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
}

export interface IFieldResetOptions {
  forceClear?: boolean
  validate?: boolean
  clearInitialValue?: boolean
}

export interface IFieldState {
  void: boolean
  display: FieldDisplayTypes
  pattern: FieldPatternTypes
  loading: boolean
  validating: boolean
  modified: boolean
  active: boolean
  visited: boolean
  inputValue: any
  inputValues: any[]
  decorator: any[]
  component: any[]
  warnings: FeedbackInformation[]
  errors: FeedbackInformation[]
  successes: FeedbackInformation[]
  value: any
  initialValue: any
}
export interface IFieldMiddleware {
  (state: IFieldState, field: Field): IFieldState
}

export class Field<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any,
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
  decorator: FieldDecorator<any>
  component: FieldComponent<any>

  form: Form
  path: FormPath
  props: IFieldProps<Decorator, Component>
  caches: FieldCaches = {}
  requests: FieldRequests = {}
  constructor(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(path, props, form)
    this.makeObservable()
  }

  initialize(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.path = path
    this.props = { ...Field.defaultProps, ...props }
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
    this.caches.value = this.props.value
    this.caches.initialValue = this.props.initialValue
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
    return parseDescriptions(this.validator).some(desc => desc.required)
  }

  getState(): IFieldState {
    const base = {
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
    } as any
    return (
      this.form.props?.middlewares?.reduce((buf, middleware) => {
        if (!isFn(middleware)) return buf
        return { ...buf, ...middleware(buf, this) }
      }, base) || base
    )
  }

  getSibling(key: string) {
    const sibling = this.path?.parent()?.concat(key)
    const identifier = sibling?.toString()
    if (identifier && this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  getArraySibling(index: number, key?: FormPathPattern) {
    const array = this.array
    const sibling = array?.path?.concat(index).concat(key)
    const identifier = sibling?.toString()
    if (identifier && this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  getArrayBeforeSibling(key: FormPathPattern, step: number = 1) {
    return this.getArraySibling(this.index - step, key)
  }

  getArrayAfterSibling(key: FormPathPattern, step: number = 1) {
    return this.getArraySibling(this.index + step, key)
  }

  getChildren(key: number | string) {
    const children = this.path?.concat(key)
    const identifier = children.toString()
    if (this.form.fields[identifier]) {
      return this.form.fields[identifier]
    }
  }

  setErrors(messages: FeedbackMessage) {
    this.form.feedback.update({
      type: 'error',
      code: 'EffectError',
      path: this.path,
      messages
    })
  }

  setWarnings(messages: FeedbackMessage) {
    this.form.feedback.update({
      type: 'warning',
      code: 'EffectWarning',
      path: this.path,
      messages
    })
  }

  setValidator(validator: FieldValidator) {
    this.validator = validator
  }

  setRequired(required: boolean) {
    const hasRequired = parseDescriptions(this.validator).some(
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
          required: true
        })
      }
    }
  }

  setValue(value?: any) {
    if (this.void) return
    this.form.setValuesIn(this.path, value)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE, this.form)
  }

  setInitialValue(initialValue?: any) {
    if (this.void) return
    this.form.setInitialValuesIn(this.path, initialValue)
    this.form.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE, this.form)
  }

  setDisplay(type: FieldDisplayTypes) {
    if (type === 'visibility') {
      if (this.display === 'none') {
        this.setValue(this.caches.value)
        this.caches.value = null
      }
    } else if (type === 'none') {
      this.caches.value = toJS(this.value)
      this.setValue()
    }
    this.display = type
  }

  setPattern(type: FieldPatternTypes) {
    this.pattern = type
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  setValidating(validating: boolean) {
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

  setComponent<C extends IReactComponent>(
    component: C,
    props?: React.ComponentProps<C>
  ) {
    this.component = [component, { ...this.component?.[1], ...props }]
  }

  setComponentProps<C extends IReactComponent = Component>(
    props?: React.ComponentProps<C>
  ) {
    this.component = [this.component?.[0], { ...this.component?.[1], ...props }]
  }

  setDecorator<D extends IReactComponent>(
    component: D,
    props?: React.ComponentProps<D>
  ) {
    this.decorator = [component, { ...this.decorator?.[1], ...props }]
  }

  setDecoratorProps<D extends IReactComponent = Decorator>(
    props?: React.ComponentProps<D>
  ) {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  makeObservable() {
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
      onBlur: action
    })
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
    if (FormPath.existIn(this.form.values, this.path)) {
      if (
        this.computedDisplay === 'none' ||
        this.computedDisplay === 'visibility'
      ) {
        this.setValue()
      }
    } else {
      delete this.form.fields[this.path.toString()]
    }
  }

  onInput = (...args: any[]) => {
    if (this.void) return
    this.inputValue = args[0]
    this.inputValues = args
    this.modified = true
    this.form.modified = true
    this.form.setValuesIn(this.path, args[0])
    this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE, this.form)
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

  async validate(triggerType?: ValidatorTriggerType) {
    this.setValidating(true)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_START, this)
    const results = await validate(this.value, toJS(this.validator), {
      triggerType,
      validateFirst: this.form?.props?.validateFirst,
      context: this
    })
    const errors = []
    const warnings = []
    const successes = []
    results.forEach(({ type, message }) => {
      if (type === 'error') errors.push(message)
      if (type === 'warning') warnings.push(message)
      if (type === 'success') warnings.push(message)
    })
    if (errors.length) {
      this.form.feedback.update({
        type: 'error',
        code: 'ValidateError',
        path: this.path,
        messages: errors
      })
    }
    if (warnings.length) {
      this.form.feedback.update({
        type: 'warning',
        code: 'ValidateWarning',
        path: this.path,
        messages: warnings
      })
    }
    if (successes.length) {
      this.form.feedback.update({
        type: 'success',
        code: 'ValidateSuccess',
        path: this.path,
        messages: successes
      })
    }
    this.setValidating(false)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATE_END, this)
    return {
      errors,
      warnings,
      successes
    }
  }

  async reset(options?: IFieldResetOptions) {
    runInAction(() => {
      this.modified = false
      this.visited = false
      this.form.feedback.clear({
        path: this.path
      })
      if (options?.clearInitialValue) {
        this.setInitialValue(undefined)
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

  static defaultProps: IFieldProps = {
    void: false
  }
}
