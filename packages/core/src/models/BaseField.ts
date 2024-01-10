import {
  FormPath,
  FormPathPattern,
  isValid,
  toArr,
  each,
  isFn,
} from '@formily/shared'
import {
  JSXComponent,
  LifeCycleTypes,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldDecorator,
  FieldComponent,
  IFieldActions,
} from '../types'
import {
  locateNode,
  destroy,
  initFieldUpdate,
  getArrayParent,
  getObjectParent,
} from '../shared/internals'
import { Form } from './Form'
import { Query } from './Query'

export class BaseField<Decorator = any, Component = any, TextType = any> {
  title: TextType
  description: TextType

  selfDisplay: FieldDisplayTypes
  selfPattern: FieldPatternTypes
  initialized: boolean
  mounted: boolean
  unmounted: boolean

  content: any

  data: any

  decoratorType: Decorator
  decoratorProps: Record<string, any>
  componentType: Component
  componentProps: Record<string, any>

  designable: boolean
  address: FormPath
  path: FormPath
  form: Form

  disposers: (() => void)[] = []

  actions: IFieldActions = {}

  locate(address: FormPathPattern) {
    this.form.fields[address.toString()] = this as any
    locateNode(this as any, address)
  }

  get indexes(): number[] {
    return this.path.transform(/^\d+$/, (...args) =>
      args.map((index) => Number(index))
    ) as number[]
  }

  get index() {
    return this.indexes[this.indexes.length - 1] ?? -1
  }

  get records() {
    const array = getArrayParent(this)
    return array?.value
  }

  get record() {
    const obj = getObjectParent(this)
    if (obj) {
      return obj.value
    }
    const index = this.index
    const array = getArrayParent(this, index)
    if (array) {
      return array.value?.[index]
    }
    return this.form.values
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
    const parentDisplay = (this.parent as any)?.display
    if (parentDisplay && parentDisplay !== 'visible') {
      if (this.selfDisplay && this.selfDisplay !== 'visible')
        return this.selfDisplay
      return parentDisplay
    }
    if (isValid(this.selfDisplay)) return this.selfDisplay
    return parentDisplay || this.form.display || 'visible'
  }

  get pattern(): FieldPatternTypes {
    const parentPattern: FieldPatternTypes =
      (this.parent as any)?.pattern || this.form.pattern || 'editable'
    const selfPattern = this.selfPattern
    if (isValid(selfPattern)) {
      if (parentPattern === 'readPretty' && selfPattern !== 'editable') {
        return parentPattern
      }
      return selfPattern
    }
    return parentPattern
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

  get destroyed() {
    return !this.form.fields[this.address.toString()]
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

  setData = (data: any) => {
    this.data = data
  }

  setContent = (content: any) => {
    this.content = content
  }

  onInit = () => {
    this.initialized = true
    initFieldUpdate(this as any)
    this.notify(LifeCycleTypes.ON_FIELD_INIT)
  }

  onMount = () => {
    this.mounted = true
    this.unmounted = false
    this.notify(LifeCycleTypes.ON_FIELD_MOUNT)
  }

  onUnmount = () => {
    this.mounted = false
    this.unmounted = true
    this.notify(LifeCycleTypes.ON_FIELD_UNMOUNT)
  }

  query = (pattern: FormPathPattern | RegExp) => {
    return new Query({
      pattern,
      base: this.address,
      form: this.form,
    })
  }

  notify = (type: LifeCycleTypes, payload?: any) => {
    return this.form.notify(type, payload ?? this)
  }

  dispose = () => {
    this.disposers.forEach((dispose) => {
      dispose()
    })
    this.form.removeEffects(this)
  }

  destroy = (forceClear = true) => {
    destroy(this.form.fields, this.address.toString(), forceClear)
  }

  match = (pattern: FormPathPattern) => {
    return FormPath.parse(pattern).matchAliasGroup(this.address, this.path)
  }

  inject = (actions: IFieldActions) => {
    each(actions, (action, key) => {
      if (isFn(action)) {
        this.actions[key] = action
      }
    })
  }

  invoke = (name: string, ...args: any[]) => {
    return this.actions[name]?.(...args)
  }
}
