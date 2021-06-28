import { useContext } from 'react'
import { FormContext } from '../shared'

export const useForm = <
  T extends object = any
>(): Formily.Core.Models.Form<T> => {
  const form = useContext(FormContext)
  if (!form) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
