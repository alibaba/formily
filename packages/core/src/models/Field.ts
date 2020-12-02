import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isObj,
  isFn,
  isBool,
  each
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
  IFieldResetOptions,
  IFieldMiddleware,
  FormPatternTypes
} from '../types'
import { validateToFeedback } from '../shared'
import { Query } from './Query'

export class Field<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  ValueType = any
> {
  displayName = 'Field'
  display_: FieldDisplayTypes
  pattern_: FieldPatternTypes
  middlewares_: IFieldMiddleware[]
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

  constructor(
    path: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(path, props, form)
    this.makeObservable()
    this.makeReactive()
    this.onInit()
  }

  protected initialize(
    path: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.path = FormPath.parse(path)
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
    this.display_ = this.props.display
    this.pattern_ = this.props.pattern
    this.middlewares_ = this.props.middlewares
    this.validator = this.props.validator
    this.decorator = this.props.decorator
    this.component = this.props.component
    this.setCacheValue(this.props.value)
    this.setCacheInitialValue(this.props.initialValue)
    this.setRequired(this.props.required)
  }

  protected makeObservable() {
    makeObservable(this, {
      display_: observable.ref,
      pattern_: observable.ref,
      middlewares_: observable.ref,
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
      middlewares: computed,
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
      setMiddlewares: action,
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
    if (isFn(this.props.reaction)) {
      this.disposers.push(autorun(() => this.props.reaction(this, this.form)))
    }
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

  get display(): FieldDisplayTypes {
    if (this.display_) return this.display_
    return this.parent?.display || 'visibility'
  }

  get pattern(): FormPatternTypes {
    if (this.pattern_) return this.pattern_
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get middlewares(): IFieldMiddleware[] {
    const parents = this.parent?.middlewares || this.form.props?.middlewares
    if (isArr(this.middlewares_)) {
      if (isArr(parents)) {
        return parents.concat(this.middlewares_)
      }
      return this.middlewares_
    }
    return parents || []
  }

  get required() {
    return parseValidatorDescriptions(this.validator).some(
      desc => desc.required
    )
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
    this.display_ = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.pattern_ = type
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
    this.component = [
      component || this.component?.[0],
      { ...this.component?.[1], ...props }
    ]
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
    this.decorator = [
      component || this.decorator?.[0],
      { ...this.decorator?.[1], ...props }
    ]
  }

  setDecoratorProps = <D extends JSXComponent = Decorator>(
    props?: React.ComponentProps<D>
  ) => {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  setMiddlewares = (middlewares: IFieldMiddleware[]) => {
    this.middlewares_ = middlewares
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

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: this.path,
      form: this.form
    })
  }

  reduce = (): IFieldState => {
    const baseState = this.form.graph.getFieldState(this)
    return (
      this.middlewares.reduce((buf, middleware) => {
        if (!isFn(middleware)) return buf
        return { ...buf, ...middleware(buf, this) }
      }, baseState) || baseState
    )
  }

  dispose = () => {
    this.disposers.forEach(dispose => {
      if (isFn(dispose)) {
        dispose()
      }
    })
  }
}
