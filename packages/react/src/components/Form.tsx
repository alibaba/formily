import React from 'react'
import { isFn } from '@formily/shared'
import { useForm } from '../hooks/useForm'
import FormContext from '../context'
import { IFormProps, IFormActions, IFormAsyncActions } from '../types'

export const Form: React.FunctionComponent<
  IFormProps<any, any, any, IFormActions | IFormAsyncActions>
> = (props = {}) => {
  const form = useForm(props)
  return (
    <FormContext.Provider value={form}>
      {isFn(props.children) ? props.children(form) : props.children}
    </FormContext.Provider>
  )
}

Form.displayName = 'ReactInternalForm'
