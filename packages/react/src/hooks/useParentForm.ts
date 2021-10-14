import { isObjectField, GeneralField, Form, ObjectField } from '@formily/core'
import { useField } from './useField'
import { useForm } from './useForm'

export const useParentForm = (): Form | ObjectField => {
  const field = useField()
  const form = useForm()
  const findObjectParent = (field: GeneralField) => {
    if (!field) return form
    if (isObjectField(field)) return field
    return findObjectParent(field?.parent)
  }
  return findObjectParent(field)
}
