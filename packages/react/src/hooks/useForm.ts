import { useContext, useMemo } from 'react'
import { createForm } from '@formily/core'
import { DefaultMiddlewares } from '../middlewares'
import { FormContext } from '../shared'
import { useAutoRecycle } from './useAutoRecycle'
import { IFormProps } from '../types'

export const useForm = (props?: IFormProps, deps: any[] = []) => {
  const contextForm = useContext(FormContext)
  const outerForm = props?.form || contextForm
  const middlewares = props?.middlewares || []
  const form = useAutoRecycle(
    useMemo(() => {
      if (outerForm) return outerForm
      return createForm({
        ...props,
        middlewares: [...DefaultMiddlewares, ...middlewares],
        values: props.value,
        initialValues: props.initialValues
      })
    }, deps),
    !!outerForm
  )
  return form
}
