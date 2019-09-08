import { useMemo, useEffect } from 'react'
import { createForm, IFormCreatorOptions } from '@uform/core'
import { useDirty } from './useDirty'

export const useForm = (options: IFormCreatorOptions = {}) => {
  const dirty = useDirty(options, ['initialValues', 'values'])
  const form = useMemo(() => {
    return createForm(options)
  }, [])

  useEffect(() => {
    if (dirty.num > 0) {
      form.setFormState(state => {
        if (dirty.dirtys.values) {
          state.values = options.values
        }
        if (dirty.dirtys.initialValues) {
          state.initialValues = options.initialValues
        }
      })
    }
  })

  useEffect(() => {
    return () => {
      form.setFormState(state => {
        state.unmounted = true
      })
    }
  }, [])

  return form
}

export default useForm
