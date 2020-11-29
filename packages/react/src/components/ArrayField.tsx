import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { ArrayFieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'
import { ReactiveField } from './ReactiveField'

export const ArrayField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C, Formily.Core.Models.ArrayField>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createArrayField({ basePath: parent?.path, ...props })
  )
  return (
    <ArrayFieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </ArrayFieldContext.Provider>
  )
}

ArrayField.displayName = 'ArrayField'
