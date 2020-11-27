import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { ReactiveField } from './ReactiveField'
import { FieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'

export const ObjectField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C, FormilyCore.ObjectField>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createObjectField({ basePath: parent?.path, ...props })
  )

  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  )
}

ObjectField.displayName = 'ObjectField'
