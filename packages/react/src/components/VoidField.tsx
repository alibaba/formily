import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { ReactiveField } from './ReactiveField'
import { VoidFieldContext } from '../shared'
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
    <VoidFieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </VoidFieldContext.Provider>
  )
}

VoidField.displayName = 'VoidField'
