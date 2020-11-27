import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { MutableField } from './MutableField'
import { FieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'

export const VoidField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createVoidField({ basePath: parent?.path, ...props })
  )
  return (
    <FieldContext.Provider value={field}>
      <MutableField field={field}>{props.children}</MutableField>
    </FieldContext.Provider>
  )
}

VoidField.displayName = 'VoidField'
