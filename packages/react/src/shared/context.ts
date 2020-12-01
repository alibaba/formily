import { createContext } from 'react'

export const FormContext = createContext<Formily.Core.Models.Form>(null)
export const FieldContext = createContext<Formily.Core.Types.GeneralField>(null)
