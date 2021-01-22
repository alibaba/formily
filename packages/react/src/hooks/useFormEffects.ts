import { useEffect, useMemo, useRef } from 'react'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: Formily.Core.Models.Form) => void
) => {
  const ref = useRef(null)
  const form = useForm()
  ref.current = useMemo(() => {
    const id = uid()
    form.addEffects(id, effects)
    return id
  }, [])
  useEffect(() => {
    return () => {
      form.removeEffects(ref.current)
    }
  }, [])
}
