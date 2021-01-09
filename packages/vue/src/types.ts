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

  export interface IComponentMapper<T extends VueComponent = any> {
    (target: T): VueComponent
  }
  
  export type IStateMapper<Props = any> =
    | {
        extract: keyof Formily.Core.Models.Field
        to?: keyof Props
        transform?: (value: any) => any
      }
    | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)