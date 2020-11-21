import {
  action,
  makeObservable,
  observable,
  observe,
  runInAction,
  toJS
} from 'mobx'
import {
  each,
  FormPath,
  FormPathPattern,
  isArr,
  isFn,
  isStr,
  isValid
} from '@formily/shared'
import {
  ValidatePatternRules,
  ValidateNodeResult,
  ValidateFieldOptions
} from '@formily/validator'
import { LifeCycleTypes, LifeCycle } from './LifeCycle'
import { Heart, HeartSubscriber } from './Heart'
import { IFieldProps, Field } from './Field'
import { FunctionComponent } from '../types'
import { Feedback } from './Feedback'

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
  lifecycles?: LifeCycle[]
  editable?: boolean
  validateFirst?: boolean
}

export interface ICreateFieldProps<
  D extends FunctionComponent,
  C extends FunctionComponent
> extends Omit<IFieldProps<D, C>, 'path'> {
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

  /** 创建字段 **/

  createField<
    Decorator extends FunctionComponent,
    Component extends FunctionComponent
  >(props: ICreateFieldProps<Decorator, Component>) {}

  /** 状态操作模型 **/

  setValues(values: any) {
    this.modified = true
    this.values = values
    this.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  }

  setValuesIn(path: FormPathPattern, value: any) {
    FormPath.setIn(this.values, path, value)
  }

  getValuesIn(path: FormPathPattern) {
    return FormPath.getIn(this.values, path)
  }

  setInitialValues(initialValues: any) {
    this.initialValues = initialValues
    this.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
  }

  setInitialValuesIn(path: FormPathPattern, initialValue: any) {
    FormPath.setIn(this.initialValues, path, initialValue)
  }

  getInitialValuesIn(path: FormPathPattern) {
    return FormPath.getIn(this.initialValues, path)
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
    pattern: FormPathPattern,
    callback?: (field: Field, path: string) => void
  ): Field {
    //each(this.fields, callback)
    return {} as any
  }

  queryAll(
    pattern: FormPathPattern,
    callback?: (field: Field, path: string) => void
  ): Field[] {
    return {} as any
  }

  /** 观察者模型 **/

  makeObservable() {
    makeObservable(this, {
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
    this.heart = new Heart(this.props)
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

  async validate() {
    this.setValidating(true)
    const tasks = []
    this.query('*', field => {
      tasks.push(field.validate())
    })
    await Promise.all(tasks)
    this.setValidating(false)
    if (this.feedback.invalid) {
      throw this.feedback.errors
    }
  }

  async submit(onSubmit?: (values: any) => Promise<any> | null) {
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

  async reset() {}

  static defaultProps: IFormProps = {
    initialValues: {},
    lifecycles: []
  }
}
