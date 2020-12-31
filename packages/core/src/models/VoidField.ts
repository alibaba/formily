import { FormPath, FormPathPattern, isFn, isArr } from '@formily/shared'
import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  autorun,
} from 'mobx'
import {
  JSXComponent,
  JSXComponenntProps,
  LifeCycleTypes,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldDecorator,
  FieldComponent,
  IVoidFieldProps,
  FormPatternTypes,
  IVoidFieldState,
  IModelSetter,
  IModelGetter,
} from '../types'
import {
  buildNodeIndexes,
  createModelStateGetter,
  createModelStateSetter,
  publishUpdate,
} from '../shared'
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

  selfDisplay: FieldDisplayTypes
  selfPattern: FieldPatternTypes
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  address: FormPath
  path: FormPath
  form: Form
  props: IVoidFieldProps<Decorator, Component>

  private disposers: IReactionDisposer[] = []

  constructor(
    address: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(props, form)
    this.makeIndexes(address)
    this.makeObservable()
    this.makeReactive()
    this.onInit()
  }

  protected makeIndexes(address: FormPathPattern) {
    buildNodeIndexes(this, address)
  }

  protected initialize(
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.props = props
    this.mounted = false
    this.unmounted = false
    this.title = props.title
    this.description = props.description
    this.selfDisplay = props.display
    this.selfPattern = this.props.pattern
    this.decorator = this.props.decorator
    this.component = this.props.component
  }

  protected makeObservable() {
    makeObservable(this, {
      title: observable.ref,
      description: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decorator: observable.ref,
      component: observable.ref,
      display: computed,
      pattern: computed,
      editable: computed,
      disabled: computed,
      readOnly: computed,
      readPretty: computed,
      hidden: computed,
      visible: computed,
      setTitle: action,
      setDescription: action,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      setState: action,
      onInit: action,
      onMount: action,
      onUnmount: action,
    })
  }

  protected makeReactive() {
    if (isArr(this.props.reactions)) {
      this.props.reactions.forEach((reaction) => {
        if (isFn(reaction)) {
          this.disposers.push(autorun(() => reaction(this)))
        }
      })
    }
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
    if (this.selfDisplay) return this.selfDisplay
    return this.parent?.display || 'visible'
  }

  get pattern(): FormPatternTypes {
    if (this.selfPattern) return this.selfPattern
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get editable() {
    return this.pattern === 'editable'
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

  get hidden() {
    return this.display === 'hidden'
  }

  get visible() {
    return this.display === 'visible'
  }

  set hidden(hidden: boolean) {
    if (hidden) {
      this.display = 'hidden'
    } else {
      this.display = 'visible'
    }
  }

  set visible(visible: boolean) {
    if (visible) {
      this.display = 'visible'
    } else {
      this.display = 'none'
    }
  }

  set editable(editable: boolean) {
    if (editable) {
      this.selfPattern = 'editable'
    } else {
      this.selfPattern = 'readPretty'
    }
  }

  set readOnly(readOnly: boolean) {
    if (readOnly) {
      this.selfPattern = 'readOnly'
    } else {
      this.selfPattern = 'editable'
    }
  }

  set disabled(disabled: boolean) {
    if (disabled) {
      this.selfPattern = 'disabled'
    } else {
      this.selfPattern = 'editable'
    }
  }

  set readPretty(readPretty: boolean) {
    if (readPretty) {
      this.selfPattern = 'readPretty'
    } else {
      this.selfPattern = 'editable'
    }
  }

  set pattern(pattern: FieldPatternTypes) {
    this.selfPattern = pattern
  }

  set display(display: FieldDisplayTypes) {
    this.selfDisplay = display
  }

  setTitle = (title: TextType) => {
    this.title = title
  }

  setDescription = (description: TextType) => {
    this.description = description
  }

  setDisplay = (type: FieldDisplayTypes) => {
    this.selfDisplay = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.selfPattern = type
  }

  setComponent = <C extends JSXComponent>(
    component: C,
    props?: JSXComponenntProps<C>
  ) => {
    this.component = [
      component || this.component?.[0],
      { ...this.component?.[1], ...props },
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
      { ...this.decorator?.[1], ...props },
    ]
  }

  setDecoratorProps = <D extends JSXComponent = Decorator>(
    props?: JSXComponenntProps<D>
  ) => {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  setState: IModelSetter<IVoidFieldState> = createModelStateSetter(this)

  getState: IModelGetter<IVoidFieldState> = createModelStateGetter(this)

  onInit = () => {
    this.initialized = true
    this.form.notify(LifeCycleTypes.ON_FIELD_INIT, this)
    publishUpdate(this)
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
      form: this.form,
    })
  }

  dispose = () => {
    this.disposers.forEach((dispose) => {
      if (isFn(dispose)) {
        dispose()
      }
    })
  }

  match = (pattern: FormPathPattern) => {
    return FormPath.parse(pattern).matchAliasGroup(this.address, this.path)
  }
}
