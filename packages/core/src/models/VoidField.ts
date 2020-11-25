import { Field, IFieldProps } from './Field'
import { IReactComponent } from '../types'
import { FormPath } from '@formily/shared'
import { Form } from './Form'

export class VoidField<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any
> extends Field<Decorator, Component, any[]> {
  constructor(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    super(
      path,
      {
        ...props,
        void: true
      },
      form
    )
  }

}
