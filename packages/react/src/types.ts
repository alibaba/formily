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

export interface IVirtualFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = Formily.Core.Models.VirtualField
> extends Formily.Core.Types.IVirtualFieldFactoryProps<D, C> {
  children?:
    | ((field: Field, form: Formily.Core.Models.Form) => React.ReactChild)
    | React.ReactNode
}
