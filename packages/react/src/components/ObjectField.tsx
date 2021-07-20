import React from 'react'
import { ObjectField as ObjectFieldType } from '@formily/core'
import { useForm, useField } from '../hooks'
import { useAttach } from '../hooks/useAttach'
import { ReactiveField } from './ReactiveField'
import { FieldContext } from '../shared'
import { JSXComponent, IFieldProps } from '../types'

export const ObjectField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C, ObjectFieldType>
) => {
  const form = useForm()
  const parent = useField()
  const field = useAttach(
    form.createObjectField({ basePath: parent?.address, ...props })
  )

  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  )
}

ObjectField.displayName = 'ObjectField'
