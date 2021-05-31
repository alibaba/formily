import { useLayoutEffect, useMemo } from 'react'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void
) => {
  const form = useForm()
  const ref = useMemo(() => {
    const id = uid()
    form.addEffects(id, effects)
    const request = setTimeout(() => {
      form.removeEffects(id)
    }, 100)
    return { id, request }
  }, [])
  useLayoutEffect(() => {
    clearTimeout(ref.request)
    return () => {
      form.removeEffects(ref.id)
    }
  }, [])
}
