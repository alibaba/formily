import Vue, { ComponentOptions } from 'vue'
import { SetupContext } from 'vue-demi'

export type VueComponent = ComponentOptions<Vue, any, any, any, any>

export interface ObservableComponentOptions {
  observableSetup?: (collect?: (data: Record<string, any>) => any, props?: Record<string, any>, context?: SetupContext) => any
  [key: string]: any
}

export interface IProviderProps {
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

export type IStateMapper<Props> =
  | {
      extract: keyof Formily.Core.Models.Field
      to?: keyof Props
      transform?: (value: any) => any
    }
  | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)