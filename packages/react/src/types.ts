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

export interface IFormSpyProps {
  children?: (form: FormilyCore.Form) => React.ReactChild
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

declare global {
  namespace FormilyReact {
    export { IFormProps, IFieldProps, IFormSpyProps }
  }
}
