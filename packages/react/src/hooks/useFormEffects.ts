import { useEffect, useMemo, useRef } from 'react'
import { uid } from '@formily/shared'
import { useForm } from './useForm'

export const useFormEffects = (
  effects?: (form: FormilyCore.Form) => void,
  deps = []
) => {
  const ref = useRef(null)
  const form = useForm()
  ref.current = useMemo(() => {
    if (!form) return
    if (ref.current) {
      form.removeEffects(ref.current)
    }
    const id = uid()
    form.addEffects(id, effects)
    return id
  }, deps)
  useEffect(() => {
    return () => {
      if (!form) return
      form.removeEffects(ref.current)
    }
  }, [])
}
