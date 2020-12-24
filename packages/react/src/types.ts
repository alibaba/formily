export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IProviderProps = {
  form: Formily.Core.Models.Form
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

export interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}

export type IStateMapper<Props> =
  | {
      extract: keyof Formily.Core.Models.Field
      to?: keyof Props
      transform?: (value: any) => any
    }
  | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)
