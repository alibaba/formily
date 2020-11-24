import React from 'react'
import { useForm, useField } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { MutableField } from './MutableField'
import { FieldContext } from '../shared'
import { IReactComponent, IFieldProps } from '../types'

export const ObjectField = <
  D extends IReactComponent,
  C extends IReactComponent
>(
  props: IFieldProps<D, C, FormilyCore.ObjectField>
) => {
  const form = useForm()
  const parent = useField()
  const field = form.createObjectField({ basePath: parent?.path, ...props })
  useAttach(field)
  return (
    <FieldContext.Provider value={field}>
      <MutableField field={field}>{props.children}</MutableField>
    </FieldContext.Provider>
  )
}

ObjectField.displayName = 'ObjectField'
