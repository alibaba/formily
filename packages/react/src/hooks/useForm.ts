import { useContext, useMemo } from 'react'
import { createForm } from '@formily/core'
import { DefaultMiddlewares } from '../middlewares'
import { FormContext } from '../shared'
import { useAttach } from './useAttach'
import { IFormProps } from '../types'

export const useForm = (props?: IFormProps, deps: any[] = []) => {
  const ctx = useContext(FormContext)
  const middlewares = props?.middlewares || []
  const form = useMemo(() => {
    if (props?.form) return props.form
    if (ctx) return ctx
    return createForm({
      ...props,
      middlewares: [...DefaultMiddlewares, ...middlewares],
      values: props.value,
      initialValues: props.initialValues
    })
  }, deps)
  useAttach(form)
  return form
}
