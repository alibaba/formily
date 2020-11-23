import React from 'react'
import { useForm, useField } from '../hooks'
import { MutableField } from './MutableField'

export const VirtualField = <D extends React.FC, C extends React.FC>(
  props: React.PropsWithChildren<Formily.ICreateFieldProps<D, C>>
) => {
  const form = useForm()
  const base = useField()
  const field = form.createField({ basePath: base?.path, ...props, void: true })
  return <MutableField field={field}>{props.children}</MutableField>
}
