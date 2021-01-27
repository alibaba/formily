import { FormPathPattern, isObj } from '@formily/shared'
import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'
import { Form } from './Form'
export class ObjectField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any, Record<string, any>> {
  displayName = 'ObjectField'

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    super(
      address,
      {
        ...props,
        value: isObj(props.value) ? props.value : {},
      },
      form
    )
  }

  addProperty = async (key: FormPathPattern, value: any) => {
    this.form.setValuesIn(this.path.concat(key), value)
    return this.onInput(this.value)
  }

  removeProperty = async (key: FormPathPattern) => {
    this.form.deleteValuesIn(this.path.concat(key))
    return this.onInput(this.value)
  }

  existProperty = (key: FormPathPattern) => {
    return this.form.existValuesIn(this.path.concat(key))
  }
}
