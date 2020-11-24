import { useContext, useMemo } from 'react'
import { createForm } from '@formily/core'
import { FormContext } from '../shared'
import { IFormProps } from '../types'
import { useAttach } from './useAttach'

export const useForm = (props?: IFormProps, deps: any[] = []) => {
  const ctx = useContext(FormContext)
  const form = useMemo(() => {
    if (props.form) return props.form
    if (ctx) return ctx
    return createForm({
      ...props,
      values: props.value,
      initialValues: props.initialValues
    })
  }, deps)
  useAttach(form)
  return form
}
