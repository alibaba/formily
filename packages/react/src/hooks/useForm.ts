import { Form } from '@formily/core/esm/models'
import { useContext } from 'react'
import { FormContext } from '../shared'

export const useForm = <T extends object = any>(): Form<T> => {
  const form = useContext(FormContext)
  if (!form) {
    throw new Error('Can not found form instance from context.')
  }
  return form
}
