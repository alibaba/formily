import { action, makeObservable, observable, toJS } from 'mobx'
import {
  FormPath,
  FormPathPattern,
  isFn,
  isRegExp,
  isValid
} from '@formily/shared'
import { Heart, HeartSubscriber } from './Heart'
import {
  IFieldProps,
  IFieldResetOptions,
  Field,
  IFieldMiddleware
} from './Field'
import { IReactComponent, LifeCycleTypes } from '../types'
import { Feedback } from './Feedback'
import { ArrayField } from './ArrayField'
import { ObjectField } from './ObjectField'
import { getLifecyclesFromEffects } from '../hook'

export type FormPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'

export interface IFormState {
  initialized: boolean
  validating: boolean
  submitting: boolean
  modified: boolean
  editable: boolean
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  [key: string]: any
}

export interface IFieldsMap {
  [key: string]: Field
}

export interface IFormProps {
  values?: {}
  initialValues?: {}
  pattern?: FormPatternTypes
  effects?: (form: Form) => void
  editable?: boolean
  validateFirst?: boolean
  middlewares?: IFieldMiddleware[]
}

export interface ICreateFieldProps<
  D extends IReactComponent,
  C extends IReactComponent
> extends IFieldProps<D, C> {
  name: FormPathPattern
  basePath?: FormPathPattern
}

export class Form {
  initialized: boolean

  validating: boolean

  submitting: boolean

  modified: boolean

  pattern: FormPatternTypes

  values: any

  initialValues: any

  mounted: boolean

  unmounted: boolean

  props: IFormProps

  heart: Heart

  feedback: Feedback

  fields: IFieldsMap

  constructor(props: IFormProps) {
    this.initialize(props)
    this.makeObservable()
    this.makeSubscrible()
  }

  initialize(props: IFormProps) {
    this.feedback = new Feedback()
    this.props = { ...Form.defaultProps, ...props }
    this.initialized = false
    this.submitting = false
    this.validating = false
    this.modified = false
    this.mounted = false
    this.unmounted = false
    this.pattern = this.props.pattern
    this.values = this.props.values
    this.initialValues = this.props.initialValues
  }

  get valid() {
    return this.feedback.valid
  }

  get invalid() {
    return this.feedback.invalid
  }

  get errors() {
    return this.feedback.errors
  }

  get warnings() {
    return this.feedback.warnings
  }

  get successes() {
    return this.feedback.successes
  }

  get lifecycles() {
    return getLifecyclesFromEffects(this.props.effects, this)
  }

  /** 创建字段 **/

  createField<
    Decorator extends IReactComponent,
    Component extends IReactComponent
  >(props: ICreateFieldProps<Decorator, Component>) {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new Field(props)
      this.fields[identifier].onInit()
    }
    this.fields[identifier].path = path
    this.fields[identifier].form = this
    return this.fields[identifier]
  }

  createArrayField<
    Decorator extends IReactComponent,
    Component extends IReactComponent
  >(props: ICreateFieldProps<Decorator, Component>) {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ArrayField(props)
      this.fields[identifier].onInit()
    }
    this.fields[identifier].path = path
    this.fields[identifier].form = this
    return this.fields[identifier]
  }

  createObjectField<
    Decorator extends IReactComponent,
    Component extends IReactComponent
  >(props: ICreateFieldProps<Decorator, Component>) {
    const path = FormPath.parse(props.basePath).concat(props.name)
    const identifier = path.toString()
    if (!this.fields[identifier]) {
      this.fields[identifier] = new ObjectField(props)
      this.fields[identifier].onInit()
    }
    this.fields[identifier].path = path
    this.fields[identifier].form = this
    return this.fields[identifier]
  }

  /** 状态操作模型 **/

  setValues(values: any) {
    this.modified = true
    this.values = values
    this.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  }

  setValuesIn(pattern: FormPathPattern, value: any) {
    FormPath.setIn(this.values, this.getDataPath(pattern), value)
  }

  deleteValuesIn(pattern: FormPathPattern) {
    FormPath.deleteIn(this.values, this.getDataPath(pattern))
  }

  existValuesIn(pattern: FormPathPattern) {
    return FormPath.existIn(this.values, this.getDataPath(pattern))
  }

  getValuesIn(pattern: FormPathPattern) {
    return FormPath.getIn(this.values, this.getDataPath(pattern))
  }

  setInitialValues(initialValues: any) {
    this.initialValues = initialValues
    this.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
  }

  setInitialValuesIn(pattern: FormPathPattern, initialValue: any) {
    FormPath.setIn(this.initialValues, this.getDataPath(pattern), initialValue)
  }

  deleteIntialValuesIn(pattern: FormPathPattern) {
    FormPath.deleteIn(this.initialValues, this.getDataPath(pattern))
  }

  existInitialValuesIn(pattern: FormPathPattern) {
    return FormPath.existIn(this.initialValues, this.getDataPath(pattern))
  }

  getInitialValuesIn(pattern: FormPathPattern) {
    return FormPath.getIn(this.initialValues, this.getDataPath(pattern))
  }

  getDataPath(pattern: FormPathPattern) {
    const path = FormPath.parse(pattern)
    if (path.isMatchPattern)
      throw new Error('Cannot use matching mode when read or writing values')
    return path.reduce((path: FormPath, key: string, index: number) => {
      if (index >= path.length - 1) return path.concat([key])
      const np = path.slice(0, index + 1)
      const dp = path.concat([key])
      const field = this.fields[np.toString()]
      if (field.void) {
        return path
      }
      return dp
    }, new FormPath(''))
  }

  setSubmitting(submitting: boolean) {
    if (submitting) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_START)
    }
    this.submitting = submitting
    if (!submitting) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_END)
    }
  }

  setValidating(validating: boolean) {
    if (validating) {
      this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
    }
    this.validating = validating
    if (!validating) {
      this.notify(LifeCycleTypes.ON_FORM_VALIDATE_END)
    }
  }

  setPattern(pattern: FormPatternTypes) {
    this.pattern = pattern
  }

  onInit() {
    this.initialized = true
    this.notify(LifeCycleTypes.ON_FORM_INIT)
  }

  onMount() {
    this.mounted = true
    this.notify(LifeCycleTypes.ON_FORM_MOUNT)
  }

  onUnmount() {
    this.unmounted = true
    this.notify(LifeCycleTypes.ON_FORM_UNMOUNT)
  }

  query(
    pattern: FormPathPattern | RegExp,
    filter?: (field: Field, path: string) => boolean | void
  ): Field {
    for (let identifier in this.fields) {
      const field = this.fields[identifier]
      if (isRegExp(pattern)) {
        if (pattern.test(field.path.toString())) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) return field
          } else {
            return field
          }
        }
      } else {
        if (FormPath.parse(pattern).match(field.path)) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) return field
          } else {
            return field
          }
        }
      }
    }
  }

  queryAll(
    pattern: FormPathPattern | RegExp,
    filter?: (field: Field, path: string) => boolean | void
  ): Field[] {
    const results = []
    for (let identifier in this.fields) {
      const field = this.fields[identifier]
      if (isRegExp(pattern)) {
        if (pattern.test(field.path.toString())) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) {
              results.push(field)
              break
            }
          } else {
            results.push(field)
          }
        }
      } else {
        if (FormPath.parse(pattern).match(field.path)) {
          if (isFn(filter)) {
            if (filter(field, identifier) === true) {
              results.push(field)
              break
            }
          } else {
            results.push(field)
          }
        }
      }
    }
    return results
  }

  /** 观察者模型 **/

  makeObservable() {
    makeObservable(this, {
      fields: observable.shallow,
      initialized: observable,
      validating: observable,
      submitting: observable,
      modified: observable,
      pattern: observable,
      values: observable,
      initialValues: observable,
      mounted: observable,
      unmounted: observable,
      setValues: action,
      setValuesIn: action,
      setInitialValues: action,
      setInitialValuesIn: action,
      setSubmitting: action,
      setValidating: action
    })
  }

  makeSubscrible() {
    this.heart = new Heart({
      lifecycles: this.lifecycles,
      context: this
    })
    this.onInit()
  }

  notify(type: LifeCycleTypes, payload?: any) {
    this.heart.publish(type, isValid(payload) ? payload : this)
  }

  subscribe(subscriber?: HeartSubscriber) {
    return this.heart.subscribe(subscriber)
  }

  unsubscribe(id: number) {
    this.heart.unsubscribe(id)
  }

  /**节点模型**/

  toJSON() {}

  fromJSON() {}

  async validate(pattern: FormPathPattern | RegExp = '*') {
    this.setValidating(true)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_START)
    const tasks = []
    this.query(pattern, field => {
      tasks.push(field.validate())
    })
    await Promise.all(tasks)
    this.setValidating(false)
    this.notify(LifeCycleTypes.ON_FORM_VALIDATE_END)
    if (this.feedback.invalid) {
      throw this.feedback.errors
    }
  }

  async submit(onSubmit?: (values: any) => Promise<any> | void) {
    this.setSubmitting(true)
    this.feedback.clear({
      code: 'SubmitError'
    })
    try {
      await this.validate()
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS)
    } catch (e) {
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED)
    }
    let results: any
    try {
      if (isFn(onSubmit) && this.feedback.valid) {
        results = await onSubmit(toJS(this.values))
      }
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS)
    } catch (e) {
      this.feedback.update({
        code: 'SubmitError',
        type: 'error',
        messages: e
      })
      this.notify(LifeCycleTypes.ON_FORM_SUBMIT_FAILED)
      new Promise(() => {
        throw e
      })
    }
    this.setSubmitting(false)
    return results
  }

  async reset(
    pattern: FormPathPattern | RegExp = '*',
    options?: IFieldResetOptions
  ) {
    const tasks = []
    this.query(pattern, field => {
      tasks.push(field.reset(options))
    })
    this.notify(LifeCycleTypes.ON_FORM_RESET)
    await Promise.all(tasks)
  }

  static defaultProps: IFormProps = {
    initialValues: {}
  }
}
