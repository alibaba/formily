import { Field, IFieldProps } from './Field'
import { IReactComponent } from '../types'
import { FormPath, FormPathPattern, isObj } from '@formily/shared'
import { Form } from './Form'

export class ObjectField<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any
> extends Field<Decorator, Component, Record<string, any>> {
  constructor(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    super(
      path,
      {
        ...props,
        void: false,
        value: isObj(props.value) ? props.value : {}
      },
      form
    )
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
