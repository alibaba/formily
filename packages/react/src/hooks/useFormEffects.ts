import { useLayoutEffect, useMemo } from 'react'
import { Form } from '@formily/core'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (effects?: (form: Form) => void) => {
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
