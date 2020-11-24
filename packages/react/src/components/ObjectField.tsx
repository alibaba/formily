import React from 'react'
import { useForm, useField } from '../hooks'
import { MutableField } from './MutableField'
import { IReactComponent } from '../types'

export const ObjectField = <
  D extends IReactComponent,
  C extends IReactComponent
>(
  props: React.PropsWithChildren<FormilyCore.ICreateFieldProps<D, C>>
) => {
  const form = useForm()
  const base = useField()
  const field = form.createObjectField({ basePath: base?.path, ...props })
  return <MutableField field={field}>{props.children}</MutableField>
}
