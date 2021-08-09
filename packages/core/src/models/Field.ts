import {
  FormPath,
  isValid,
  isArr,
  FormPathPattern,
  isBool,
  each,
  isFn,
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
  autorun,
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
  validateToFeedbacks,
  initFieldUpdate,
  updateFeedback,
  queryFeedbacks,
  queryFeedbackMessages,
  getValuesFromEvent,
  modelStateSetter,
  modelStateGetter,
  isHTMLInputEvent,
  initFieldValue,
} from '../shared/internals'
import { isArrayField, isObjectField } from '../shared/checkers'
import { Query } from './Query'

const RESPONSE_REQUEST_DURATION = 100

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
  decoratorType: Decorator
  decoratorProps: Record<string, any>
  componentType: Component
  componentProps: Record<string, any>
  feedbacks: IFieldFeedback[]
  address: FormPath
  path: FormPath

  form: Form
  props: IFieldProps<Decorator, Component, TextType, ValueType>

  protected caches: IFieldCaches = {}
  protected requests: IFieldRequests = {}
  protected disposers: (() => void)[] = []

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
    form: Form,
    designable: boolean
  ) {
    this.initialize(props, form)
    this.makeIndexes(address)
    this.makeObservable(designable)
    this.makeReactive(designable)
    this.onInit(designable)
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
    this.decorator = toArr(this.props.decorator)
    this.component = toArr(this.props.component)
  }

  protected makeObservable(designable: boolean) {
    if (designable) return
    define(this, {
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
      decoratorType: observable.ref,
      componentType: observable.ref,
      decoratorProps: observable,
      componentProps: observable,
      validator: observable.shallow,
      feedbacks: observable.shallow,
      component: observable.computed,
      decorator: observable.computed,
      errors: observable.computed,
      warnings: observable.computed,
      successes: observable.computed,
      valid: observable.computed,
      invalid: observable.computed,
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
      setErrors: action,
      setWarnings: action,
      setSuccesses: action,
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

  protected makeReactive(designable: boolean) {
    if (designable) return
    this.disposers.push(
      reaction(
        () => this.value,
        (value) => {
          this.form.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, this)
          if (isValid(value) && this.modified && !this.caches.inputting) {
            this.validate()
          }
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
    const reactions = toArr(this.props.reactions)
    this.form.addEffects(this, () => {
      reactions.forEach((reaction) => {
        if (isFn(reaction)) {
          this.disposers.push(autorun(() => reaction(this)))
        }
      })
    })
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
    return !this.errors.length
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
    if (this.invalid) return 'error'
    if (this.warnings.length) return 'warning'
    if (this.successes.length) return 'success'
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
      if (isArr(this.validator)) {
        this.validator = this.validator.map((desc: any) => {
          if (Object.prototype.hasOwnProperty.call(desc, 'required')) {
            desc.required = required
            return desc
          }
          return desc
        })
      } else {
        this.validator['required'] = required
      }
    } else {
      if (isArr(this.validator)) {
        this.validator.unshift({
          required,
        })
      } else if (typeof this.validator === 'object') {
        this.validator['required'] = required
      } else if (this.validator) {
        this.validator = [
          {
            required,
          },
          this.validator,
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

  setErrors = (messages?: FeedbackMessage) => {
    this.errors = messages
  }

  setWarnings = (messages?: FeedbackMessage) => {
    this.warnings = messages
  }

  setSuccesses = (messages?: FeedbackMessage) => {
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

  setDisplay = (type?: FieldDisplayTypes) => {
    this.display = type
  }

  setPattern = (type?: FieldPatternTypes) => {
    this.pattern = type
  }

  setLoading = (loading?: boolean) => {
    clearTimeout(this.requests.loading)
    if (loading) {
      this.requests.loading = setTimeout(() => {
        batch(() => {
          this.loading = loading
          this.form.notify(LifeCycleTypes.ON_FIELD_LOADING, this)
        })
      }, RESPONSE_REQUEST_DURATION)
    } else if (this.loading !== loading) {
      this.loading = loading
    }
  }

  setValidating = (validating?: boolean) => {
    clearTimeout(this.requests.validating)
    if (validating) {
      this.requests.validating = setTimeout(() => {
        batch(() => {
          this.validating = validating
          this.form.notify(LifeCycleTypes.ON_FIELD_VALIDATING, this)
        })
      }, RESPONSE_REQUEST_DURATION)
    } else if (this.validating !== validating) {
      this.validating = validating
    }
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

  setState: IModelSetter<IFieldState> = modelStateSetter(this)

  getState: IModelGetter<IFieldState> = modelStateGetter(this)

  onInit = (designable: boolean) => {
    this.initialized = true
    batch.scope(() => {
      initFieldValue(this, designable)
    })
    batch.scope(() => {
      initFieldUpdate(this)
    })
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
    this.form.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE, this)
    this.form.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form)
    await this.validate('onInput')
    this.caches.inputting = false
  }

  onFocus = async (...args: any[]) => {
    if (args[0]?.target) {
      if (!isHTMLInputEvent(args[0], false)) return
    }
    this.active = true
    this.visited = true
    await this.validate('onFocus')
  }

  onBlur = async (...args: any[]) => {
    if (args[0]?.target) {
      if (!isHTMLInputEvent(args[0], false)) return
    }
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
    this.inputValue = undefined
    this.inputValues = []
    if (options?.forceClear) {
      if (isArrayField(this)) {
        this.value = [] as any
      } else if (isObjectField(this)) {
        this.value = {} as any
      } else {
        this.value = undefined
      }
    } else if (isValid(this.value)) {
      this.value = toJS(this.initialValue)
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

  queryFeedbacks = (search?: ISearchFeedback): IFieldFeedback[] => {
    return queryFeedbacks(this, search)
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
