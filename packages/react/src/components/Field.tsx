import React from 'react'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { MutableField } from './MutableField'
import { FieldContext } from '../shared'
import { IReactComponent, IFieldProps } from '../types'

export const Field = <D extends IReactComponent, C extends IReactComponent>(
  props: IFieldProps<D, C>
) => {
  const form = useForm()
  const parent = useField()
  const field = form.createField({ basePath: parent?.path, ...props })
  useAttach(field)
  return (
    <FieldContext.Provider value={field}>
      <MutableField field={field}>{props.children}</MutableField>
    </FieldContext.Provider>
  )
}

Field.displayName = 'Field'