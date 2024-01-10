import React, { useEffect } from 'react'
import { useField, useForm } from '../hooks'
import { ReactiveField } from './ReactiveField'
import { FieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'

export const Field = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C>
) => {
  const form = useForm()
  const parent = useField()
  const field = form.createField({ basePath: parent?.address, ...props })
  useEffect(() => {
    field?.onMount()
    return () => {
      field?.onUnmount()
    }
  }, [field])
  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  )
}

Field.displayName = 'Field'
