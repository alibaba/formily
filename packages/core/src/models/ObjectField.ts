import { FormPathPattern, isObj } from '@formily/shared'
import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'

export class ObjectField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, Record<string, any>> {
  displayName = 'ObjectField'

  protected getProps(props: IFieldProps<Decorator, Component>) {
    return {
      ...props,
      void: false,
      value: isObj(props.value) ? props.value : {}
    }
  }

  addProperty = (key: FormPathPattern, value: any) => {
    this.form.setValuesIn(this.path.concat(key), value)
  }

  removeProperty = (key: FormPathPattern) => {
    this.form.deleteValuesIn(this.path.concat(key))
  }

  existProperty = (key: FormPathPattern) => {
    return this.form.existValuesIn(this.path.concat(key))
  }
}
