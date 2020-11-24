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
