import { createContext } from 'react'

export const FormContext = createContext<Formily.Core.Models.Form>(null)
export const FieldContext = createContext<Formily.Core.Models.Field>(null)
export const VirtualFieldContext = createContext<
  Formily.Core.Models.VirtualField
>(null)
export const ArrayFieldContext = createContext<Formily.Core.Models.ArrayField>(
  null
)
export const ObjectFieldContext = createContext<
  Formily.Core.Models.ObjectField
>(null)
