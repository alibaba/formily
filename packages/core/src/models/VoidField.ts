import {
  FormPath,
  FormPathPattern,
  isFn,
  isValid,
  toArr,
} from '@formily/shared'
import { define, observable, autorun, batch, action } from '@formily/reactive'
import {
  JSXComponent,
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
  modelStateGetter,
  modelStateSetter,
  initFieldUpdate,
} from '../shared/internals'
import { Form } from './Form'
import { Query } from './Query'

export class VoidField<Decorator = any, Component = any, TextType = any> {
  displayName = 'VoidField'

  title: TextType
  description: TextType

  selfDisplay: FieldDisplayTypes
  selfPattern: FieldPatternTypes
  initialized: boolean
  mounted: boolean
  unmounted: boolean

  decoratorType: Decorator
  decoratorProps: Record<string, any>
  componentType: Component
  componentProps: Record<string, any>

  address: FormPath
  path: FormPath
  form: Form
  props: IVoidFieldProps<Decorator, Component>

  protected disposers: (() => void)[] = []

  constructor(
    address: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form,
    designable: boolean
  ) {
    this.initialize(props, form)
    this.makeIndexes(address)
    this.makeObservable(designable)
    this.makeReactive(designable)
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
    this.initialized = false
    this.title = props.title
    this.description = props.description
    this.pattern = this.props.pattern
    this.display = props.display
    this.hidden = this.props.hidden
    this.editable = this.props.editable
    this.disabled = this.props.disabled
    this.readOnly = this.props.readOnly
    this.readPretty = this.props.readPretty
    this.visible = this.props.visible
    this.decorator = toArr(this.props.decorator)
    this.component = toArr(this.props.component)
  }

  protected makeObservable(designable: boolean) {
    if (designable) return
    define(this, {
      title: observable.ref,
      description: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decoratorType: observable.ref,
      componentType: observable.ref,
      decoratorProps: observable,
      componentProps: observable,
      display: observable.computed,
      pattern: observable.computed,
      hidden: observable.computed,
      visible: observable.computed,
      disabled: observable.computed,
      readOnly: observable.computed,
      readPretty: observable.computed,
      editable: observable.computed,
      component: observable.computed,
      decorator: observable.computed,
      setTitle: action,
      setDescription: action,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      onInit: batch,
      onMount: batch,
      onUnmount: batch,
    })
  }

  protected makeReactive(designable: boolean) {
    if (designable) return
    this.form.addEffects(this, () => {
      toArr(this.props.reactions).forEach((reaction) => {
        if (isFn(reaction)) {
          this.disposers.push(autorun(() => reaction(this)))
        }
      })
    })
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

  get display(): FieldDisplayTypes {
    const parentDisplay = this.parent?.display
    if (parentDisplay && parentDisplay !== 'visible') {
      if (this.selfDisplay && this.selfDisplay !== 'visible')
        return this.selfDisplay
      return parentDisplay
    }
    if (isValid(this.selfDisplay)) return this.selfDisplay
    return parentDisplay || this.form.display || 'visible'
  }

  get pattern(): FormPatternTypes {
    const parentPattern = this.parent?.pattern
    if (isValid(this.selfPattern)) return this.selfPattern
    return parentPattern || this.form.pattern || 'editable'
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

  set editable(editable: boolean) {
    if (!isValid(editable)) return
    if (editable) {
      this.pattern = 'editable'
    } else {
      this.pattern = 'readPretty'
    }
  }

  set readOnly(readOnly: boolean) {
    if (!isValid(readOnly)) return
    if (readOnly) {
      this.pattern = 'readOnly'
    } else {
      this.pattern = 'editable'
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

  setTitle = (title?: TextType) => {
    this.title = title
  }

  setDescription = (description?: TextType) => {
    this.description = description
  }

  setDisplay = (type?: FieldDisplayTypes) => {
    this.display = type
  }

  setPattern = (type?: FieldPatternTypes) => {
    this.pattern = type
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

  setState: IModelSetter<IVoidFieldState> = modelStateSetter(this)

  getState: IModelGetter<IVoidFieldState> = modelStateGetter(this)

  onInit = () => {
    this.initialized = true
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

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form,
    })
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
