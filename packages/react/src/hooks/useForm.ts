import { useContext } from 'react'
import { FormContext } from '../shared'

export const useForm = () => {
  const form = useContext(FormContext)
  if(!form){
    throw new Error('Can not found form instance from context.')
  }
  return form
}
