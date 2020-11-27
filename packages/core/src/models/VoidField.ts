import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'

export class VoidField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any[]> {
  displayName = 'VoidField'

  protected getFieldProps(props: IFieldProps<Decorator, Component>) {
    return {
      ...props,
      void: true
    }
  }
}
