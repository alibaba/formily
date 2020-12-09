import { FormPath, FormPathPattern } from '@formily/shared'
import { makeObservable, observable, action, computed } from 'mobx'
import {
  JSXComponent,
  JSXComponenntProps,
  LifeCycleTypes,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldDecorator,
  FieldComponent,
  IVoidFieldProps,
  FormPatternTypes
} from '../types'
import { skipVoidAddress } from '../shared'
import { Form } from './Form'
import { Query } from './Query'

export class VoidField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any
> {
  displayName = 'VoidField'
  
  title: TextType
  description: TextType

  display_: FieldDisplayTypes
  pattern_: FieldPatternTypes
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  address: FormPath

  form: Form
  props: IVoidFieldProps<Decorator, Component>

  constructor(
    address: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(address, props, form)
    this.makeObservable()
    this.onInit()
  }

  protected initialize(
    address: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.address = FormPath.parse(address)
    this.props = props
    this.mounted = false
    this.unmounted = false
    this.title = props.title
    this.description = props.description
    this.display_ = props.display
    this.pattern_ = this.props.pattern
    this.decorator = this.props.decorator
    this.component = this.props.component
  }

  protected makeObservable() {
    makeObservable(this, {
      title: observable.ref,
      description: observable.ref,
      display_: observable.ref,
      pattern_: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decorator: observable.ref,
      component: observable.ref,
      display: computed,
      pattern: computed,
      setTitle: action,
      setDescription: action,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      onInit: action,
      onMount: action,
      onUnmount: action
    })
  }

  get path() {
    return skipVoidAddress(this.address, this.form)
  }

  get parent() {
    let parent = this.address.parent()
    let identifier = parent.toString()
    while (!this.form.fields[identifier]) {
      parent = parent.parent()
      identifier = parent.toString()
      if (!identifier) return
    }
    return this.form.fields[identifier]
  }

  get display(): FieldDisplayTypes {
    if (this.display_) return this.display_
    return this.parent?.display || 'visibility'
  }

  get pattern(): FormPatternTypes {
    if (this.pattern_) return this.pattern_
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  setTitle = (title: TextType) => {
    this.title = title
  }

  setDescription = (description: TextType) => {
    this.description = description
  }

  setDisplay = (type: FieldDisplayTypes) => {
    this.display_ = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.pattern_ = type
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

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form
    })
  }
}
