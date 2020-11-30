export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IFormProps = Omit<
  Formily.Core.Types.IFormProps,
  'values' | 'initialValues'
> & {
  form?: Formily.Core.Models.Form
  value?: any
  initialValues?: any
}

export interface IFormSpyProps {
  children?: (form: Formily.Core.Models.Form) => React.ReactChild
}

export interface IFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = Formily.Core.Models.Field
> extends Formily.Core.Types.IFieldFactoryProps<D, C> {
  children?:
    | ((field: Field, form: Formily.Core.Models.Form) => React.ReactChild)
    | React.ReactNode
}

export interface IVoidFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = Formily.Core.Models.VoidField
> extends Formily.Core.Types.IVoidFieldFactoryProps<D, C> {
  children?:
    | ((field: Field, form: Formily.Core.Models.Form) => React.ReactChild)
    | React.ReactNode
}
