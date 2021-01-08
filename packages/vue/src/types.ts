export type VueComponent = Vue.VueConstructor<Vue> | Vue.FunctionalComponentOptions<any> | Vue.ComponentOptions<never, any, any, any, any>

export type IProviderProps = {
  form: Formily.Core.Models.Form
}

export type IFieldProps<
  D extends VueComponent,
  C extends VueComponent
> = Formily.Core.Types.IFieldFactoryProps<D, C>

export type IVoidFieldProps<
  D extends VueComponent,
  C extends VueComponent
> = Formily.Core.Types.IVoidFieldFactoryProps<D, C>

export interface IComponentMapper {
  (target: VueComponent): VueComponent
}

export type IStateMapper =
  | {
      extract: string
      to?: string
      transform?: (value: any) => any
    }
  | ((props: any, field: Formily.Core.Types.GeneralField) => any)
