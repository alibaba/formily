import {
  FormPath,
  isValid,
  isEqual,
  isFn,
  FormPathPattern
} from '@formily/shared'
import { makeObservable, observable, action } from 'mobx'
import {
  JSXComponent,
  LifeCycleTypes,
  IFieldProps,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldDecorator,
  FieldComponent,
  IVirtualFieldProps,
  IVirtualFieldState
} from '../types'
import { Form } from './Form'

export class VirtualField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> {
  displayName = 'VirtualField'

  selfDisplay: FieldDisplayTypes
  selfPattern: FieldPatternTypes
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  form: Form
  path: FormPath
  props: IVirtualFieldProps<Decorator, Component>

  constructor(
    path: FormPathPattern,
    props: IVirtualFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(path, props, form)
    this.makeObservable()
    this.onInit()
  }

  protected getProps(props: IFieldProps<Decorator, Component>) {
    return props
  }

  protected initialize(
    path: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.path = FormPath.parse(path)
    this.props = this.getProps(props)
    this.mounted = false
    this.unmounted = false
    this.selfDisplay = this.props.display
    this.selfPattern = this.props.pattern
    this.decorator = this.props.decorator
    this.component = this.props.component
  }

  protected makeObservable() {
    makeObservable(this, {
      selfDisplay: observable,
      selfPattern: observable,
      initialized: observable,
      mounted: observable,
      unmounted: observable,
      decorator: observable.ref,
      component: observable.ref,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      fromJSON: action
    })
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

  get display() {
    if (this.selfDisplay) return this.selfDisplay
    return this.parent?.display || 'visibility'
  }

  get pattern() {
    if (this.selfPattern) return this.selfPattern
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get state(): IVirtualFieldState {
    const baseState = this.toJSON()
    return (
      this.form.props?.middlewares?.reduce((buf, middleware) => {
        if (!isFn(middleware)) return buf
        return { ...buf, ...middleware(buf, this) }
      }, baseState) || baseState
    )
  }

  setDisplay = (type: FieldDisplayTypes) => {
    this.selfDisplay = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.selfPattern = type
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

  toJSON = (): IVirtualFieldState => {
    return {
      displayName: this.displayName,
      path: this.path.toString(),
      display: this.display,
      pattern: this.pattern,
      decorator: this.decorator,
      component: this.component
    }
  }

  fromJSON = (state: IVirtualFieldState) => {
    if (!state) return

    if (isValid(state.component) && !isEqual(state.component, this.component)) {
      this.component = state.component
    }
    if (isValid(state.decorator) && !isEqual(state.decorator, this.decorator)) {
      this.decorator = state.decorator
    }
    if (isValid(state.display) && !isEqual(state.display, this.display)) {
      this.setDisplay(state.display)
    }
    if (isValid(state.pattern) && !isEqual(state.pattern, this.pattern)) {
      this.setPattern(state.pattern)
    }
  }
}
