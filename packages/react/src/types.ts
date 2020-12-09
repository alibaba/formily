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

export interface IComponentMapper {
  (target: JSXComponent): JSXComponent
}

export type IStateMapper =
  | {
      extract: string
      to?: string
      transform?: (value: any) => any
    }
  | ((props: any, field: Formily.Core.Types.GeneralField) => any)
