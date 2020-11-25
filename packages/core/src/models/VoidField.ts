import { FormPath } from '@formily/shared'
import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'
import { Form } from './Form'

export class VoidField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any[]> {
  displayName = 'VoidField'
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
