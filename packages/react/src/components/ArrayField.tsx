import React from 'react'
import { useForm, useField } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { IReactComponent } from '../types'
import { MutableField } from './MutableField'

export const ArrayField = <
  D extends IReactComponent,
  C extends IReactComponent
>(
  props: React.PropsWithChildren<FormilyCore.ICreateFieldProps<D, C>>
) => {
  const form = useForm()
  const base = useField()
  const field = form.createArrayField({ basePath: base?.path, ...props })
  useAttach(field)
  return <MutableField field={field}>{props.children}</MutableField>
}
