import React from 'react'
import { useForm, useField } from '../hooks'
import { MutableField } from './MutableField'

export const ArrayField = <D extends React.FC, C extends React.FC>(
  props: React.PropsWithChildren<Formily.ICreateFieldProps<D, C>>
) => {
  const form = useForm()
  const base = useField()
  const field = form.createArrayField({ basePath: base?.path, ...props })
  return <MutableField field={field}>{props.children}</MutableField>
}
