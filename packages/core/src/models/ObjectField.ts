import { FormPath, FormPathPattern, isObj } from '@formily/shared'
import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'
import { Form } from './Form'

export class ObjectField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, Record<string, any>> {
  displayName = 'ObjectField'
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
