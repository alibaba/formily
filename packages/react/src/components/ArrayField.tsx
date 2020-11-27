import React from 'react'
import { useForm, useField } from '../hooks'
import { useAutoRecycle } from '../hooks/useAutoRecycle'
import { FieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'
import { MutableField } from './MutableField'

export const ArrayField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C, FormilyCore.ArrayField>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAutoRecycle(
    form.createArrayField({ basePath: parent?.path, ...props })
  )
  return (
    <FieldContext.Provider value={field}>
      <MutableField field={field}>{props.children}</MutableField>
    </FieldContext.Provider>
  )
}

ArrayField.displayName = 'ArrayField'
