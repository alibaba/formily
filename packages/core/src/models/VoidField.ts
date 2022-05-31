import { toArr, FormPathPattern } from '@formily/shared'
import { define, observable, batch, action } from '@formily/reactive'
import {
  createReactions,
  createStateSetter,
  createStateGetter,
  initializeStart,
  initializeEnd,
} from '../shared/internals'
import {
  IModelSetter,
  IModelGetter,
  IVoidFieldProps,
  IVoidFieldState,
} from '../types'
import { Form } from './Form'
import { BaseField } from './BaseField'

export class VoidField<
  Decorator = any,
  Component = any,
  TextType = any
> extends BaseField<Decorator, Component, TextType> {
  displayName: 'VoidField' = 'VoidField'
  props: IVoidFieldProps<Decorator, Component>

  constructor(
    address: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form,
    designable: boolean
  ) {
    super()
    this.form = form
    this.props = props
    this.designable = designable
    initializeStart()
    this.locate(address)
    this.initialize()
    this.makeObservable()
    this.makeReactive()
    this.onInit()
    initializeEnd()
  }

  protected initialize() {
    this.mounted = false
    this.unmounted = false
    this.initialized = false
    this.title = this.props.title
    this.description = this.props.description
    this.pattern = this.props.pattern
    this.display = this.props.display
    this.hidden = this.props.hidden
    this.editable = this.props.editable
    this.disabled = this.props.disabled
    this.readOnly = this.props.readOnly
    this.readPretty = this.props.readPretty
    this.visible = this.props.visible
    this.content = this.props.content
    this.data = this.props.data
    this.decorator = toArr(this.props.decorator)
    this.component = toArr(this.props.component)
  }

  protected makeObservable() {
    if (this.designable) return
    define(this, {
      path: observable.ref,
      title: observable.ref,
      description: observable.ref,
      selfDisplay: observable.ref,
      selfPattern: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decoratorType: observable.ref,
      componentType: observable.ref,
      content: observable.ref,
      data: observable.shallow,
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
      indexes: observable.computed,
      setTitle: action,
      setDescription: action,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      setData: action,
      setContent: action,
      onInit: batch,
      onMount: batch,
      onUnmount: batch,
    })
  }

  protected makeReactive() {
    if (this.designable) return
    createReactions(this)
  }

  setState: IModelSetter<IVoidFieldState> = createStateSetter(this)

  getState: IModelGetter<IVoidFieldState> = createStateGetter(this)
}
