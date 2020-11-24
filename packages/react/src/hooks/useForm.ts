import { useContext, useMemo } from 'react'
import { FormContext } from '../context'
import { createForm } from '@formily/core'
import { IFormProps } from '../types'

export const useForm = (props?: IFormProps, deps: any[] = []) => {
  const ctx = useContext(FormContext)
  return useMemo(() => {
    if (props.form) return props.form
    if (ctx) return ctx
    return createForm({
      ...props,
      values: props.value,
      initialValues: props.initialValues
    })
  }, deps)
}
