export type JSXComponent =
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

export interface IFormSpyProps {
  children?: (form: FormilyCore.Form) => React.ReactChild
}

export interface IFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = FormilyCore.Field
> extends FormilyCore.ICreateFieldProps<D, C> {
  children?:
    | ((field: Field, form: FormilyCore.Form) => React.ReactChild)
    | React.ReactNode
}
