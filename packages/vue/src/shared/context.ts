import { InjectionKey } from '@vue/composition-api'

export const FormSymbol: InjectionKey<Formily.Core.Models.Form> = Symbol('form')
export const FieldSymbol: InjectionKey<Formily.Core.Types.GeneralField> = Symbol(
  'field'
)
