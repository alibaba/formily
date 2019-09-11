import { useMemo, useEffect } from 'react'
import { createForm, IFormCreatorOptions } from '@uform/core'
import { useDirty } from './useDirty'

export const useForm = (options: IFormCreatorOptions = {}) => {
  const dirty = useDirty(options, ['initialValues', 'values', 'editable'])
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
          state.values = options.initialValues
          state.initialValues = options.initialValues
        }
        if (dirty.dirtys.editable) {
          state.editable = options.editable
        }
      })
    }
  })

  useEffect(() => {
    form.setFormState(state => {
      state.mounted = true
    })
    return () => {
      form.setFormState(state => {
        state.unmounted = true
      })
    }
  }, [])

  return form
}

export default useForm
