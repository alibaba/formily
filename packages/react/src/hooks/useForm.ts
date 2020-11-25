import { useContext, useMemo } from 'react'
import { createForm } from '@formily/core'
import { DefaultMiddlewares } from '../middlewares'
import { FormContext } from '../shared'
import { useAttach } from './useAttach'
import { IFormProps } from '../types'

export const useForm = (props?: IFormProps, deps: any[] = []) => {
  const ctx = useContext(FormContext)
  const outerForm = props?.form || ctx
  const middlewares = props?.middlewares || []
  const form = useMemo(() => {
    if (outerForm) return outerForm
    const form = createForm({
      ...props,
      middlewares: [...DefaultMiddlewares, ...middlewares],
      values: props.value,
      initialValues: props.initialValues
    })
    return form
  }, deps)
  useAttach(form, () => !outerForm)
  return form
}
