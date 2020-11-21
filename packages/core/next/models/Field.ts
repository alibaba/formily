import { FormPath } from '@formily/shared'
import { validate, ValidatorTriggerType, Validator } from '@formily/validator'
import { action, makeObservable, observable } from 'mobx'
import { FunctionComponent } from '../types'
import { FeedbackMessage } from './Feedback'
import { Form } from './Form'
import { LifeCycleTypes } from './LifeCycle'

export type FieldDecorator<Decorator extends FunctionComponent> =
  | [Decorator, Parameters<Decorator>[0]]
  | []
  | [Decorator]

export type FieldComponent<Component extends FunctionComponent> =
  | [Component, Parameters<Component>[0]]
  | []
  | [Component]

export type FieldDisplayTypes = 'none' | 'hidden' | 'visibility'

export type FieldPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'

export type FieldValidator = Validator

export interface IFieldProps<
  Decorator extends FunctionComponent = any,
  Component extends FunctionComponent = any
> {
  path?: FormPath
  initialValue?: any
  void?: boolean
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  validator?: Validator
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
}
export class Field<
  Decorator extends FunctionComponent = any,
  Component extends FunctionComponent = any
> {
  void: boolean
  display: FieldDisplayTypes
  pattern: FieldPatternTypes
  loading: boolean
  validating: boolean
  modified: boolean
  active: boolean
  visited: boolean
  value: any
  inputValue: any
  inputValues: any[]
  recycledValue: any
  initialValue: any
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  validator: FieldValidator
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  form: Form
  path: FormPath
  props: IFieldProps<Decorator, Component>
  constructor(props: IFieldProps<Decorator, Component>, form: Form) {
    this.initialize(props, form)
    this.makeObservable()
  }

  initialize(props: IFieldProps<Decorator, Component>, form: Form) {
    this.props = { ...Field.defaultProps, ...props }
    this.path = props.path
    this.form = form
    this.initialized = false
    this.loading = false
    this.validating = false
    this.modified = false
    this.active = false
    this.visited = false
    this.mounted = false
    this.unmounted = false
    this.void = this.props.void
    this.display = this.props.display
    this.pattern = this.props.pattern
    this.validator = this.props.validator
    this.decorator = this.props.decorator
    this.component = this.props.component
    this.initialValue = this.props.initialValue
    this.recycledValue = null
    this.inputValue = null
    this.value = null
    this.inputValues = []
  }

  get errors() {
    return this.form.feedback.find({ path: this.path, type: 'error' })
  }

  setErrors(messages: FeedbackMessage) {
    this.form.feedback.update({
      type: 'error',
      code: 'EffectError',
      path: this.path,
      messages
    })
  }

  get warnings() {
    return this.form.feedback.find({ path: this.path, type: 'warning' })
  }

  setWarnings(messages: FeedbackMessage) {
    this.form.feedback.update({
      type: 'warning',
      code: 'EffectWarning',
      path: this.path,
      messages
    })
  }

  setValue(value?: any) {
    this.value = value
    this.form.setValuesIn(this.path, value)
    this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
  }

  setInitialValue(initialValue?: any) {
    this.initialValue = initialValue
    this.form.setInitialValuesIn(this.path, initialValue)
    this.form.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, this)
  }

  setDisplay(type: FieldDisplayTypes) {
    if (type === 'visibility') {
      if (this.display === 'none') {
        this.setValue(this.recycledValue)
        this.recycledValue = null
      }
    } else if (type === 'none') {
      this.recycledValue = this.value
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

  onInit() {
    this.initialized = true
    this.form.notify(LifeCycleTypes.ON_FIELD_INIT, this)
    this.validate('onInit')
  }

  onMount() {
    this.mounted = true
    this.unmounted = false
    this.form.notify(LifeCycleTypes.ON_FIELD_MOUNT, this)
    this.validate('onMount')
  }

  onUnmount() {
    this.mounted = false
    this.unmounted = true
    this.form.notify(LifeCycleTypes.ON_FIELD_UNMOUNT, this)
    this.validate('onUnmount')
  }

  onInput(...args: any[]) {
    this.value = args[0]
    this.inputValue = args[0]
    this.inputValues = args
    this.modified = true
    this.form.modified = true
    FormPath.setIn(this.form.values, this.path, this.value)
    this.form.notify(LifeCycleTypes.ON_FIELD_INPUT_CHANGE, this)
    this.validate('onInput')
  }

  onFocus() {
    this.active = true
    this.visited = true
    this.validate('onFocus')
  }

  onBlur() {
    this.active = false
    this.validate('onBlur')
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
      value: observable,
      inputValue: observable,
      inputValues: observable,
      recycledValue: observable,
      initialValue: observable,
      initialized: observable,
      mounted: observable,
      unmounted: observable,
      validator: observable,
      decorator: observable,
      component: observable,
      setDisplay: action,
      setValue: action,
      setPattern: action,
      setInitialValue: action,
      setLoading: action,
      setErrors: action,
      setWarnings: action,
      onInput: action,
      onMount: action,
      onUnmount: action,
      onFocus: action,
      onBlur: action
    })
  }

  async validate(triggerType: ValidatorTriggerType = 'onInput') {
    const results = await validate(this.value, this.validator, {
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
    return {
      errors,
      warnings,
      successes
    }
  }

  async reset() {}

  static defaultProps: IFieldProps = {
    void: false,
    display: 'visibility',
    pattern: 'editable',
    decorator: [],
    component: []
  }
}
