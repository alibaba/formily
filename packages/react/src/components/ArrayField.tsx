import React from 'react'
import { useForm, useField } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { FieldContext } from '../shared'
import { IReactComponent, IFieldProps } from '../types'
import { MutableField } from './MutableField'

export const ArrayField = <
  D extends IReactComponent,
  C extends IReactComponent
>(
  props: IFieldProps<D, C, FormilyCore.ArrayField>
) => {
  const form = useForm()
  const parent = useField()
  const field = form.createArrayField({ basePath: parent?.path, ...props })
  useAttach(field)
  return (
    <FieldContext.Provider value={field}>
      <MutableField field={field}>{props.children}</MutableField>
    </FieldContext.Provider>
  )
}

ArrayField.displayName = 'ArrayField'
