import { Field, IFieldProps } from './Field'
import { FunctionComponent } from '../types'
import { FormPathPattern, isObj } from '@formily/shared'

export class ObjectField<
  Decorator extends FunctionComponent = any,
  Component extends FunctionComponent = any
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
