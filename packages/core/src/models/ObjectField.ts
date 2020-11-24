import { Field, IFieldProps } from './Field'
import { IReactComponent } from '../types'
import { FormPathPattern, isObj } from '@formily/shared'

export class ObjectField<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any
> extends Field {
  constructor(props: IFieldProps<Decorator, Component>) {
    super({
      ...props,
      void: false,
      value: isObj(props.value) ? props.value : {}
    })
  }

  addProperty(key: FormPathPattern, value: any) {
    this.form.setValuesIn(this.path.concat(key), value)
  }

  removeProperty(key: FormPathPattern) {
    this.form.deleteValuesIn(this.path.concat(key))
  }

  existProperty(key: FormPathPattern) {
    return this.form.existValuesIn(this.path.concat(key))
  }
}
