import { FormPath, isFn, isArr, FormPathPattern } from '@formily/shared'
import {
  makeObservable,
  observable,
  action,
  computed,
  autorun,
  IReactionDisposer
} from 'mobx'
import {
  JSXComponent,
  LifeCycleTypes,
  FieldDisplayTypes,
  FieldPatternTypes,
  FieldDecorator,
  FieldComponent,
  IVoidFieldProps,
  IVoidFieldState,
  IFieldMiddleware,
  FormPatternTypes
} from '../types'
import { Form } from './Form'
import { Query } from './Query'

export class VoidField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> {
  displayName = 'VoidField'

  display_: FieldDisplayTypes
  pattern_: FieldPatternTypes
  middlewares_: IFieldMiddleware[]
  initialized: boolean
  mounted: boolean
  unmounted: boolean
  decorator: FieldDecorator<Decorator>
  component: FieldComponent<Component>

  form: Form
  path: FormPath
  props: IVoidFieldProps<Decorator, Component>

  disposers: IReactionDisposer[] = []

  constructor(
    path: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.initialize(path, props, form)
    this.makeObservable()
    this.makeReactive()
    this.onInit()
  }

  protected initialize(
    path: FormPathPattern,
    props: IVoidFieldProps<Decorator, Component>,
    form: Form
  ) {
    this.form = form
    this.path = FormPath.parse(path)
    this.props = props
    this.mounted = false
    this.unmounted = false
    this.display_ = props.display
    this.pattern_ = this.props.pattern
    this.middlewares_ = this.props.middlewares
    this.decorator = this.props.decorator
    this.component = this.props.component
  }

  protected makeObservable() {
    makeObservable(this, {
      display_: observable.ref,
      pattern_: observable.ref,
      middlewares_: observable.ref,
      initialized: observable.ref,
      mounted: observable.ref,
      unmounted: observable.ref,
      decorator: observable.ref,
      component: observable.ref,
      display: computed,
      pattern: computed,
      setDisplay: action,
      setPattern: action,
      setComponent: action,
      setComponentProps: action,
      setDecorator: action,
      setDecoratorProps: action,
      setMiddlewares: action,
      onInit: action,
      onMount: action,
      onUnmount: action
    })
  }

  protected makeReactive() {
    if (isFn(this.props.reaction)) {
      this.disposers.push(autorun(() => this.props.reaction(this, this.form)))
    }
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

  get display(): FieldDisplayTypes {
    if (this.display_) return this.display_
    return this.parent?.display || 'visibility'
  }

  get pattern(): FormPatternTypes {
    if (this.pattern_) return this.pattern_
    return this.parent?.pattern || this.form.pattern || 'editable'
  }

  get middlewares(): IFieldMiddleware[] {
    const parents = this.parent?.middlewares || this.form.props?.middlewares
    if (isArr(this.middlewares_)) {
      if (isArr(parents)) {
        return parents.concat(this.middlewares_)
      }
      return this.middlewares
    }
    return parents || []
  }

  setDisplay = (type: FieldDisplayTypes) => {
    this.display_ = type
  }

  setPattern = (type: FieldPatternTypes) => {
    this.pattern_ = type
  }

  setComponent = <C extends JSXComponent>(
    component: C,
    props?: React.ComponentProps<C>
  ) => {
    this.component = [
      component || this.component?.[0],
      { ...this.component?.[1], ...props }
    ]
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
    this.decorator = [
      component || this.decorator?.[0],
      { ...this.decorator?.[1], ...props }
    ]
  }

  setDecoratorProps = <D extends JSXComponent = Decorator>(
    props?: React.ComponentProps<D>
  ) => {
    this.decorator = [this.decorator?.[0], { ...this.component?.[1], ...props }]
  }

  setMiddlewares = (middlewares: IFieldMiddleware[]) => {
    this.middlewares_ = middlewares
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
      base: this.path,
      form: this.form
    })
  }

  reduce = (): IVoidFieldState => {
    const baseState = this.form.graph.getVoidFieldState(this)
    return (
      this.form.props?.middlewares?.reduce((buf, middleware) => {
        if (!isFn(middleware)) return buf
        return { ...buf, ...middleware(buf, this) }
      }, baseState) || baseState
    )
  }

  dispose = () => {
    this.disposers.forEach(dispose => {
      if (isFn(dispose)) {
        dispose()
      }
    })
  }
}
