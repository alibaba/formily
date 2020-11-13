import { action, makeObservable, observable, observe } from 'mobx'
import { Subscribable } from '@formily/shared'
import {
  ValidatePatternRules,
  ValidateNodeResult,
  ValidateFieldOptions
} from '@formily/validator'
import { LifeCycleTypes, FormLifeCycle } from './FormLifeCycle'
import { FormHeart } from './FormHeart'

export interface IFormState {
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  modified: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean | ((name: string) => boolean)
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  [key: string]: any
}

export interface IFormProps {
  initialValues?: {}
  values?: {}
  lifecycles?: FormLifeCycle[]
  editable?: boolean | ((name: string) => boolean)
  validateFirst?: boolean
  onChange?: (values: IFormState['values']) => void
  onSubmit?: (values: IFormState['values']) => any | Promise<any>
  onReset?: () => void
  onValidateFailed?: (validated: ValidateNodeResult) => void
}

export class Form extends Subscribable {
  state = {
    valid: true,
    invalid: false,
    loading: false,
    validating: false,
    initialized: false,
    submitting: false,
    editable: true,
    modified: false,
    errors: [],
    warnings: [],
    values: {},
    initialValues: {},
    mounted: false,
    unmounted: false
  }

  props: IFormProps

  heart: FormHeart

  constructor(props: IFormProps) {
    super()
    this.makeObservable()
    this.makeSubscrible()
    this.initialize(props)
  }

  setFormValues(values: any) {
    this.state.values = values
  }

  getFormValues() {
    return this.state.values
  }

  setFormInitialValues(initialValues: any) {
    this.state.initialValues = initialValues
  }

  getFormInitialValues() {
    return this.state.initialValues
  }

  makeObservable() {
    makeObservable(this, {
      state: observable,
      setFormValues: action,
      setFormInitialValues: action
    })
  }

  makeSubscrible() {
    observe(this.state, change => {
      if (!this.state.mounted) return
      if (change.name === 'values') {
        this.publish(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
      }
      if (change.name === 'initialValues') {
        this.publish(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
      }
      if (change.name === 'mounted') {
        this.publish(LifeCycleTypes.ON_FORM_MOUNT)
      }
      if (change.name === 'unmounted') {
        this.publish(LifeCycleTypes.ON_FORM_UNMOUNT)
      }
      this.publish(LifeCycleTypes.ON_FORM_CHANGE)
    })
  }

  publish(type: LifeCycleTypes) {
    this.heart.publish(type, this)
  }

  initialize(props: IFormProps) {
    this.props = { ...Form.defaultProps, ...props }
    this.heart = new FormHeart()
    this.publish(LifeCycleTypes.ON_FORM_INIT)
  }

  static defaultProps: IFormProps = {}
}
