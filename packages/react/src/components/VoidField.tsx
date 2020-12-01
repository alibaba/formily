import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { ReactiveField } from './ReactiveField'
import { FieldContext } from '../shared'
import { JSXComponent, IVoidFieldProps } from '../types'

export const VoidField = <D extends JSXComponent, C extends JSXComponent>(
  props: IVoidFieldProps<D, C>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createVoidField({ basePath: parent?.path, ...props })
  )
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  )
}

VoidField.displayName = 'VoidField'
