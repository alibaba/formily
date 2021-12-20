import React from 'react'
import { isFn } from '@formily/shared'
import { useForm } from '../hooks/useForm'
import FormContext from '../context'
import { IFormProps, IFormActions, IFormAsyncActions } from '../types'

export const Form: React.FunctionComponent<IFormProps<
  any,
  any,
  any,
  IFormActions | IFormAsyncActions
>> = (props = {}) => {
  const form = useForm(props)
  return (
    <FormContext.Provider value={form}>
      {isFn(props.children)
        ? props.children(form)
        : React.Children.map(props.children, (node: React.ReactElement) => {
            return React.cloneElement(node)
          })}
    </FormContext.Provider>
  )
}

Form.displayName = 'ReactInternalForm'
