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

export type IFieldProps<
  Decorator extends IReactComponent,
  Component extends IReactComponent
> = Omit<FormilyCore.ICreateFieldProps<any, any>, 'component' | 'decorator'> & {
  component: [Component] | [Component, React.ComponentProps<Component>] | []
  decorator: [Decorator] | [Decorator, React.ComponentProps<Decorator>] | []
}
