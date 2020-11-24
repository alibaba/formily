export type IReactComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IFormProps = Omit<
  FormilyCore.ICreateFormOptions,
  'values' | 'initialValues'
> & {
  form?: FormilyCore.Form
  value?: any
  initialValues?: any
}

export interface IFieldProps<
  D extends IReactComponent,
  C extends IReactComponent,
  Field = FormilyCore.Field
> extends FormilyCore.ICreateFieldProps<D, C> {
  children?:
    | ((field: Field, form: FormilyCore.Form) => React.ReactChild)
    | React.ReactNode
}
